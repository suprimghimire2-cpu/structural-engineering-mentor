export function findPrerequisiteCycles(concepts) {
  const byId = new Map(concepts.map((concept) => [concept.id, concept]));
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];
  const recorded = new Set();

  function visit(id, stack) {
    if (visiting.has(id)) {
      const cycle = [...stack.slice(stack.indexOf(id)), id];
      const key = [...cycle.slice(0, -1)].sort().join('|');
      if (!recorded.has(key)) { recorded.add(key); cycles.push(cycle); }
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const prerequisite of byId.get(id)?.prerequisites ?? []) {
      if (byId.has(prerequisite)) visit(prerequisite, [...stack, id]);
    }
    visiting.delete(id);
    visited.add(id);
  }

  for (const concept of concepts) visit(concept.id, []);
  return cycles;
}

export function validateLearningPaths(paths, concepts) {
  const errors = [];
  if (!Array.isArray(concepts)) return ['concepts must be an array'];
  const pathIds = new Set();
  const conceptIds = new Set(concepts.map((concept) => concept.id));

  if (!Array.isArray(paths)) return ['learning paths must be an array'];

  for (const [pathIndex, path] of paths.entries()) {
    const label = path?.id || `learning path at index ${pathIndex}`;
    if (!path || typeof path !== 'object' || Array.isArray(path)) {
      errors.push(`${label}: path must be an object`);
      continue;
    }
    if (typeof path.id !== 'string' || !path.id.trim()) errors.push(`${label}: path ID is required`);
    else if (pathIds.has(path.id)) errors.push(`${path.id}: duplicate learning-path ID`);
    else pathIds.add(path.id);
    for (const field of ['title', 'description']) {
      if (typeof path[field] !== 'string' || !path[field].trim()) errors.push(`${label}: ${field} is required`);
    }
    if (!Array.isArray(path.stages) || path.stages.length < 6) {
      errors.push(`${label}: at least six stages are required`);
      continue;
    }

    const stageIds = new Set();
    const pathwayPositions = new Map();
    for (const [stageIndex, stage] of path.stages.entries()) {
      const stageLabel = stage?.id || `${label} stage ${stageIndex + 1}`;
      if (!stage || typeof stage !== 'object' || Array.isArray(stage)) {
        errors.push(`${stageLabel}: stage must be an object`);
        continue;
      }
      if (typeof stage.id !== 'string' || !stage.id.trim()) errors.push(`${stageLabel}: stage ID is required`);
      else if (stageIds.has(stage.id)) errors.push(`${stage.id}: duplicate stage ID`);
      else stageIds.add(stage.id);
      for (const field of ['title', 'objective', 'prerequisiteKnowledge', 'outcome']) {
        if (typeof stage[field] !== 'string' || !stage[field].trim()) errors.push(`${stageLabel}: ${field} is required`);
      }
      if (!Array.isArray(stage.conceptIds) || stage.conceptIds.length === 0) {
        errors.push(`${stageLabel}: concept IDs are required`);
        continue;
      }
      if (new Set(stage.conceptIds).size !== stage.conceptIds.length) errors.push(`${stageLabel}: repeated concept ID`);
      for (const [conceptIndex, id] of stage.conceptIds.entries()) {
        if (!conceptIds.has(id)) errors.push(`${stageLabel}: unknown concept ID "${id}"`);
        else if (!pathwayPositions.has(id)) pathwayPositions.set(id, [stageIndex, conceptIndex]);
      }
    }

    for (const [conceptId, [stageIndex, conceptIndex]] of pathwayPositions) {
      const concept = concepts.find((entry) => entry.id === conceptId);
      for (const prerequisiteId of concept?.prerequisites ?? []) {
        const prerequisitePosition = pathwayPositions.get(prerequisiteId);
        if (!prerequisitePosition) continue;
        const isEarlier = prerequisitePosition[0] < stageIndex ||
          (prerequisitePosition[0] === stageIndex && prerequisitePosition[1] < conceptIndex);
        if (!isEarlier) errors.push(`${label}: prerequisite "${prerequisiteId}" must appear before dependent concept "${conceptId}"`);
      }
    }
  }

  for (const concept of concepts) {
    for (const id of concept.prerequisites ?? []) if (!conceptIds.has(id)) errors.push(`${concept.id}: unknown prerequisite ID "${id}"`);
  }
  return errors;
}
