export const knowledge = [

  // =========================================================
  // MECHANICS
  // =========================================================

  {
    id: 'force',
    title: 'Force',
    category: 'Mechanics',
    level: 'Foundation',
    summary:
      'An interaction that can change the motion, shape, or internal state of a structural system.',

    sections: {
      definition:
        'A force is a push or pull acting on a body. In structural engineering, forces describe actions transferred through structural members and supports.',

      physical:
        'Forces create acceleration, deformation, or internal resistance. A structure is safe when it can transfer the relevant actions to the ground without unacceptable strength, stability, or serviceability problems.',

      behaviour:
        'A force produces a response depending on its magnitude, direction, point of application, structural stiffness, supports, and connectivity.',

      loadPath:
        'Forces must have a continuous path through structural elements and ultimately into the supporting ground.',

      equation:
        'For a static system: ΣF = 0. Forces are resolved into components such as Fx, Fy and Fz.',

      analysis:
        'Analysis software may report forces as reactions, axial forces, shear forces, bending moments, torsion, or other result quantities depending on the structural model.',

      resultInterpretation:
        'Always check the direction, magnitude, location, sign convention, units, and load combination before deciding whether a force result is reasonable.',

      practice:
        'Always establish the direction, point of application, units, and load path before using a force in a calculation.',

      designThinking:
        'Ask what is producing the force, where it is going, and what structural element is responsible for transferring it.',

      construction:
        'Actual force transfer depends on real connections, supports, contact conditions, construction sequence, and material continuity.',

      failureReasoning:
        'Unexpected force results may indicate incorrect loading, support conditions, releases, connectivity, stiffness assumptions, or an unusual but physically real load path.',

      failureModes: [
        'Overloading',
        'Connection failure',
        'Unexpected load path',
        'Support failure',
        'Local crushing'
      ],

      commonMistakes: [
        'Using incorrect units',
        'Ignoring force direction',
        'Ignoring load path',
        'Applying loads to the wrong structural element'
      ],

      troubleshooting: [
        'Check magnitude and units',
        'Check direction',
        'Check load location',
        'Check supports',
        'Trace the load path',
        'Compare with a simple hand calculation'
      ],

      practicalQuestion:
        'Where is this force coming from, where is it going, and does the structural system provide a realistic path for it?',

      related: [
        'equilibrium',
        'moment',
        'stress',
        'load-path'
      ]
    }
  },


  {
    id: 'moment',
    title: 'Bending Moment',
    category: 'Mechanics',
    level: 'Foundation',
    summary:
      'A measure of the turning effect produced by a force about a point or section.',

    sections: {
      definition:
        'Bending moment describes the internal rotational effect that develops in a structural member when loads act with a lever arm.',

      physical:
        'Imagine pushing down on a ruler supported at its ends. The ruler curves because internal actions develop to maintain equilibrium.',

      behaviour:
        'Bending moment varies along a structural member according to the applied loads, support conditions, geometry, and continuity.',

      loadPath:
        'Loads enter the member and create internal bending actions that are ultimately transferred toward the supports.',

      equation:
        'For a simple force: M = F × d, where d is the perpendicular distance to the point or section.',

      analysis:
        'Analysis software commonly provides bending moment diagrams and section forces. These results must be interpreted according to the selected local or global axis system.',

      resultInterpretation:
        'Do not treat moment as just a number. Check its sign convention, location, distribution, governing combination, local/global axis, and whether the magnitude is physically plausible.',

      practice:
        'Check support conditions, continuity, span, loading, stiffness, and load path before reacting to a large moment result.',

      designThinking:
        'A high moment should trigger investigation of the load and structural behaviour before simply increasing member size or reinforcement.',

      construction:
        'Reinforcement placement, anchorage, continuity, joints, construction sequence, and actual support conditions influence how bending is resisted.',

      failureReasoning:
        'A bending problem may arise from excessive demand, inadequate section capacity, insufficient reinforcement, poor detailing, instability, or incorrect modelling.',

      failureModes: [
        'Flexural failure',
        'Excessive deformation',
        'Cracking',
        'Reinforcement yielding',
        'Connection failure'
      ],

      commonMistakes: [
        'Misreading moment sign',
        'Ignoring local axes',
        'Ignoring support conditions',
        'Designing from a single result without understanding its distribution'
      ],

      troubleshooting: [
        'Check load magnitude',
        'Check span and supports',
        'Check moment diagram shape',
        'Check load combinations',
        'Check local axes',
        'Compare with hand calculations'
      ],

      practicalQuestion:
        'Why is the moment this large at this particular location, and does the moment diagram make physical sense?',

      related: [
        'force',
        'shear-force',
        'curvature',
        'deflection',
        'flexural-strength'
      ]
    }
  },


  {
    id: 'shear-force',
    title: 'Shear Force',
    category: 'Mechanics',
    level: 'Foundation',
    summary:
      'An internal action associated with transverse loading and relative sliding tendency across a section.',

    sections: {
      definition:
        'Shear force is the internal force acting parallel to a cross-section that develops to maintain equilibrium.',

      physical:
        'In a loaded beam, adjacent portions tend to move relative to one another. The material develops internal resistance to this tendency.',

      behaviour:
        'Shear force commonly changes along a member according to distributed loads, concentrated loads, reactions, and member geometry.',

      loadPath:
        'Transverse loads are transferred through the member toward supports, with shear being one of the principal internal mechanisms of transfer.',

      equation:
        'For a beam, dM/dx = V under the usual sign conventions, where V is shear force and M is bending moment.',

      analysis:
        'Shear diagrams and section forces identify locations where transverse demand is high.',

      resultInterpretation:
        'Shear demand often becomes critical near supports and concentrated loads. Check the location, sign, magnitude, governing combination, and physical load path.',

      practice:
        'In reinforced concrete, shear failures can be brittle, so checking and detailing require particular attention.',

      designThinking:
        'Do not assume that satisfactory flexural behaviour means shear is also satisfactory.',

      construction:
        'Shear resistance can be strongly affected by reinforcement anchorage, stirrup placement, spacing, development, concrete quality, and construction tolerances.',

      failureReasoning:
        'High shear demand or inadequate shear resistance can produce diagonal cracking and potentially brittle failure.',

      failureModes: [
        'Diagonal tension failure',
        'Shear compression failure',
        'Punching-type shear',
        'Web failure'
      ],

      commonMistakes: [
        'Ignoring shear because flexure is satisfactory',
        'Incorrect support modelling',
        'Insufficient shear reinforcement',
        'Ignoring concentrated loads near supports'
      ],

      troubleshooting: [
        'Check support reactions',
        'Check load locations',
        'Check shear diagram',
        'Check governing combination',
        'Check member dimensions',
        'Check shear resistance and detailing'
      ],

      practicalQuestion:
        'Where does the highest shear occur, and what physical load or support condition is causing it?',

      related: [
        'bending-moment',
        'shear-stress',
        'stirrups',
        'beam'
      ]
    }
  },


  {
    id: 'stress',
    title: 'Stress',
    category: 'Mechanics',
    level: 'Foundation',
    summary:
      'Internal force intensity distributed over an area.',

    sections: {
      definition:
        'Stress describes how internal force is distributed through a material area.',

      physical:
        'Two members can carry the same force but experience different stresses if their effective areas differ.',

      behaviour:
        'Stress distribution depends on geometry, loading, material properties, boundary conditions, and whether the action is axial, bending, shear, or torsional.',

      loadPath:
        'Stress develops inside members as the structure transfers external actions through its material.',

      equation:
        'Average normal stress: σ = P/A. More general stress states require consideration of stress components and their distribution.',

      analysis:
        'Analysis may provide axial stress, bending stress, shear stress, principal stresses, or other stress measures depending on the method.',

      resultInterpretation:
        'Stress is not automatically equal to capacity. Interpret it alongside material properties, limit states, geometry, instability, and code requirements.',

      practice:
        'Stress is not automatically equal to capacity. Capacity depends on material behaviour, geometry, instability, detailing, loading history, and the applicable design model.',

      designThinking:
        'Always identify the failure mechanism associated with the stress rather than comparing a number blindly.',

      construction:
        'Material quality, defects, tolerances, reinforcement placement, welds, bolts, and construction damage can influence actual stress resistance.',

      failureReasoning:
        'Failure occurs when the relevant demand exceeds the available resistance or when instability or another governing limit state occurs.',

      failureModes: [
        'Yielding',
        'Crushing',
        'Fracture',
        'Buckling',
        'Shear failure'
      ],

      commonMistakes: [
        'Confusing stress with force',
        'Ignoring stress concentration',
        'Ignoring material behaviour',
        'Comparing stress with the wrong resistance value'
      ],

      troubleshooting: [
        'Check force',
        'Check effective area',
        'Check material',
        'Check stress distribution',
        'Check relevant limit state'
      ],

      practicalQuestion:
        'What type of stress is present, where is it concentrated, and what failure mechanism would it cause?',

      related: [
        'strain',
        'strength',
        'axial-force',
        'material'
      ]
    }
  },


  {
    id: 'strain',
    title: 'Strain',
    category: 'Mechanics',
    level: 'Foundation',
    summary:
      'A measure of deformation relative to an original dimension.',

    sections: {
      definition:
        'Strain quantifies deformation. Normal strain is the change in length divided by the original length.',

      physical:
        'A material can deform without necessarily failing. Understanding strain helps connect loads to stiffness, cracking, yielding, and serviceability.',

      behaviour:
        'Strain develops in response to stress and material behaviour. Elastic, plastic, cracking, creep, shrinkage, and other effects can influence the response.',

      loadPath:
        'Strain develops within members as external actions are transferred through the structure.',

      equation:
        'ε = ΔL/L₀.',

      analysis:
        'Analysis may report displacement, strain, curvature, or deformation depending on the modelling approach.',

      resultInterpretation:
        'Large deformation or strain does not automatically mean collapse, but it can indicate serviceability problems or approach to a limit state.',

      practice:
        'Distinguish strain from stress: stress is an internal force intensity; strain is deformation. Their relationship depends on material behaviour.',

      designThinking:
        'Use strain to understand deformation, stiffness, ductility, cracking, and material response.',

      construction:
        'Actual strain behaviour can be influenced by curing, temperature, shrinkage, creep, construction sequence, and restraint.',

      failureReasoning:
        'Excessive strain can indicate yielding, cracking, instability, excessive deformation, or another limit state depending on the material.',

      failureModes: [
        'Yielding',
        'Cracking',
        'Excessive deformation',
        'Material failure'
      ],

      commonMistakes: [
        'Confusing strain and stress',
        'Ignoring material nonlinearity',
        'Ignoring serviceability'
      ],

      troubleshooting: [
        'Check displacement',
        'Check material model',
        'Check boundary conditions',
        'Check whether cracking or yielding is included'
      ],

      practicalQuestion:
        'What physical deformation does this strain represent, and is that deformation acceptable?',

      related: [
        'stress',
        'elasticity',
        'plasticity',
        'stiffness'
      ]
    }
  },


  // =========================================================
  // STRUCTURAL BEHAVIOUR
  // =========================================================

  {
    id: 'stiffness',
    title: 'Stiffness',
    category: 'Structural Behaviour',
    level: 'Foundation',
    summary:
      'A measure of how strongly a structural system resists deformation under an applied action.',

    sections: {
      definition:
        'Stiffness describes the relationship between applied action and resulting deformation.',

      physical:
        'A stiffer member generally changes shape less under the same loading, all else equal.',

      behaviour:
        'Stiffness controls how forces and deformations are distributed throughout a structural system.',

      loadPath:
        'Stiffness influences which structural members attract load and how load is distributed between parallel load paths.',

      equation:
        'For a simple spring, k = F/Δ. Structural stiffness can involve axial, flexural, shear, torsional, or system-level behaviour.',

      analysis:
        'Analysis software uses member and system stiffness to determine deformation and force distribution.',

      resultInterpretation:
        'Unexpected forces or deflections can sometimes be traced to incorrect stiffness assumptions rather than insufficient member strength.',

      practice:
        'Strength and stiffness are different. A member can be strong enough but too flexible, leading to excessive deflection, drift, vibration, or second-order effects.',

      designThinking:
        'Changing member stiffness changes the behaviour of the whole structural system, not just that member.',

      construction:
        'Cracking, connection flexibility, composite action, construction sequence, and actual material properties can change effective stiffness.',

      failureReasoning:
        'Insufficient stiffness can lead to excessive deformation, instability, vibration, or redistribution of forces.',

      failureModes: [
        'Excessive deflection',
        'Excessive drift',
        'Vibration',
        'Instability',
        'Unexpected force redistribution'
      ],

      commonMistakes: [
        'Confusing strength with stiffness',
        'Using unrealistic stiffness modifiers',
        'Ignoring cracking',
        'Ignoring connection flexibility'
      ],

      troubleshooting: [
        'Check member properties',
        'Check material properties',
        'Check stiffness modifiers',
        'Check supports',
        'Check connectivity',
        'Check deformation results'
      ],

      practicalQuestion:
        'If I change this member stiffness, what happens to the behaviour of the entire structural system?',

      related: [
        'strength',
        'deflection',
        'drift',
        'stability'
      ]
    }
  },


  {
    id: 'strength',
    title: 'Strength',
    category: 'Structural Behaviour',
    level: 'Foundation',
    summary:
      'The ability of a structural component or system to resist a specified action without unacceptable failure.',

    sections: {
      definition:
        'Strength is the resistance available against a particular failure or limit state.',

      physical:
        'Strength depends on material, geometry, loading, boundary conditions, imperfections, and the failure mechanism being considered.',

      behaviour:
        'Different failure mechanisms can govern even within the same member.',

      loadPath:
        'Strength must be considered at every important point along the load path.',

      equation:
        'A common design comparison is demand ≤ design resistance, with the exact format governed by the adopted design standard.',

      analysis:
        'Analysis determines demand; design checks determine whether the available resistance is adequate.',

      resultInterpretation:
        'Never interpret a utilization ratio without understanding the limit state, combination, code provisions, and modelling assumptions behind it.',

      practice:
        'Do not assume that a stronger-looking member is automatically safer. The governing failure mechanism and structural system must be understood.',

      designThinking:
        'Determine the governing limit state before deciding how to increase capacity.',

      construction:
        'Actual capacity depends on material quality, detailing, workmanship, dimensions, connections, and construction tolerances.',

      failureReasoning:
        'Failure occurs when the relevant demand exceeds available resistance or when another governing mechanism such as instability occurs.',

      failureModes: [
        'Flexural failure',
        'Shear failure',
        'Compression failure',
        'Tension failure',
        'Buckling',
        'Connection failure'
      ],

      commonMistakes: [
        'Checking only one failure mode',
        'Ignoring serviceability',
        'Ignoring stability',
        'Misinterpreting utilization ratios'
      ],

      troubleshooting: [
        'Identify governing demand',
        'Identify governing limit state',
        'Check design resistance',
        'Check code requirements',
        'Check modelling assumptions'
      ],

      practicalQuestion:
        'What exact failure mechanism is this strength check trying to prevent?',

      related: [
        'stiffness',
        'failure-mode',
        'capacity',
        'demand'
      ]
    }
  },


  {
    id: 'stability',
    title: 'Stability',
    category: 'Structural Behaviour',
    level: 'Intermediate',
    summary:
      'The ability of a structure to maintain an acceptable equilibrium configuration under disturbances and loading.',

    sections: {
      definition:
        'Stability concerns whether an equilibrium state can be maintained as loads, geometry, and imperfections change.',

      physical:
        'A structure may have adequate material strength yet become unstable through buckling, sway, overturning, or other mechanisms.',

      behaviour:
        'Stability is strongly influenced by geometry, stiffness, restraints, imperfections, and load level.',

      loadPath:
        'A stable load path must transfer actions without allowing uncontrolled deformation or loss of equilibrium.',

      equation:
        'Stability problems often depend on geometry and stiffness rather than simple stress capacity; critical load concepts such as Euler buckling are foundational.',

      analysis:
        'Stability analysis can involve eigenvalue buckling, second-order analysis, nonlinear analysis, or code-specific procedures.',

      resultInterpretation:
        'A high theoretical buckling factor does not automatically guarantee real-world stability because imperfections, material nonlinearity, restraints, and modelling assumptions matter.',

      practice:
        'When instability is possible, investigate boundary conditions, effective length, imperfections, second-order effects, lateral restraint, and the global load path.',

      designThinking:
        'Think about how the structure behaves when it moves away from its original geometry.',

      construction:
        'Temporary construction conditions can be significantly less stable than the completed structure.',

      failureReasoning:
        'Instability can occur before material strength is reached.',

      failureModes: [
        'Buckling',
        'Sway instability',
        'Overturning',
        'Lateral instability',
        'Progressive instability'
      ],

      commonMistakes: [
        'Ignoring second-order effects',
        'Assuming ideal restraints',
        'Ignoring imperfections',
        'Checking material strength only'
      ],

      troubleshooting: [
        'Check restraints',
        'Check effective length',
        'Check stiffness',
        'Check P-Delta effects',
        'Check imperfections',
        'Check lateral load path'
      ],

      practicalQuestion:
        'If the structure moves slightly from its original position, does the system tend to restore equilibrium or move further away from it?',

      related: [
        'buckling',
        'p-delta',
        'slenderness',
        'stiffness'
      ]
    }
  },


  // =========================================================
  // STRUCTURAL SYSTEMS
  // =========================================================

  {
    id: 'load-path',
    title: 'Load Path',
    category: 'Structural Systems',
    level: 'Foundation',
    summary:
      'The continuous route by which actions are transferred through structural elements to the ground.',

    sections: {
      definition:
        'A load path describes how applied actions travel from their point of application through connected structural components to the foundations and supporting ground.',

      physical:
        'For gravity loading, a typical path is slab → beam → column/wall → foundation → soil. Lateral loading follows a different system involving diaphragms and lateral-resisting elements.',

      behaviour:
        'Every action needs a continuous and physically realistic path through the structural system.',

      loadPath:
        'The concept itself represents the complete route from applied action to supporting ground.',

      equation:
        'There is no single universal equation; the principle is equilibrium and compatible force transfer through connected members.',

      analysis:
        'Analysis results should be interpreted by tracing forces from their origin through the structural system.',

      resultInterpretation:
        'Unexpected force concentrations, reactions, or deformations often become easier to understand when the load path is traced.',

      practice:
        'Before trusting an analysis model, be able to explain the expected load path. Discontinuities, transfer levels, weak connections, and missing stiffness can produce major unintended behaviour.',

      designThinking:
        'Always ask: where does the load enter, where does it go, and what element carries it at every stage?',

      construction:
        'The designed load path must actually exist in the constructed structure through proper connections and continuity.',

      failureReasoning:
        'A broken or weak load path can cause unexpected load redistribution and local or global failure.',

      failureModes: [
        'Transfer failure',
        'Connection failure',
        'Discontinuity',
        'Weak storey',
        'Progressive failure'
      ],

      commonMistakes: [
        'Ignoring secondary load paths',
        'Ignoring connections',
        'Assuming walls or slabs automatically transfer loads',
        'Ignoring transfer levels'
      ],

      troubleshooting: [
        'Start at the applied load',
        'Trace each supporting element',
        'Check connections',
        'Check reactions',
        'Check foundations',
        'Check soil support'
      ],

      practicalQuestion:
        'Can I physically draw the route this load takes from where it is applied all the way to the ground?',

      related: [
        'diaphragm',
        'beam',
        'column',
        'shear-wall',
        'foundation'
      ]
    }
  },


  {
    id: 'diaphragm',
    title: 'Diaphragm',
    category: 'Structural Systems',
    level: 'Intermediate',
    summary:
      'A structural floor or roof system that transfers in-plane actions to vertical lateral-resisting elements.',

    sections: {
      definition:
        'A diaphragm acts primarily in its plane to distribute and transfer lateral forces between the mass of a floor or roof and the vertical elements resisting those forces.',

      physical:
        'During lateral loading, the diaphragm helps coordinate the response of frames, walls, and other vertical elements.',

      behaviour:
        'Diaphragm stiffness influences how lateral forces are distributed between vertical resisting elements.',

      loadPath:
        'Lateral inertia forces enter the diaphragm and are transferred toward frames, walls, or other lateral-resisting elements.',

      equation:
        'The exact force distribution depends on diaphragm stiffness, geometry, connectivity, and the analysis model.',

      analysis:
        'Analysis models may represent diaphragms as rigid, semi-rigid, flexible, or through explicit structural elements depending on the modelling approach.',

      resultInterpretation:
        'Unexpected diaphragm forces or building torsion should trigger investigation of stiffness, geometry, openings, and vertical element arrangement.',

      practice:
        'Do not select rigid or flexible diaphragm assumptions mechanically. Consider actual construction, relative stiffness, openings, collectors, chords, and the requirements of the adopted standard.',

      designThinking:
        'Understand how the diaphragm connects the mass of the building to the lateral-resisting system.',

      construction:
        'Connections, slab continuity, joints, openings, collectors, chords, and construction sequencing influence diaphragm behaviour.',

      failureReasoning:
        'Diaphragm problems can occur through inadequate strength, insufficient connectivity, excessive deformation, or discontinuity.',

      failureModes: [
        'Diaphragm shear failure',
        'Chord failure',
        'Collector failure',
        'Connection failure',
        'Excessive deformation'
      ],

      commonMistakes: [
        'Automatically assuming rigid diaphragm behaviour',
        'Ignoring openings',
        'Ignoring collectors',
        'Ignoring diaphragm connections'
      ],

      troubleshooting: [
        'Check diaphragm assumption',
        'Check openings',
        'Check connectivity',
        'Check lateral elements',
        'Check torsional response'
      ],

      practicalQuestion:
        'How does the floor or roof actually transfer lateral force to the walls and frames?',

      related: [
        'shear-wall',
        'lateral-system',
        'torsion',
        'load-path'
      ]
    }
  },


  // =========================================================
  // FAILURE & STABILITY
  // =========================================================

  {
    id: 'buckling',
    title: 'Buckling',
    category: 'Failure & Stability',
    level: 'Intermediate',
    summary:
      'An instability phenomenon in which a member can experience large deformation under compressive or combined loading.',

    sections: {
      definition:
        'Buckling is a stability-driven response in which a structural member or system loses its original equilibrium configuration.',

      physical:
        'A slender compression member can deflect laterally even when material stress has not reached simple crushing strength.',

      behaviour:
        'Buckling behaviour depends on slenderness, stiffness, restraints, imperfections, material properties, and loading.',

      loadPath:
        'Compression forces must be transferred through a stable system with adequate lateral and rotational restraint.',

      equation:
        'For an ideal Euler column, Pcr = π²EI/(KL)². Real design requires consideration of imperfections, inelasticity, restraint, residual stress, and the applicable code model.',

      analysis:
        'Buckling analysis may provide eigenmodes, critical factors, or nonlinear stability response.',

      resultInterpretation:
        'An eigenvalue buckling factor is not automatically a direct safety factor. It must be interpreted with the analysis assumptions and code procedure.',

      practice:
        'Never use Euler buckling as a universal design formula. It is a conceptual foundation. Real members require a code-specific stability procedure.',

      designThinking:
        'Identify the possible buckling mode before deciding how to increase capacity.',

      construction:
        'Temporary bracing, erection sequence, imperfections, and incomplete connections can make construction-stage buckling critical.',

      failureReasoning:
        'Buckling is controlled by stability and geometry and can occur before simple material crushing.',

      failureModes: [
        'Flexural buckling',
        'Torsional buckling',
        'Flexural-torsional buckling',
        'Lateral-torsional buckling',
        'Local buckling'
      ],

      commonMistakes: [
        'Using Euler formula blindly',
        'Ignoring effective length',
        'Ignoring imperfections',
        'Ignoring lateral restraint'
      ],

      troubleshooting: [
        'Check effective length',
        'Check restraints',
        'Check member stiffness',
        'Check slenderness',
        'Check second-order effects',
        'Check applicable code procedure'
      ],

      practicalQuestion:
        'What physical movement is the member trying to make when it becomes unstable?',

      related: [
        'stability',
        'slenderness',
        'p-delta',
        'column'
      ]
    }
  },


  {
    id: 'p-delta',
    title: 'P-Delta Effect',
    category: 'Structural Behaviour',
    level: 'Advanced',
    summary:
      'Second-order effects caused by axial force acting through lateral displacement.',

    sections: {
      definition:
        'P-Delta effects arise when an axial force P acts through a displaced geometry with lateral offset Δ, producing an additional moment.',

      physical:
        'As a building sways, gravity loads can amplify the overturning effects. This can reduce effective stability and increase demands.',

      behaviour:
        'P-Delta effects become more important as axial load and lateral displacement increase.',

      loadPath:
        'Gravity loads acting through displaced geometry create additional moments that must be transferred through the lateral system.',

      equation:
        'A simplified additional moment is approximately M₂ = PΔ. Real structural analysis can require iterative or geometric-nonlinear methods.',

      analysis:
        'Analysis software may account for second-order effects using P-Delta or geometric nonlinear analysis.',

      resultInterpretation:
        'If P-Delta significantly changes moments or drift, the engineer should investigate stability, stiffness, geometry, and code requirements.',

      practice:
        'Review P-Delta when axial load and lateral displacement are significant. Check whether the analysis model, stiffness assumptions, stability criteria, and code requirements are appropriate.',

      designThinking:
        'Ask whether the structure becomes more unstable as it deforms.',

      construction:
        'Construction-stage geometry and incomplete lateral systems can influence second-order effects.',

      failureReasoning:
        'Large P-Delta amplification can contribute to instability and excessive structural demand.',

      failureModes: [
        'Second-order amplification',
        'Sway instability',
        'Excessive drift',
        'Progressive instability'
      ],

      commonMistakes: [
        'Ignoring second-order effects',
        'Using unrealistic stiffness',
        'Ignoring axial load accumulation',
        'Ignoring drift'
      ],

      troubleshooting: [
        'Check axial loads',
        'Check drift',
        'Check stiffness',
        'Check P-Delta settings',
        'Check stability criteria'
      ],

      practicalQuestion:
        'As the structure moves laterally, does the gravity load create additional demand large enough to change the structural response?',

      related: [
        'stability',
        'drift',
        'buckling',
        'second-order-effects'
      ]
    }
  },


  // =========================================================
  // LOADS
  // =========================================================

  {
    id: 'load',
    title: 'Structural Load',
    category: 'Loads & Actions',
    level: 'Foundation',
    summary:
      'An applied action that produces forces, moments, stresses, strains, or deformation in a structure.',

    sections: {
      definition:
        'Structural loads/actions include permanent, variable, environmental, accidental, and other effects relevant to a project.',

      physical:
        'Loads enter the structure at different locations and travel through the structural system to the supports and ground.',

      behaviour:
        'Different load types produce different structural responses and may govern different members or limit states.',

      loadPath:
        'Every load must have a continuous path from its point of application to the supporting ground.',

      equation:
        'The appropriate load model and combinations depend on the project, hazard, occupancy, and governing standards.',

      analysis:
        'Analysis software applies loads through load cases and combinations and calculates resulting structural actions.',

      resultInterpretation:
        'Before interpreting an analysis result, confirm that the load magnitude, location, direction, pattern, and combination are correct.',

      practice:
        'A good load assessment begins with the physical project: what exists, what will be occupied, what can move, what can fall, and what environmental actions are plausible.',

      designThinking:
        'Load assessment should begin from physical reality rather than starting with numbers in the analysis software.',

      construction:
        'Construction loads can differ substantially from final design loads and may create temporary critical conditions.',

      failureReasoning:
        'Incorrect load assumptions can lead to either unsafe underestimation or uneconomic overdesign.',

      failureModes: [
        'Underestimated loading',
        'Incorrect load combination',
        'Incorrect load distribution',
        'Unconsidered accidental load'
      ],

      commonMistakes: [
        'Wrong units',
        'Missing self-weight',
        'Incorrect load combinations',
        'Ignoring construction loads',
        'Ignoring environmental actions'
      ],

      troubleshooting: [
        'Check load source',
        'Check magnitude',
        'Check direction',
        'Check application area',
        'Check load combinations',
        'Check governing design standard'
      ],

      practicalQuestion:
        'What real physical action does this load represent, and is the way I applied it consistent with the actual structure?',

      related: [
        'dead-load',
        'live-load',
        'wind-load',
        'seismic-load',
        'load-combination'
      ]
    }
  },


  // =========================================================
  // STRUCTURAL ELEMENTS
  // =========================================================

  {
    id: 'beam',
    title: 'Beam',
    category: 'Structural Elements',
    level: 'Foundation',

    summary:
      'A structural member primarily used to resist transverse loading through bending and shear, while also potentially carrying axial force and torsion.',

    sections: {

      definition:
        'A beam is generally a linear structural member whose behaviour is dominated by bending and shear under transverse loading. It spans between supports and collects load from slabs, walls, finishes, equipment, or other members.',

      role:
        'In the gravity system a beam typically gathers tributary load and delivers reactions to columns, walls, or girders. In a frame it may also provide rotational restraint, continuity, and a share of lateral stiffness. Its role is to span and transfer — not merely to exist as a rectangular section in the model.',

      physical:
        'When a beam is loaded across its span, adjacent sections rotate relative to one another and the centreline curves. Internal bending moment resists that rotation; internal shear resists the tendency of adjacent portions to slide. Supports develop reactions so the whole member remains in equilibrium. If the beam is continuous, negative moment usually forms over supports and positive moment in spans.',

      behaviour:
        'Internal forces vary along the member: shear is often largest near supports and concentrated loads; moment follows from the shear diagram and the support conditions. Deflection depends on span, loading, EI (flexural stiffness), shear stiffness, cracking or yielding, and whether the beam is simply supported or continuous. Axial force and torsion appear when the member is part of a frame, is loaded off-axis, or frames into a stiff wall or irregular geometry.',

      loadPath:
        'A typical gravity path is slab or supported member → beam → column or wall → foundation → ground. Ask: what loads enter this beam, through which faces or connections, and what receives the reactions? A missing or incorrect path — a beam that does not actually frame into what the model assumes — produces results that look like a design problem but are a modelling or layout problem.',

      equation:
        'For a beam in equilibrium, distributed load, shear and moment are related: dV/dx = −w and dM/dx = V under the usual sign convention. Flexural curvature is related to moment through EI in elastic theory: M = EI κ, where E is the material modulus and I is the second-moment of area of the section. These relationships explain diagram shapes and stiffness; they are not a substitute for the strength, serviceability and detailing checks of the adopted design standard.',

      analysis:
        'In analysis software, inspect the moment and shear diagrams, support reactions, deflection, and — if the member is framed — axial force and torsion. Note local-axis orientation, member releases, rigid offsets, and the load combination that governs. Utilization or design ratios, where provided, still have to be read with the limit state they represent.',

      resultInterpretation:
        'A large moment or shear is a demand result, not a verdict. Before changing the section, check whether the tributary loading, self-weight, span, support type, continuity, and releases match the real structure. Confirm local versus global axes and the governing combination. Compare the diagram shape with a simple hand sketch: a simply supported span should not look like a fixed beam unless the model is actually fixed. If demand is real, identify which limit state governs — flexure, shear, deflection, vibration, torsion, or the connection — before deciding what to change.',

      practice:
        'Span, depth, continuity, and what the beam frames into usually matter more than a single software peak. Coordinate openings, services, and support locations with architecture. Stiffness relative to neighbouring beams and slabs changes how much load the member attracts. Connections, bearing lengths, and constructable reinforcement or steel detailing often govern as much as the calculated section capacity.',

      designThinking:
        'Start with role and load path, then demand, then capacity and serviceability. Changing depth affects stiffness, deflection, shear, and how much moment a continuous beam attracts. Adding reinforcement or a cover plate is not the same decision as deepening the member, and neither is the right first move if the model is wrong. Applicable code checks, material, and detailing come after the behaviour is understood — they are not universal numbers to paste into every project.',

      construction:
        'Assumed fixity may be a simple bearing in reality. Reinforcement placement, cover, laps, stirrup spacing, camber, shoring removal, and construction loading change cracking and deflection. Steel beams depend on restraint to the compression flange, connection type, and whether composite action with the slab is actually achieved. Temporary conditions can be more severe than the finished state.',

      failureReasoning:
        'If a beam “fails” in software or on site, name the mechanism. Flexure is usually ductile if well detailed; shear can be brittle, especially in concrete. Excessive deflection or vibration can make the member unserviceable while still “strong”. Lateral-torsional buckling is a stability problem of unrestrained compression flanges, not a missing area of steel. Connection or bearing failure can unload the span even when the beam section itself is adequate. Diagnose the mechanism, then the cause: loading, span, supports, stiffness, detailing, or the model.',

      failureModes: [
        'Flexural yielding or crushing: moment demand exceeds section capacity at a critical region; look for peak moment at midspan or over supports and check whether continuity was modelled correctly.',
        'Shear failure: transverse demand near supports or point loads exceeds shear resistance; in concrete this can be sudden, so high shear is not a reason to look only at flexure.',
        'Excessive deflection or vibration: stiffness, span, cracking, or live-load pattern is governing even if strength ratios look acceptable.',
        'Lateral-torsional buckling: the compression flange is not adequately restrained; a larger I in the wrong plane will not fix a restraint problem.',
        'Torsion and compatibility torsion: eccentric loading or framing into a stiff member twists the beam; check whether the model released torsion that the real connection cannot release.',
        'Connection, bearing, or anchorage failure: the span is fine but the joint cannot deliver the reaction or moment the analysis assumes.'
      ],

      commonMistakes: [
        'Treating a large moment as a command to deepen the beam without checking load path, span, and supports.',
        'Modelling pinned supports when the beam is continuous, or fixed supports when it bears simply.',
        'Ignoring self-weight, superimposed dead load, or finishes in the tributary load.',
        'Reading local-axis moments with the wrong sign or the wrong principal direction.',
        'Checking flexure and skipping shear, deflection, vibration, or the connection.',
        'Assuming composite or fixed behaviour that construction will not actually provide.'
      ],

      troubleshooting: [
        'Problem: unexpectedly high midspan moment. Check tributary load, point loads, self-weight, span length, and whether the beam is really simply supported.',
        'Problem: high moment over a support. Check continuity, support stiffness, and whether adjacent spans or a stiff wall are attracting moment.',
        'Problem: high shear at the end. Confirm reactions, concentrated loads near the support, and that the support exists in the model where it exists on the drawing.',
        'Problem: large deflection. Check EI, cracking assumptions, live-load pattern, camber, and whether stiffness of neighbouring members was overstated.',
        'Problem: almost no force in the beam. The load may be going elsewhere — missing connectivity, a stiffer alternate path, or loads applied to the wrong member.',
        'Only after the result is physically explained should you change size, reinforcement, or the structural system.'
      ],

      practicalQuestion:
        'If your software reports a very large bending moment in a beam, the first question should not be "How can I make the beam bigger?" Ask instead: "Why is this beam receiving this demand, and does that demand make physical sense?"',

      practicalQuestions: [
        'Why is the moment so high at this location, and does the moment diagram match the supports I think I have?',
        'Is shear, deflection, or the connection actually governing rather than flexure?',
        'Where does this beam get its load, and what receives the reaction?',
        'Would changing depth attract more moment in a continuous system?'
      ],

      related: [
        'moment',
        'shear-force',
        'column',
        'slab',
        'stiffness',
        'load-path',
        'strength'
      ]
    }
  },


  {
    id: 'column',
    title: 'Column',
    category: 'Structural Elements',
    level: 'Foundation',

    summary:
      'A primarily vertical member that transfers axial and often combined axial, bending, and shear actions.',

    sections: {

      definition:
        'A column is a primarily vertical member that carries compression (and sometimes tension) from the structure above toward the foundation. In frames it also resists bending and shear from gravity eccentricity, continuity, and lateral loading.',

      role:
        'Columns collect reactions from beams, slabs, and walls storey by storey and deliver them to foundations. In a moment frame they form part of the lateral system; in a wall or braced building they may be mainly gravity members. Their location also sets tributary area, transfer conditions, and how moments enter the foundation.',

      physical:
        'Axial load shortens the member. If the load is eccentric, or the storey sways, the column also bends. Combined compression and bending produce a stress gradient across the section: one face more compressed, the other less compressed or even in tension. Lower-storey columns typically carry the accumulated gravity of several floors, so a modelling error in tributary area grows as you move downward.',

      behaviour:
        'A stocky column may be governed by material crushing or by P–M interaction at the section. A slender column can lose stability by buckling at a load well below the squash load. Storey drift plus axial force creates second-order (P-Delta) moments. Effective length depends on rotational restraint from beams, walls, and foundations — not on storey height alone. Shear is usually secondary except in short, heavily loaded, or seismically detailed columns.',

      loadPath:
        'Gravity typically follows slab → beam or wall → column → foundation → ground. Lateral load may enter through beams and the diaphragm and leave as shear and overturning in the column, then into the foundation. If a transfer beam, setback, or missing column interrupts that path, demand concentrates in unexpected members. Always trace what is sitting on the column and what the column is sitting on.',

      equation:
        'Section capacity is an interaction between axial force P and moments Mx, My — not P alone. Elastic buckling of an ideal pin-ended column is illustrated by Euler’s load Pcr = π²EI/(KL)², where KL is the effective length. Real members have residual stress, imperfections, and inelasticity, so design uses the adopted standard’s stability procedure rather than Euler’s formula as a capacity. Second-order moment is conceptually M2 ≈ PΔ, where Δ is the relative lateral displacement; whether and how that is included is a modelling and code decision.',

      analysis:
        'Review axial force (including accumulation), moments about both local axes, shear, column stack alignment, assigned unbraced length, end releases, and whether P-Delta or geometric nonlinearity is on. Drift of the storeys the column belongs to matters as much as the member forces. Design ratios must be tied to the interaction check actually being performed.',

      resultInterpretation:
        'A high axial force is expected in a lower-storey gravity column; it is not automatically failure. Ask whether moments are from gravity eccentricity, frame action, or an unintended fixity. If utilization is high, separate section crushing from slenderness and from second-order amplification. Check that the column is connected to the beams and slab that should load it, and that a stiff wall nearby is not (or is) attracting the lateral load you assumed. Do not enlarge the section until the demand is explained.',

      practice:
        'Column size is a coordination problem: architecture, services, beam depths, and foundation layout all constrain it. Continuity through floors, splices, and the beam-column joint often govern detailing more than the shaft. Changing one column’s stiffness redistributes moments and drift in a frame. Transfer columns and sloping columns need an explicit load-path sketch, not only a mesh.',

      designThinking:
        'Decide first whether the column is a gravity member, a frame member, or both. Then identify governing P, M, and unbraced length. Increasing size increases capacity and stiffness — and may attract more moment. Sometimes the better move is to reduce eccentricity, add restraint, change the lateral system, or correct the tributary model. Code interaction diagrams and slenderness limits belong to the selected standard; they are not interchangeable worldwide.',

      construction:
        'Out-of-plumb, displacement of reinforcement, congested joints, poorly compacted concrete, misplaced splices, and inadequate confinement change both strength and ductility. Steel columns depend on base-plate details, splice location, and whether the intended rotational restraint exists. Construction-stage loads and missing floors of restraint can create a temporary slenderness condition worse than the completed building.',

      failureReasoning:
        'Column failure is often sudden compared with beam flexure. Crushing is a material-capacity problem. Buckling is a stability problem of geometry, restraint, and stiffness. Combined P–M failure occurs when moment uses up the compression capacity of the section. A joint or foundation that cannot develop the assumed moment unloads or overloads the shaft. In analysis, a “failing” column may simply have the wrong effective length, a missing floor diaphragm, or loads from a storey that should not tributary to it.',

      failureModes: [
        'Squash or crushing: axial demand exceeds the section’s compressive resistance with little bending; investigate tributary area and load accumulation first.',
        'Flexural or P–M interaction failure: moment plus axial force reaches the interaction surface; check frame moments, eccentricity, and accidental eccentricity assumptions.',
        'Buckling / slenderness: the member displaces laterally and loses capacity; check unbraced length, end restraint, and whether intermediate floors actually brace the column.',
        'Second-order amplification: P acting through storey drift increases moment; look at drift, not only first-order member forces.',
        'Shear or short-column failure: a stiff infill or a short clear height attracts shear; the model may have used a longer unbraced length than exists.',
        'Base, splice, or joint failure: the shaft is not the weak link — the connection cannot deliver P and M into the next storey or the foundation.'
      ],

      commonMistakes: [
        'Designing for axial load only and ignoring moments from continuity or lateral load.',
        'Using storey height as effective length without looking at actual rotational restraint.',
        'Leaving P-Delta off in a sway building, or leaving it on without checking that stiffness is realistic.',
        'Missing load from several floors in a stacked column.',
        'Ignoring a stiff shear wall that changes which columns see lateral force.',
        'Assuming a fixed base when the foundation rotation is significant.'
      ],

      troubleshooting: [
        'Problem: column utilization high in a lower storey. Sum tributary gravity from all floors and compare with a hand take-off before changing size.',
        'Problem: large moments in a gravity-only building. Check accidental eccentricity, beam framing, and whether the column was accidentally made to resist lateral load.',
        'Problem: buckling or slenderness warning. Check unbraced length, missing floor levels, and releases at the ends.',
        'Problem: forces jump at a transfer level. Sketch the interrupted load path; the issue may be the transfer girder or a missing column, not this shaft.',
        'Problem: almost no load in a column that should be loaded. Connectivity, meshing of the slab, or a stiffer wall may have stolen the tributary area.',
        'Only then consider a larger section, extra reinforcement, or a change of system.'
      ],

      practicalQuestion:
        'Is this column failing because of material capacity, instability, excessive moment, incorrect load path, or a modelling assumption?',

      practicalQuestions: [
        'Why is this column’s axial force so high — is the tributary area real?',
        'Are the moments from gravity eccentricity, frame action, or an unintended support condition?',
        'Is slenderness or P-Delta governing rather than the section area?',
        'What happens to this column if the adjacent shear wall is stiffer or more flexible than modelled?'
      ],

      related: [
        'buckling',
        'p-delta',
        'stability',
        'beam',
        'foundation',
        'stiffness',
        'load-path'
      ]
    }
  },


  {
    id: 'slab',
    title: 'Slab',
    category: 'Structural Elements',
    level: 'Foundation',

    summary:
      'A plate-like structural element that carries distributed loads and transfers them to supporting beams, walls, columns, or foundations.',

    sections: {

      definition:
        'A slab is a relatively thin plate or shell that carries gravity loads over an area and may also act as a horizontal diaphragm. It spans one-way or two-way depending on geometry and supports, not depending on what it is called on a drawing.',

      role:
        'The slab is usually the first collector in the gravity path: occupancy, finishes, and self-weight enter here. It delivers those actions to beams, walls, or directly to columns (flat slabs). In lateral loading it often distributes in-plane force to walls and frames. Thickness, openings, and support layout therefore affect both gravity design and the whole building’s lateral behaviour.',

      physical:
        'Under gravity the slab curves between supports. In a one-way slab most curvature is in one direction, like a wide beam. In a two-way slab curvature develops in both directions and load is shared according to relative stiffness and span. Over a column in a flat slab the plate tries to punch through, which is a local three-dimensional shear problem, not the same as beam shear at a wall.',

      behaviour:
        'Moments follow the supports: negative moment typically occurs over continuous edges and columns; positive moment in the midpanel. Cracking reduces stiffness and increases deflection with time through shrinkage and creep. Openings interrupt both bending strips and in-plane diaphragm paths. A stiff supporting beam or wall takes more load than a flexible one; dropping a beam out of the model dumps that load into the slab or another member.',

      loadPath:
        'Gravity: imposed load and self-weight → slab → beams and/or walls and/or columns → vertical members → foundation → ground. Lateral: floor mass → in-plane slab (diaphragm) → collectors and chords → walls or frames → foundation. If the slab does not actually connect to a wall, or a large opening cuts the diaphragm, the analysis path is fictional.',

      equation:
        'Elastic plate bending relates moments to curvatures through flexural rigidity D = Eh³/12(1−ν²), where h is thickness. Engineers more often use strip methods, yield-line ideas, or finite elements to estimate moments; those are models, not unique truths. Punching around a column is a local shear problem on a critical perimeter — the exact perimeter and resistance are defined by the adopted code, not by a universal formula in this article. Deflection depends strongly on cracked stiffness, not only on elastic D.',

      analysis:
        'Look at moments in the two local directions, support reactions, deflection, and column punching (if supported on columns). For diaphragms, look at in-plane shear, collector forces, and whether the slab was modelled as rigid or semi-rigid. Mesh density, averaging strips, and local axes change reported peaks. Point moments at a single node are rarely a design number by themselves.',

      resultInterpretation:
        'A red contour in a slab finite-element plot is not automatically a failed slab. Check mesh, how supports are modelled (line support vs wall stiffness vs column punch), live-load patterning, and whether peaks are at a re-entrant corner or opening that needs local detailing rather than a thicker slab. Separate midpanel flexure from punching at columns. If deflection is high, ask whether the thickness, span, cracking, and construction sequence are realistic before adding more steel — extra steel does not always fix a stiffness problem.',

      practice:
        'Decide spanning direction from geometry and supports, then from analysis. Coordinate openings for stairs, risers, and services before reinforcing. Flat slabs trade beam congestion for punching, deflection, and vibration risk. Construction loading on early-age concrete can exceed in-service load. Diaphragm collectors and chords are part of slab design in lateral systems, not an afterthought.',

      designThinking:
        'First: how does it span, and what receives the load? Second: which limit state governs — flexure, punching, deflection, cracking, vibration, or diaphragm force? Thickening a slab increases dead load, stiffness, and seismic mass. Adding beams changes load path. Drop panels or column capitals change punching. None of these is the default answer to a coloured contour. Code moment coefficients and punching clauses apply only within their stated scope.',

      construction:
        'Cover, bar positions (top steel over supports is easily stepped on), chairs, openings cut after pouring, pour strips, camber, shoring levels, and curing control real stiffness and crack width. Post-tensioned slabs add stressing sequence and elongation. Cold joints can become unintended weak planes in diaphragm action.',

      failureReasoning:
        'Slab distress is often serviceability first: sag, cracks, vibration. Strength failures include flexural yielding of a strip and, more dangerously, punching around a column, which can progress from column to column. A diaphragm that cannot deliver in-plane force leaves walls under-loaded and frames over-loaded. Many “analysis failures” are mesh singularities, missing wall supports, or loads applied to the shell that should be on a beam.',

      failureModes: [
        'Flexural yielding of a span or support strip: moment exceeds the designed resistance; check spanning direction and whether continuity over the support exists.',
        'Punching shear at a column or loaded area: local failure of the plate around the support; look at reaction, opening beside the column, and unbalanced moment from the slab.',
        'Excessive deflection or ponding: long spans, thin sections, early shoring removal, or uncracked-stiffness modelling.',
        'Service cracking and leakage: restraint, shrinkage, insufficient distribution steel, or top bars that were not at the intended depth.',
        'Vibration: low mass or stiffness for the occupancy; a strength pass does not answer this.',
        'Diaphragm shear, collector, or chord failure: in-plane path is broken by openings or missing connections to walls.'
      ],

      commonMistakes: [
        'Assuming two-way behaviour when the slab is clearly one-way, or the reverse.',
        'Designing from a single finite-element peak without a strip or load-path check.',
        'Ignoring punching because the flexural reinforcement looks adequate.',
        'Cutting large openings without providing an alternate gravity and diaphragm path.',
        'Using uncracked stiffness for deflection and then being surprised on site.',
        'Modelling a rigid diaphragm when the slab is flexible, long, or heavily opened.'
      ],

      troubleshooting: [
        'Problem: high slab moment in a contour plot. Check mesh, local axes, and whether a strip average is more meaningful than a nodal peak.',
        'Problem: high reaction on one column. Check tributary area, missing beams, and openings that dump load onto that column.',
        'Problem: punching check fails. Confirm column size, slab thickness, openings at the perimeter, and unbalanced moment from lateral load or pattern loading.',
        'Problem: excessive deflection. Check thickness, span, construction sequence, and cracked vs uncracked stiffness — not only reinforcement area.',
        'Problem: wall or frame forces look wrong. The slab may not be connected as a diaphragm, or a rigid-diaphragm assumption is distorting the load path.',
        'Only then thicken the slab, add beams, or change the system.'
      ],

      practicalQuestion:
        'How is this slab actually spanning, and where does its load go after leaving the slab?',

      practicalQuestions: [
        'Is this panel one-way or two-way, and do the supports agree with that?',
        'Is the coloured peak a punching problem, a flexural strip, or a mesh singularity?',
        'Why is deflection high if the strength ratio looks acceptable?',
        'Can this slab still deliver lateral force to the walls after the openings are cut?'
      ],

      related: [
        'diaphragm',
        'beam',
        'column',
        'moment',
        'shear-force',
        'stiffness',
        'load-path'
      ]
    }
  },


  {
    id: 'shear-wall',
    title: 'Shear Wall',
    category: 'Structural Elements',
    level: 'Intermediate',

    summary:
      'A wall-shaped structural element designed to resist substantial lateral forces and overturning effects.',

    sections: {

      definition:
        'A shear wall is a vertical plate-like member that provides in-plane lateral strength and stiffness. It resists storey shear, overturning moment, and usually gravity from tributary floors, then delivers those actions to the foundation.',

      role:
        'In the lateral system the wall is often the primary drift-controlling element. Diaphragms feed it; foundations and the soil must accept its overturning and shear. Its plan location controls torsion: a wall far from the centre of mass or rigidity will attract force and twist the building. Architecture (stairs, lifts, façades) usually decides where walls can exist; engineering has to make that layout into a valid system.',

      physical:
        'Under lateral load the wall tries to slide at the base and overturn. Internal shear resists sliding through the height; a couple of compression and tension (or less compression) through the length of the wall resists overturning. Axial gravity from floors above increases compression on one end and may keep the other end from uplifting — or not. Openings create coupled piers and coupling beams with a different deformation pattern than a solid cantilever.',

      behaviour:
        'A squat wall is often shear-sensitive; a slender wall behaves more like a vertical cantilever in flexure. Relative stiffness versus frames determines how much storey shear the wall attracts — stiffer walls take more load. Coupling beams between walls dissipate energy and change backstay forces. Foundation rotation (soil flexibility) can unload a theoretically stiff wall. Nonlinear hinging at the base or in coupling beams is a performance issue, not only a linear ratio.',

      loadPath:
        'Lateral: wind or seismic mass → diaphragm → collectors into the wall → in-plane shear and overturning down the wall → foundation (and piles or soil) → ground. Gravity: tributary slab and beams → wall → foundation. If the diaphragm is not connected, or a stack of openings destroys the web, the path stops. A wall that does not continue to a competent foundation is not a lateral-resisting element; it is a source of false stiffness in the model.',

      equation:
        'As a first picture, a cantilever wall has overturning M ≈ V × h at a height h, resisted by an axial couple over the wall length. Elastic lateral stiffness scales strongly with wall length and with whether the base is fixed or allowed to rotate. Coupled walls share overturning through coupling-beam shear. Exact strength, ductility, and shear design equations are code-specific; do not treat a rule of thumb or one national formula as universal.',

      analysis:
        'Extract storey shear in the wall, moment about the strong axis, axial force (including uplift), foundation reactions, and contribution to building drift and torsion. Check mesh (shell vs line element), out-of-plane releases, openings, and diaphragm connection. Compare wall shear with frame shear to see if the stiffness distribution is intentional. Review whether soil springs or a rigid base were assumed.',

      resultInterpretation:
        'A wall that “attracts too much force” may be doing its job — it is stiff. The question is whether that force can be detailed and founded. Before thickening the wall, check plan symmetry, accidental torsion, missing walls, diaphragm collectors, and whether frames were modelled too flexible. High tension at an end may be overturning, not a gravity error. If one wall is unloaded, another path (or a modelling disconnect) is taking the shear. Diagnose the system, not only the member.',

      practice:
        'Wall length, location, and continuity through height usually beat local reinforcement in controlling drift. Align walls with a clear foundation strategy: a huge wall on a small footing will rotate and not perform as a fixed cantilever. Coordinate openings with coupling-beam depths that can actually be built. Out-of-plane stability, intersecting walls, and construction joints are part of the same element.',

      designThinking:
        'Start with the building’s lateral concept: walls only, dual system, or walls plus frames. Then place stiffness to limit torsion, not only to “add more wall”. Increasing wall length increases stiffness and demand. Reducing a wall to help architecture may overload the remaining walls and the diaphragm. Foundation, collectors, and coupling beams are part of the wall design. Ductile detailing rules belong to the selected seismic code and region.',

      construction:
        'Boundary reinforcement, confinement, lap splices at the wrong height, poorly compacted concrete at the base, and construction joints without adequate shear transfer change both strength and intended plastic-hinge location. Coupling beams are congested; if they cannot be built as drawn, the system will not behave as analysed. Anchor the wall into the foundation; a cold joint at grade is a common weak plane.',

      failureReasoning:
        'Walls can fail in flexure at the base, in shear (often more brittle), in sliding, by crushing of a boundary, by coupling-beam failure that then overloads the piers, or by foundation rocking and bearing failure that the superstructure model never showed. Analysis “failure” is frequently a rigid-base assumption, a missing collector, or an architectural opening that was not in the mesh.',

      failureModes: [
        'Flexural yielding or crushing at the base: overturning moment exceeds the axial–moment capacity of the wall section; check gravity axial force and boundary confinement.',
        'Shear failure of the web: storey shear exceeds diagonal-compression or shear-reinforcement resistance; more dangerous because it can be brittle.',
        'Sliding at the base or a construction joint: horizontal shear is not transferred through the joint.',
        'Boundary-element or toe crushing: high compressive strain at the compressed end under cyclic overturning.',
        'Coupling-beam failure: the beams yield or shear off and the piers then act as separate, more flexible walls.',
        'Foundation rocking, bearing, or pile failure: the wall is adequate but cannot deliver overturning into the ground.'
      ],

      commonMistakes: [
        'Checking wall reinforcement without checking the foundation and the diaphragm connection.',
        'Ignoring torsion from unsymmetric wall layout.',
        'Modelling a solid wall and then cutting large openings on site.',
        'Assuming a fixed base on flexible soil.',
        'Adding walls without noticing they unload frames or overload collectors.',
        'Using a gravity-only combination to judge a lateral element.'
      ],

      troubleshooting: [
        'Problem: one wall has very high shear. Check relative stiffness, plan location (torsion), missing walls, and whether frames are too flexible in the model.',
        'Problem: wall has large tension / uplift. Check overturning path, gravity axial load, and whether the foundation was modelled as able to take tension it cannot.',
        'Problem: drift is high despite large walls. Check soil springs, stacked openings, cracked stiffness, and whether the walls are actually continuous to the base.',
        'Problem: a wall has almost no force. It may be disconnected from the diaphragm, not in the lateral load case, or overshadowed by a much stiffer wall.',
        'Problem: coupling beams overstressed. That may be intended energy dissipation — or a geometry that is too short and deep for shear. Investigate before deleting the beams.',
        'Only then change wall length, thickness, or the lateral system.'
      ],

      practicalQuestion:
        'What part of the building is this wall actually responsible for resisting, and how does that force reach its foundation?',

      practicalQuestions: [
        'Why is this wall attracting so much shear — stiffness, torsion, or a missing neighbour?',
        'Can the foundation and soil accept this overturning, or is the wall stiffer in the model than it will be on site?',
        'Do the diaphragms and collectors actually connect to this wall?',
        'If I lengthen the wall, will I reduce drift or simply attract more force?'
      ],

      related: [
        'diaphragm',
        'foundation',
        'load-path',
        'stiffness',
        'stability',
        'p-delta',
        'column'
      ]
    }
  },


  {
    id: 'foundation',
    title: 'Foundation',
    category: 'Structural Elements',
    level: 'Foundation',

    summary:
      'The part of the structural system that transfers actions from the superstructure to the supporting ground.',

    sections: {

      definition:
        'A foundation is the interface that takes actions from columns, walls, and the superstructure and delivers them into the ground. Isolated footings, combined footings, rafts, piles, and pile caps are types of that interface — they are not interchangeable without a geotechnical reason.',

      role:
        'The foundation completes every load path. Gravity, shear, overturning, and sometimes uplift must be accepted here without excessive settlement or soil failure. It also sets the rotational restraint of walls and columns: a “fixed” base in the model is a foundation and soil problem, not a software tick-box. Shallow foundations spread bearing; deep foundations bypass weak layers. The type must match the ground, not only the column grid.',

      physical:
        'A pad footing spreads a column load over an area of soil. If the load is eccentric, bearing pressure is higher on one edge and may even indicate uplift on the other. A raft shares load among many columns through plate bending on a soil spring. Piles transfer load by shaft friction and/or end bearing and then need a pile cap to collect column actions. Settlement is movement of the ground; the structure feels it as extra slope, moment, and cracking.',

      behaviour:
        'Foundation response is soil–structure interaction: a stiff raft on soft soil behaves differently from a flexible footing on dense gravel. Groundwater reduces effective stress and can cause buoyancy. Lateral load and overturning from shear walls become sliding, eccentricity, and rotational demand at the base. Differential settlement between a heavy core and light wings can load transfer beams that were never intended for that.',

      loadPath:
        'Superstructure reactions → footing, raft, or pile cap → soil and/or piles → supporting ground. For a wall, the path includes a strip footing or pile group that must take a line of shear and a large overturning couple. If the geotechnical profile changes across the site, the “same” foundation type is not the same path. Always know the founding stratum, not only the concrete outline.',

      equation:
        'Average bearing pressure is conceptually q = P/A, and eccentricity produces a pressure diagram that is not uniform — if the resultant leaves the kern, an edge unloads. Overturning is compared with restoring moment from weight; sliding is compared with available shear resistance from friction and passive earth pressure where relied upon. Settlement estimates need soil stiffness or compressibility from investigation, not a guess. Numerical factors, partial factors, and allowable pressures are defined by the geotechnical and structural standards in force — they are not listed here as universal constants.',

      analysis:
        'From the structural model, take column and wall reactions (P, Vx, Vy, Mx, My) for the relevant combinations, including lateral cases. Then assess bearing, sliding, overturning, settlement, and the structural design of the footing or pile cap (bending, shear, punching). Soil springs, if used, are an assumption: spring stiffness that is too high makes the base look fixed and can underestimate superstructure moments or wall forces. Pile models need group effects and cap stiffness.',

      resultInterpretation:
        'A “pass” on footing concrete does not mean the foundation works. Ask whether settlements are compatible with the superstructure, whether eccentricity is from a real moment or a modelling artefact, and whether groundwater and long-term soil behaviour were included. Large wall overturning on a small footing is a system problem. If one column reaction is huge, verify the superstructure load path before enlarging that footing. Geotechnical uncertainty is often larger than the precision of the structural analysis.',

      practice:
        'Foundation design is a joint structural–geotechnical activity. Founding level, adjacent excavations, trees, buried services, and construction plant all affect the real ground. Coordination of pile layouts with column grids, lift pits, and waterproofing is as important as bar schedules. Do not detail a raft as if it were a suspended slab without soil support unless that is the actual construction stage.',

      designThinking:
        'First: what does the structure deliver, and what can this ground accept? Then choose shallow versus deep, isolated versus combined versus raft, based on bearing, settlement, and eccentricity — not based on habit. Enlarging a footing reduces bearing pressure but may increase eccentricity problems or clash with neighbours. Piles change settlement but introduce cap design, tension piles, and group behaviour. Superstructure stiffness and foundation stiffness have to be consistent in the model.',

      construction:
        'Over-excavation, loosened bearing soil, water in the excavation, frozen or dried formation, and pouring on debris destroy assumed bearing. Reinforcement cages in pile caps are congested; cover and punching steel must actually be placed. Pile construction (boring, slurry, integrity) is a geotechnical process with structural consequences. Temporary dewatering can settle the site; stopping dewatering can raise groundwater later.',

      failureReasoning:
        'Foundations fail in the ground (bearing, excessive or differential settlement, sliding, overturning, liquefaction, scour) or in the concrete (flexure, punching, pile-cap shear, pile structural failure). Many serviceability failures appear in the building above as jammed doors and cracked partitions. An analysis that ignores soil flexibility can report a safe wall and an unsafe implicit foundation, or the reverse.',

      failureModes: [
        'Bearing failure of the soil: the pressure bulb exceeds shear strength of the founding stratum; check reactions, eccentricity, and the geotechnical profile.',
        'Excessive or differential settlement: the ground compresses unevenly; superstructure cracking and redistributed forces follow.',
        'Sliding: horizontal reaction exceeds available base shear resistance, including whether passive resistance was assumed but excavated.',
        'Overturning or edge uplift: the resultant of vertical load and moment falls outside a stable region of the base.',
        'Structural punching or shear of a footing or pile cap: the concrete cannot spread the column load into the soil or pile group.',
        'Pile structural or geotechnical failure: buckling of slender piles, insufficient shaft/end resistance, or a cap that does not engage the group.'
      ],

      commonMistakes: [
        'Designing the footing as a concrete block and never using the soil report.',
        'Using gravity-only reactions for a wall that is the lateral system.',
        'Ignoring eccentricity, moments, and uplift at column bases.',
        'Assuming a rigid base in the building model while the footing is small and the soil is soft.',
        'Checking average bearing and missing edge pressure or punching.',
        'Forgetting construction-stage excavation, groundwater, or adjacent surcharge.'
      ],

      troubleshooting: [
        'Problem: bearing pressure too high. Confirm the column/wall reaction with a load take-off, then eccentricity, then soil allowable or resistance from the report — not the concrete size first.',
        'Problem: large settlement in analysis or on site. Check soil layer, water table, load history, and whether neighbouring loads were included.',
        'Problem: wall footing uplifts. The overturning from the lateral system may be real; adding gravity, lengthening the wall foundation, or using piles is a system choice.',
        'Problem: punching in the pile cap. Check pile layout versus column, cap depth, and whether piles are too close to the column.',
        'Problem: superstructure moments look wrong at the base. The foundation spring or fixity assumption may be the cause, not the column design.',
        'Only then enlarge the footing, add piles, or change the superstructure layout.'
      ],

      practicalQuestion:
        'Can the ground safely and acceptably receive everything the structure is transferring into the foundation?',

      practicalQuestions: [
        'Is this a soil problem, a concrete problem, or a superstructure load-path problem?',
        'Why is settlement or edge pressure high — eccentric moment, underestimated reaction, or the wrong founding stratum?',
        'Did the building model assume a fixed base that this foundation cannot provide?',
        'If I enlarge the footing, do I actually reduce demand on the ground or only move the problem?'
      ],

      related: [
        'column',
        'shear-wall',
        'load-path',
        'stiffness',
        'stability',
        'load',
        'beam'
      ]
    }
  }

];


// =========================================================
// CATEGORIES
// =========================================================

export const categories = [
  ...new Set(knowledge.map(k => k.category))
];


// =========================================================
// KNOWLEDGE SEARCH
// =========================================================

export function findKnowledge(q) {

  const s = q.trim().toLowerCase();

  if (!s) {
    return knowledge[0];
  }

  return (
    knowledge.find(
      k => k.title.toLowerCase() === s
    ) ||

    knowledge.find(
      k => k.title.toLowerCase().includes(s)
    ) ||

    knowledge.find(
      k => k.summary.toLowerCase().includes(s)
    ) ||

    knowledge.find(
      k =>
        k.sections.related.some(
          r => r.toLowerCase().includes(s)
        )
    )
  );
}