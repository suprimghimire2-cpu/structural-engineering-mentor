const finite = (value) => typeof value === 'number' && Number.isFinite(value);

function validateBeamModel(model) {
  const errors = [];
  if (!model || typeof model !== 'object' || Array.isArray(model)) return ['Beam model must be an object.'];
  if (!finite(model.spanM) || model.spanM <= 0) errors.push('Span must be a finite positive number of metres.');
  for (const field of ['pointLoads', 'udlSegments']) {
    if (!Array.isArray(model[field])) errors.push(`${field} must be an array.`);
  }
  if (!Array.isArray(model.pointLoads) || !Array.isArray(model.udlSegments)) return errors;
  const ids = new Set();
  const checkId = (item, label) => {
    if (typeof item?.id !== 'string' || !item.id.trim()) errors.push(`${label} ID is required.`);
    else if (ids.has(item.id)) errors.push(`Duplicate load ID "${item.id}".`);
    else ids.add(item.id);
  };
  for (const [index, load] of model.pointLoads.entries()) {
    const label = `Point load ${index + 1}`;
    checkId(load, label);
    if (!finite(load?.positionM)) errors.push(`${label} position must be finite.`);
    else if (finite(model.spanM) && (load.positionM < 0 || load.positionM > model.spanM)) errors.push(`${label} position must lie between 0 and the beam span.`);
    if (!finite(load?.magnitudeKN) || load.magnitudeKN < 0) errors.push(`${label} downward magnitude must be finite and non-negative.`);
  }
  for (const [index, segment] of model.udlSegments.entries()) {
    const label = `UDL segment ${index + 1}`;
    checkId(segment, label);
    if (!finite(segment?.startM) || !finite(segment?.endM)) errors.push(`${label} start and end must be finite.`);
    else if (!finite(model.spanM) || segment.startM < 0 || segment.endM > model.spanM || segment.startM >= segment.endM) errors.push(`${label} must satisfy 0 ≤ start < end ≤ span.`);
    if (!finite(segment?.magnitudeKNPerM) || segment.magnitudeKNPerM < 0) errors.push(`${label} downward intensity must be finite and non-negative.`);
  }
  return errors;
}

/**
 * Analyze a simply supported beam (pin A, roller B).
 * Input downward loads are positive; reactions are upward-positive. Positive
 * shear is V=RA minus downward loads to the left; positive moment is sagging.
 * Returns exact event-aware shear intervals and exact event/stationary extrema.
 */
