export const BEAM_TEMPLATES = [
  { id: 'beam-point-centre', title: 'Simply supported · centre point load', model: { spanM: 6, pointLoads: [{ id: 'P1', positionM: 3, magnitudeKN: 20 }], udlSegments: [] } },
  { id: 'beam-full-udl', title: 'Simply supported · full-span UDL', model: { spanM: 6, pointLoads: [], udlSegments: [{ id: 'U1', startM: 0, endM: 6, magnitudeKNPerM: 10 }] } },
  { id: 'beam-mixed', title: 'Multiple point loads · partial UDL', model: { spanM: 8, pointLoads: [{ id: 'P1', positionM: 2, magnitudeKN: 12 }, { id: 'P2', positionM: 6, magnitudeKN: 8 }], udlSegments: [{ id: 'U1', startM: 1, endM: 5, magnitudeKNPerM: 4 }] } },
];

export const TRUSS_TEMPLATES = [
  { id: 'truss-triangle', title: 'Triangular truss · 3 members', model: {
    nodes: [{ id: 'A', xM: 0, yM: 0 }, { id: 'B', xM: 6, yM: 0 }, { id: 'C', xM: 3, yM: 4 }],
    members: [{ id: 'AB', startNode: 'A', endNode: 'B', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'AC', startNode: 'A', endNode: 'C', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'BC', startNode: 'B', endNode: 'C', elasticModulusGPa: 200, areaMM2: 1000 }],
    supports: [{ nodeId: 'A', restrainX: true, restrainY: true }, { nodeId: 'B', restrainX: false, restrainY: true }], loads: [{ nodeId: 'C', fxKN: 0, fyKN: -30 }],
  } },
  { id: 'truss-multipanel', title: 'Two-panel Warren truss · 7 members', model: {
    nodes: [{ id: 'A', xM: 0, yM: 0 }, { id: 'B', xM: 3, yM: 0 }, { id: 'C', xM: 6, yM: 0 }, { id: 'D', xM: 1.5, yM: 2 }, { id: 'E', xM: 4.5, yM: 2 }],
    members: [{ id: 'AB', startNode: 'A', endNode: 'B', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'BC', startNode: 'B', endNode: 'C', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'AD', startNode: 'A', endNode: 'D', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'DB', startNode: 'D', endNode: 'B', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'BE', startNode: 'B', endNode: 'E', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'EC', startNode: 'E', endNode: 'C', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'DE', startNode: 'D', endNode: 'E', elasticModulusGPa: 200, areaMM2: 1000 }],
    supports: [{ nodeId: 'A', restrainX: true, restrainY: true }, { nodeId: 'C', restrainX: false, restrainY: true }], loads: [{ nodeId: 'B', fxKN: 0, fyKN: -20 }],
  } },
  { id: 'truss-unstable', title: 'Unstable triangle · restraint check', model: {
    nodes: [{ id: 'A', xM: 0, yM: 0 }, { id: 'B', xM: 6, yM: 0 }, { id: 'C', xM: 3, yM: 4 }],
    members: [{ id: 'AB', startNode: 'A', endNode: 'B', elasticModulusGPa: 200, areaMM2: 1000 }, { id: 'AC', startNode: 'A', endNode: 'C', elasticModulusGPa: 200, areaMM2: 1000 }],
    supports: [{ nodeId: 'A', restrainX: true, restrainY: true }, { nodeId: 'B', restrainX: false, restrainY: true }], loads: [{ nodeId: 'C', fxKN: 0, fyKN: -10 }],
  } },
];

export const cloneModel = (model) => JSON.parse(JSON.stringify(model));
