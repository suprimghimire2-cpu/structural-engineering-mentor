const finite = (value) => typeof value === 'number' && Number.isFinite(value);

export function validateTrussModel(model) {
  if (!model || typeof model !== 'object' || Array.isArray(model)) return ['Truss model must be an object.'];
  const errors = [];
  for (const field of ['nodes', 'members', 'supports', 'loads']) if (!Array.isArray(model[field])) errors.push(`${field} must be an array.`);
  if (errors.length) return errors;
  if (model.nodes.length < 2) errors.push('At least two nodes are required.');
  const nodeIds = new Set();
  for (const [i, node] of model.nodes.entries()) {
    if (typeof node?.id !== 'string' || !node.id.trim()) errors.push(`Node ${i + 1} ID is required.`);
    else if (nodeIds.has(node.id)) errors.push(`Duplicate node ID "${node.id}".`);
    else nodeIds.add(node.id);
    if (!finite(node?.xM) || !finite(node?.yM)) errors.push(`Node ${node?.id ?? i + 1} coordinates must be finite metres.`);
  }
  const memberIds = new Set();
  for (const [i, member] of model.members.entries()) {
    const label = `Member ${member?.id ?? i + 1}`;
    if (typeof member?.id !== 'string' || !member.id.trim()) errors.push(`${label} ID is required.`);
    else if (memberIds.has(member.id)) errors.push(`Duplicate member ID "${member.id}".`);
    else memberIds.add(member.id);
    if (!nodeIds.has(member?.startNode)) errors.push(`${label} has missing start node "${member?.startNode}".`);
    if (!nodeIds.has(member?.endNode)) errors.push(`${label} has missing end node "${member?.endNode}".`);
    if (member?.startNode === member?.endNode && nodeIds.has(member.startNode)) errors.push(`${label} cannot connect a node to itself.`);
    if (!finite(member?.elasticModulusGPa) || member.elasticModulusGPa <= 0) errors.push(`${label} elastic modulus must be finite and positive GPa.`);
    if (!finite(member?.areaMM2) || member.areaMM2 <= 0) errors.push(`${label} area must be finite and positive mm².`);
    const start = model.nodes.find((node) => node.id === member?.startNode);
    const end = model.nodes.find((node) => node.id === member?.endNode);
    if (start && end && finite(start.xM) && finite(start.yM) && finite(end.xM) && finite(end.yM) && Math.hypot(end.xM - start.xM, end.yM - start.yM) === 0) errors.push(`${label} has zero length.`);
  }
  const supportNodes = new Set();
  for (const support of model.supports) {
    if (!nodeIds.has(support?.nodeId)) errors.push(`Support references missing node "${support?.nodeId}".`);
    if (supportNodes.has(support?.nodeId)) errors.push(`Duplicate support definition for node "${support.nodeId}".`);
    supportNodes.add(support?.nodeId);
    if (typeof support?.restrainX !== 'boolean' || typeof support?.restrainY !== 'boolean') errors.push(`Support at ${support?.nodeId} must define Boolean X and Y restraints.`);
  }
  for (const load of model.loads) {
    if (!nodeIds.has(load?.nodeId)) errors.push(`Load references missing node "${load?.nodeId}".`);
    if (!finite(load?.fxKN) || !finite(load?.fyKN)) errors.push(`Load at ${load?.nodeId} must have finite kN components.`);
  }
  if (!model.members.length) errors.push('At least one truss member is required.');
  return errors;
}