export function analyzeBeam(model) {
  const errors = validateBeamModel(model);
  if (errors.length) return { ok: false, errors };

  const { spanM: L, pointLoads, udlSegments } = model;
  const udlTotals = udlSegments.map((load) => ({
    ...load,
    resultantKN: load.magnitudeKNPerM * (load.endM - load.startM),
    resultantPositionM: (load.startM + load.endM) / 2,
  }));
  const totalPointKN = pointLoads.reduce((sum, load) => sum + load.magnitudeKN, 0);
  const totalUdlKN = udlTotals.reduce((sum, load) => sum + load.resultantKN, 0);
  const totalLoadKN = totalPointKN + totalUdlKN;
  const appliedMomentAboutAKNm = pointLoads.reduce((sum, load) => sum + load.magnitudeKN * load.positionM, 0)
    + udlTotals.reduce((sum, load) => sum + load.resultantKN * load.resultantPositionM, 0);
  const reactionBKN = appliedMomentAboutAKNm / L;
  const reactionAKN = totalLoadKN - reactionBKN;

  const shearAt = (x, side = 'right') => reactionAKN
    - pointLoads.reduce((sum, load) => sum + ((x > load.positionM || (x === load.positionM && side === 'right')) ? load.magnitudeKN : 0), 0)
    - udlSegments.reduce((sum, load) => sum + load.magnitudeKNPerM * Math.max(0, Math.min(x - load.startM, load.endM - load.startM)), 0);
  const momentAt = (x) => reactionAKN * x
    - pointLoads.reduce((sum, load) => sum + load.magnitudeKN * Math.max(0, x - load.positionM), 0)
    - udlSegments.reduce((sum, load) => {
      const left = Math.max(0, x - load.startM);
      const right = Math.max(0, x - load.endM);
      return sum + (load.magnitudeKNPerM / 2) * (left ** 2 - right ** 2);
    }, 0);

  const events = [...new Set([0, L, ...pointLoads.map((load) => load.positionM), ...udlSegments.flatMap((load) => [load.startM, load.endM])])].sort((a, b) => a - b);
  const shearSegments = [];
  const momentSegments = [];
  const shearCandidates = [];
  const momentCandidates = events.map((x) => ({ positionM: x, valueKNM: momentAt(x), kind: 'event' }));

  for (const x of events) {
    if (x > 0) shearCandidates.push({ positionM: x, side: 'left', valueKN: shearAt(x, 'left') });
    if (x < L) shearCandidates.push({ positionM: x, side: 'right', valueKN: shearAt(x, 'right') });
  }
  for (let i = 0; i < events.length - 1; i += 1) {
    const startM = events[i], endM = events[i + 1];
    if (endM <= startM) continue;
    const mid = (startM + endM) / 2;
    const slopeKNPerM = -udlSegments.reduce((sum, load) => sum + (mid > load.startM && mid < load.endM ? load.magnitudeKNPerM : 0), 0);
    const startShearKN = shearAt(startM, 'right');
    const endShearKN = shearAt(endM, 'left');
    shearSegments.push({ startM, endM, startShearKN, endShearKN });
    momentSegments.push({ startM, endM, startMomentKNM: momentAt(startM), endMomentKNM: momentAt(endM), slopeKNPerM });
    if (slopeKNPerM !== 0) {
      const root = startM - startShearKN / slopeKNPerM;
      if (root > startM && root < endM) momentCandidates.push({ positionM: root, valueKNM: momentAt(root), kind: 'stationary' });
    }
  }
  const shearMin = shearCandidates.reduce((best, item) => item.valueKN < best.valueKN ? item : best, shearCandidates[0] ?? {positionM:0,side:'right',valueKN:reactionAKN});
  const shearMax = shearCandidates.reduce((best, item) => item.valueKN > best.valueKN ? item : best, shearCandidates[0] ?? {positionM:0,side:'right',valueKN:reactionAKN});
  const momentMin = momentCandidates.reduce((best, item) => item.valueKNM < best.valueKNM ? item : best, momentCandidates[0]);
  const momentMax = momentCandidates.reduce((best, item) => item.valueKNM > best.valueKNM ? item : best, momentCandidates[0]);

  const derivedValues = [
    totalPointKN, totalUdlKN, totalLoadKN, appliedMomentAboutAKNm, reactionAKN, reactionBKN,
    ...udlTotals.flatMap((load) => [load.resultantKN, load.resultantPositionM]),
    ...shearSegments.flatMap((segment) => [segment.startM, segment.endM, segment.startShearKN, segment.endShearKN]),
    ...momentSegments.flatMap((segment) => [segment.startM, segment.endM, segment.startMomentKNM, segment.endMomentKNM, segment.slopeKNPerM]),
    ...shearCandidates.map((candidate) => candidate.valueKN),
    ...momentCandidates.map((candidate) => candidate.valueKNM),
  ];
  if (!derivedValues.every(Number.isFinite)) {
    return { ok: false, errors: ['The beam model produced a non-finite calculation result; reduce extreme input values and check the units.'] };
  }

  return {
    ok: true,
    signConvention: 'Downward applied loads positive; upward reactions positive; V(x)=RA minus downward loads to the left; positive M is sagging.',
    totalAppliedLoadKN: totalLoadKN,
    reactions: { A: { verticalKN: reactionAKN }, B: { verticalKN: reactionBKN } },
    equilibrium: { appliedMomentAboutAKNm, verticalResidualKN: reactionAKN + reactionBKN - totalLoadKN, momentResidualKNM: reactionBKN * L - appliedMomentAboutAKNm },
    extrema: {
      shearMin: { valueKN: shearMin.valueKN, positionM: shearMin.positionM, side: shearMin.side },
      shearMax: { valueKN: shearMax.valueKN, positionM: shearMax.positionM, side: shearMax.side },
      momentMin: momentMin,
      momentMax: momentMax,
    },
    eventsM: events,
    shearSegments,
    momentSegments,
    shearAt,
    momentAt,
  };
}

export { validateBeamModel };