export function solveLinearSystem(matrix, vector) {
  if (!Array.isArray(vector)) throw new Error('Force vector must be an array of finite numbers.');
  const n = vector.length;
  if (!Array.isArray(matrix) || matrix.length !== n || matrix.some((row) => !Array.isArray(row) || row.length !== n)) {
    throw new Error('Reduced stiffness matrix must be square and match the force vector.');
  }
  if (!vector.every(finite) || !matrix.every((row) => row.every(finite))) {
    throw new Error('Reduced stiffness matrix and force vector must contain only finite values.');
  }
  if (n === 0) return [];
  const a = matrix.map((row, i) => [...row, vector[i]]);
  const scale = Math.max(...matrix.flat().map(Math.abs));
  if (!Number.isFinite(scale) || scale === 0) throw new Error('The reduced stiffness matrix is singular; the truss may be unstable or insufficiently restrained.');
  const tolerance = scale * Number.EPSILON * n * 100;
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < n; row += 1) if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    if (!Number.isFinite(a[pivot][col]) || Math.abs(a[pivot][col]) <= tolerance) {
      throw new Error('The reduced stiffness matrix is singular or numerically unstable; check the model stability and restraints.');
    }
    [a[col], a[pivot]] = [a[pivot], a[col]];
    for (let row = col + 1; row < n; row += 1) {
      const factor = a[row][col] / a[col][col];
      a[row][col] = 0;
      for (let j = col + 1; j <= n; j += 1) a[row][j] -= factor * a[col][j];
    }
  }
  const solution = Array(n).fill(0);
  for (let row = n - 1; row >= 0; row -= 1) {
    let rhs = a[row][n];
    for (let col = row + 1; col < n; col += 1) rhs -= a[row][col] * solution[col];
    solution[row] = rhs / a[row][row];
    if (!Number.isFinite(solution[row])) throw new Error('The truss solution is non-finite; the model may be unstable.');
  }
  return solution;
}

export function assembleTruss(model) {
  const errors = validateTrussModel(model);
  if (errors.length) return { ok: false, errors };
  const dofCount = model.nodes.length * 2;
  const globalK = Array.from({ length: dofCount }, () => Array(dofCount).fill(0));
  const force = Array(dofCount).fill(0);
  const nodeIndex = new Map(model.nodes.map((node, index) => [node.id, index]));
  const elements = model.members.map((member) => {
    const i = nodeIndex.get(member.startNode), j = nodeIndex.get(member.endNode);
    const start = model.nodes[i], end = model.nodes[j];
    const dx = end.xM - start.xM, dy = end.yM - start.yM;
    const lengthM = Math.hypot(dx, dy), c = dx / lengthM, s = dy / lengthM;
    // Convert E and A to Pa and m²; assemble the system in N and metres.
    const eaN = (member.elasticModulusGPa * 1e9) * (member.areaMM2 * 1e-6);
    const axialStiffnessNPerM = eaN / lengthM;
    const cc = c * c, ss = s * s, cs = c * s;
    const local = [
      [cc, cs, -cc, -cs], [cs, ss, -cs, -ss],
      [-cc, -cs, cc, cs], [-cs, -ss, cs, ss],
    ].map((row) => row.map((value) => value * axialStiffnessNPerM));
    const dofs = [2 * i, 2 * i + 1, 2 * j, 2 * j + 1];
    for (let r = 0; r < 4; r += 1) for (let col = 0; col < 4; col += 1) globalK[dofs[r]][dofs[col]] += local[r][col];
    return { id: member.id, startNode: member.startNode, endNode: member.endNode, lengthM, c, s, eaN, areaMM2: member.areaMM2, elasticModulusGPa: member.elasticModulusGPa, axialStiffnessNPerM, localStiffness: local, dofs };
  });
  for (const load of model.loads) {
    const i = nodeIndex.get(load.nodeId);
    force[2 * i] += load.fxKN * 1000;
    force[2 * i + 1] += load.fyKN * 1000;
  }
  const restrained = new Set();
  for (const support of model.supports) {
    const i = nodeIndex.get(support.nodeId);
    if (support.restrainX) restrained.add(2 * i);
    if (support.restrainY) restrained.add(2 * i + 1);
  }
  if (!globalK.every((row) => row.every(Number.isFinite)) || !force.every(Number.isFinite)) {
    return { ok: false, errors: ['The truss model produced non-finite stiffness or load values; reduce extreme inputs and check the units.'] };
  }
  return { ok: true, globalK, force, nodeIndex, elements, restrained, dofCount };
}

/** Linear-elastic, first-order 2D pin-jointed truss analysis. */
export function analyzeTruss(model) {
  const assembled = assembleTruss(model);
  if (!assembled.ok) return assembled;
  const { globalK, force, nodeIndex, elements, restrained, dofCount } = assembled;
  const free = Array.from({ length: dofCount }, (_, i) => i).filter((i) => !restrained.has(i));
  const reducedK = free.map((row) => free.map((col) => globalK[row][col]));
  const reducedF = free.map((dof) => force[dof]);
  let freeSolution;
  try {
    freeSolution = solveLinearSystem(reducedK, reducedF);
  } catch (error) {
    return { ok: false, errors: [error.message] };
  }
  const displacementM = Array(dofCount).fill(0);
  free.forEach((dof, index) => { displacementM[dof] = freeSolution[index]; });
  const internalNodalN = globalK.map((row) => row.reduce((sum, value, col) => sum + value * displacementM[col], 0));
  const residualN = internalNodalN.map((value, i) => value - force[i]);
  const nodalDisplacements = model.nodes.map((node, index) => ({ nodeId: node.id, uxMM: displacementM[2 * index] * 1000, uyMM: displacementM[2 * index + 1] * 1000 }));
  const supportReactions = model.supports.map((support) => {
    const i = nodeIndex.get(support.nodeId);
    return { nodeId: support.nodeId, fxKN: support.restrainX ? residualN[2 * i] / 1000 : 0, fyKN: support.restrainY ? residualN[2 * i + 1] / 1000 : 0 };
  });
  const memberResults = elements.map((element) => {
    const [uxi, uyi, uxj, uyj] = element.dofs.map((dof) => displacementM[dof]);
    const elongationM = (uxj - uxi) * element.c + (uyj - uyi) * element.s;
    const strain = elongationM / element.lengthM;
    const axialForceKN = ((element.eaN / element.lengthM) * elongationM) / 1000;
    const stressMPa = axialForceKN * 1000 / element.areaMM2;
    return { id: element.id, startNode: element.startNode, endNode: element.endNode, lengthM: element.lengthM, elongationMM: elongationM * 1000, axialStrain: strain, axialForceKN, axialStressMPa: stressMPa, state: axialForceKN > 0 ? 'tension' : axialForceKN < 0 ? 'compression' : 'zero' };
  });
  let sumFxKN = 0, sumFyKN = 0, sumMomentKNM = 0;
  model.loads.forEach((load) => {
    const node = model.nodes[nodeIndex.get(load.nodeId)];
    sumFxKN += load.fxKN; sumFyKN += load.fyKN;
    sumMomentKNM += node.xM * load.fyKN - node.yM * load.fxKN;
  });
  supportReactions.forEach((reaction) => {
    const node = model.nodes[nodeIndex.get(reaction.nodeId)];
    sumFxKN += reaction.fxKN; sumFyKN += reaction.fyKN;
    sumMomentKNM += node.xM * reaction.fyKN - node.yM * reaction.fxKN;
  });
  const matrixScale = Math.max(1, ...globalK.flat().map(Math.abs));
  const symmetryResidual = Math.max(0, ...globalK.flatMap((row, i) => row.map((value, j) => Math.abs(value - globalK[j][i]))));
  const freeDofResidualKN = Math.max(0, ...free.map((dof) => Math.abs(residualN[dof] / 1000)));
  const derivedValues = [
    ...displacementM, ...internalNodalN, ...residualN,
    ...nodalDisplacements.flatMap((node) => [node.uxMM, node.uyMM]),
    ...supportReactions.flatMap((reaction) => [reaction.fxKN, reaction.fyKN]),
    ...memberResults.flatMap((member) => [member.elongationMM, member.axialStrain, member.axialForceKN, member.axialStressMPa]),
    sumFxKN, sumFyKN, sumMomentKNM, symmetryResidual, freeDofResidualKN,
  ];
  if (!derivedValues.every(Number.isFinite)) {
    return { ok: false, errors: ['The truss model produced a non-finite result; reduce extreme input values and check the units.'] };
  }
  return {
    ok: true,
    assumptions: ['Linear elastic material response.', 'Small displacements and first-order geometry.', 'Pin-jointed axial members; bending stiffness omitted.'],
    nodalDisplacements,
    members: memberResults,
    supportReactions,
    verification: {
      globalEquilibriumResidual: { sumFxKN, sumFyKN, sumMomentKNM },
      freeDofResidualKN,
      matrixSymmetryResidual: symmetryResidual,
      matrixSymmetryRelativeResidual: symmetryResidual / matrixScale,
      reducedDofCount: free.length,
      restrainedDofCount: restrained.size,
    },
    globalStiffness: globalK,
  };
}
