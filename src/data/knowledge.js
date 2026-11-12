// ============================================================================
// STRUCTIQ — COMPLETE KNOWLEDGE BASE
// Version 2.0 — Sprint 1 + 2: 55 concepts across 8 domains
// Engineering accuracy: all equations are standard structural mechanics.
// Code-specific values are flagged. Simplified explanations are labelled.
// ============================================================================

export const knowledge = [

  // ==========================================================================
  // DOMAIN 1 — STRUCTURAL MECHANICS
  // Prerequisite layer. Nothing downstream works without these.
  // ==========================================================================

  {
    id: 'equilibrium',
    title: 'Equilibrium',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: [],
    unlocks: ['force','moment','shear-force','axial-force','free-body-diagram','support-conditions'],
    summary: 'The condition in which the net force and net moment acting on a body are both zero, so the body remains at rest or in constant motion.',
    sections: {
      definition: 'A structural body is in static equilibrium when all forces and moments acting on it sum to zero. Equilibrium is the foundational principle of structural analysis — every structure, every member, and every cross-section must satisfy equilibrium at all times. The three equations for two-dimensional structures: ΣFx = 0, ΣFy = 0, ΣM = 0 about any point.',
      physical: 'Equilibrium is a physical state, not just an equation. When a beam rests on two supports under its own weight, the support reactions that develop are exactly whatever magnitude is required to satisfy equilibrium — the structure finds them. The equations describe this state; they do not create it. Inside the beam, the material develops internal forces at every cross-section, and those internal forces satisfy equilibrium at every cut. Equilibrium operates simultaneously at every scale: the whole structure, each member, each cross-section, and each infinitesimal material element.',
      behaviour: 'Static equilibrium assumes no acceleration. For a building under service loads this is the correct assumption. Dynamic loading — earthquakes, machinery vibration, impact — produces acceleration, so inertia forces (mass times acceleration) enter the equilibrium equations as additional applied forces. Failure to include them converts a dynamic problem into an incorrect static one.',
      loadPath: 'A load path is a direct consequence of equilibrium. Every applied force requires an equal and opposite reaction somewhere in the system. The path between load and reaction must satisfy equilibrium at every intermediate point. A break in the load path — a missing connection, a weak element, an incorrect support — is a point where equilibrium cannot be maintained and the structure must fail or redistribute load elsewhere.',
      equation: 'Two-dimensional: ΣFx = 0, ΣFy = 0, ΣM_A = 0, where A is any chosen point. Three equations, a maximum of three unknowns solvable by statics alone. Three-dimensional: six equations — ΣFx = ΣFy = ΣFz = 0 and ΣMx = ΣMy = ΣMz = 0. The moment equation can be written about any point; choosing a point where unknowns intersect eliminates them from the equation.',
      analysis: 'Every structural analysis method enforces equilibrium. Finite element analysis assembles a global stiffness matrix and solves for displacements, then recovers forces that satisfy equilibrium at each node. The fastest sanity check on any analysis: sum the reactions and compare to the sum of applied loads. If they do not agree, there is a modelling error — missing support, duplicate load, incorrect connectivity.',
      resultInterpretation: 'Reaction summaries from analysis software allow a global equilibrium check in under a minute. If reactions do not sum to applied loads in every direction, the model is wrong regardless of what the member results show. Check this before reading a single bending moment or deflection value.',
      practice: 'In practice, verify global equilibrium before reading any other result. Check that the sum of reactions equals the sum of applied loads in x, y, and z. Check the moment sum about a support. These checks take two minutes and catch fundamental modelling errors that otherwise propagate through the entire design.',
      designThinking: 'Equilibrium is necessary but not sufficient to find the unique internal force distribution in a statically indeterminate structure. Infinitely many internal force distributions satisfy equilibrium in an indeterminate system. The additional condition that makes the solution unique is compatibility — deformations must be geometrically consistent. Understanding that equilibrium alone does not determine internal forces in an indeterminate structure is one of the most important conceptual steps in structural analysis.',
      construction: 'At every stage of construction, temporary equilibrium must be maintained. A partially erected steel frame, a slab before its props are removed, a retaining wall during backfilling — each must be in equilibrium in its temporary configuration. Falsework, temporary bracing, and construction sequence exist to maintain equilibrium during states that may be more critical than the completed structure.',
      failureReasoning: 'Structural failure is loss of equilibrium. At the material level, the element can no longer develop the internal force demanded by equilibrium and fractures or yields. At the system level, a mechanism forms — enough hinges or releases that the structure can move without resistance, and equilibrium becomes impossible under the applied load.',
      failureModes: [
        'Overturning: the restoring moment from gravity loads and reactions is less than the overturning moment from lateral loads. Global equilibrium cannot be satisfied.',
        'Sliding: the available horizontal resistance at supports is less than the applied horizontal force. Horizontal equilibrium fails.',
        'Mechanism: too many hinges or member failures remove the ability to carry load while satisfying equilibrium. The structure moves.',
        'Local failure cascade: a member or connection cannot develop the force required by equilibrium, load redistributes, and adjacent members are overloaded in sequence.'
      ],
      commonMistakes: [
        'Confusing external equilibrium (whole structure under applied loads and reactions) with internal equilibrium (cut section under applied loads and internal forces). Both must hold independently.',
        'Summing moments about a point that does not eliminate unknown reactions, leaving equations unsolvable.',
        'Omitting self-weight as an applied load in the equilibrium check.',
        'Accepting software output without checking the reaction summary against applied loads.'
      ],
      troubleshooting: [
        'Problem: reactions do not sum to applied loads. Check for duplicate loads, missing supports, loads applied to the wrong node, or incorrect units.',
        'Problem: moment sum does not close. Check for eccentric loads, incorrect moment direction convention, or a missing reaction.',
        'Problem: internal forces at a cut section do not balance the applied loads on one side. Check for missing distributed loads or incorrect connectivity between members.',
        'Problem: reactions are unexpectedly large. Check whether a support intended as a roller was accidentally modelled as a fixed end, attracting moment and changing the reaction.'
      ],
      practicalQuestion: 'Before reading any member result, have you confirmed that the sum of reactions equals the sum of applied loads in every direction?',
      practicalQuestions: [
        'Do my reaction summaries in x and y match my applied load totals exactly?',
        'Have I included self-weight of every structural element in my applied load check?',
        'For the temporary construction condition, is every stage in equilibrium?',
        'In an indeterminate structure, do I understand that equilibrium alone does not give me the unique distribution of internal forces?'
      ],
      related: ['force','moment','shear-force','axial-force','free-body-diagram','support-conditions','load-path','stress']
    }
  },

  {
    id: 'free-body-diagram',
    title: 'Free Body Diagram',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium'],
    unlocks: ['support-conditions','axial-force','shear-force','moment','determinacy','sfd-bmd'],
    summary: 'A diagram that isolates a body from its surroundings and shows every external force and moment acting on that body, enabling equilibrium to be applied.',
    sections: {
      definition: 'A free body diagram (FBD) is a schematic of a body — a whole structure, a single member, a joint, or any cut section — completely detached from its surroundings. Every force and moment exerted by the removed surroundings on the body is shown explicitly. Applying the three equilibrium equations to a correct FBD gives the reactions, member forces, or internal actions at any location.',
      physical: 'The act of drawing an FBD forces clarity about what is being analysed and what forces act on it. When a support is removed from the FBD, it must be replaced by the reaction the support was providing. When a member is cut, the cut face must show the internal forces — axial, shear, and moment — that the removed portion was exerting. These are not optional additions: omitting any force violates equilibrium.',
      behaviour: 'An FBD of the whole structure shows only external forces — applied loads and support reactions. An FBD of a cut section shows external forces on one side AND the internal forces at the cut face. The internal forces on the cut face are what the structure is actually carrying at that cross-section. Changing what you isolate changes what appears on the FBD, but the equilibrium result must be consistent.',
      loadPath: 'Drawing a sequence of FBDs — whole structure, then a member, then a joint — traces the load path explicitly. At each stage, the forces that were reactions in the larger body become applied forces in the smaller body. This chain of FBDs is how load path analysis is performed rigorously.',
      equation: 'Once the FBD is drawn correctly, the equilibrium equations ΣFx = 0, ΣFy = 0, ΣM = 0 are applied to find the unknowns. The choice of isolation determines which unknowns appear. Choosing wisely (e.g. isolating a portion where only one unknown remains) allows sequential solution without simultaneous equations.',
      analysis: 'Almost every structural analysis method traces back to FBDs. The method of sections uses an FBD of a cut truss to find member forces. Moment distribution applies FBDs to joints. The stiffness method constructs element stiffness matrices by applying unit displacements and drawing the resulting FBDs. Understanding that all these methods are systematic applications of FBD + equilibrium is the key to understanding structural analysis.',
      resultInterpretation: 'When a member result from analysis software is unexpected, draw an FBD of that member using the reported end forces. Apply equilibrium. If the FBD does not balance, the result is wrong or misread. If it does balance, the result is correct and the unexpected value has a physical explanation to be found.',
      practice: 'Draw FBDs by hand before and after any analysis. Before: to set up the problem and identify unknowns. After: to verify key results and check load paths. Engineers who skip this step routinely accept incorrect results because the numbers looked plausible.',
      designThinking: 'The power of an FBD is that it forces every assumption to be stated. What is the support condition? What forces does the structure carry at this section? Where is the load being transferred? These questions cannot be avoided when drawing an FBD. This is why teaching an engineer to draw FBDs correctly is equivalent to teaching them to think clearly about structural behaviour.',
      construction: 'During construction, the body being analysed changes. An FBD of the frame at 60% erection will look different from the completed structure. Drawing FBDs for the critical construction stages identifies forces that do not appear in the final state analysis — temporary prop loads, unbalanced cantilever moments during erection, pre-stress in formwork.',
      failureReasoning: 'Errors in structural analysis almost always trace to incorrect FBDs: forces omitted, directions wrong, wrong body isolated, or reactions placed where none exist. An FBD that violates equilibrium will not be caught by analysis software — the computer applies the equations you give it. The discipline of drawing a correct FBD before calculating is the primary defence against modelling errors.',
      failureModes: [
        'Omitted forces: a reaction or internal force is not shown on the FBD, so equilibrium is applied to an incomplete set of forces, giving wrong results.',
        'Wrong direction: a reaction or internal force shown in the wrong direction gives the correct magnitude but wrong sign, leading to an unconservative design.',
        'Wrong body: analysing a different body than intended, so the result does not correspond to the member or section being designed.',
        'Missing cuts: not cutting through a member where a specific internal force is required, making it impossible to solve for that force directly.'
      ],
      commonMistakes: [
        'Showing forces the body exerts on its surroundings rather than forces the surroundings exert on the body. Newton\'s third law pairs must not both appear on the same FBD.',
        'Not replacing a removed support with the reaction it was providing.',
        'Not showing the three components (axial, shear, moment) on a cut face.',
        'Drawing the body but not actually detaching it from surrounding structure in the analysis.'
      ],
      troubleshooting: [
        'Problem: equilibrium does not close on the FBD. Check that every force from the removed surroundings has been included and is acting in the correct direction.',
        'Problem: too many unknowns for three equations. Make a different cut, choose a different isolation, or check whether the structure is statically indeterminate.',
        'Problem: FBD gives reactions that do not match software output. Either the FBD or the model has an error — compare them systematically.',
        'Problem: internal moment at a cut does not match the moment diagram. Confirm sign convention and the direction of the moment on the cut face.'
      ],
      practicalQuestion: 'For the member or section you are designing, have you drawn a complete FBD showing every force acting on that body, including all three components at any cut face?',
      practicalQuestions: [
        'Have I shown every force that the surroundings exert on this body — and only those forces?',
        'At every cut face, have I shown axial force, shear force, and bending moment?',
        'Does my FBD satisfy equilibrium when I apply the three equations?',
        'Does the internal force distribution shown on my FBD match the moment and shear diagrams from analysis?'
      ],
      related: ['equilibrium','support-conditions','axial-force','shear-force','moment','determinacy','sfd-bmd','truss']
    }
  },

  {
    id: 'support-conditions',
    title: 'Support Conditions',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','free-body-diagram'],
    unlocks: ['determinacy','sfd-bmd','deflection','continuous-beam','frame'],
    summary: 'The constraints provided at the boundary of a structural member or system, defining which movements are prevented and which reactions develop.',
    sections: {
      definition: 'A support condition defines the physical constraints at the end or boundary of a structural element. It determines which degrees of freedom are restrained (preventing movement) and which are free (allowing movement). Each restrained degree of freedom produces a reaction force or moment. The three idealised support types in two-dimensional analysis are the pin, the roller, and the fixed (encastré) support.',
      physical: 'A pin support prevents translation in both horizontal and vertical directions but allows rotation. It provides two reactions: Fx and Fy. In practice, a steel pin through a gusset plate, a concrete dowel without a moment connection, or an elastomeric bearing approximates a pin. A roller prevents translation in one direction (perpendicular to the rolling surface) but allows rotation and sliding parallel to the surface. It provides one reaction. A fixed support prevents translation in all directions and prevents rotation — three reactions: Fx, Fy, and M. A fixed end in practice requires a stiff, substantial connection: a column base plate with anchor bolts, or a beam cast integrally into a concrete wall.',
      behaviour: 'The actual behaviour of a connection falls on a spectrum from perfectly pinned to perfectly fixed. Most real connections lie somewhere in between. Assuming a pin where the actual connection has significant rotational stiffness underestimates restraint and overestimates span moments. Assuming a fixed end where the connection is actually flexible overestimates restraint, underestimates span moments but may miss critical sagging, and underestimates foundation rotation. Neither error is automatically conservative.',
      loadPath: 'Support conditions define where the load path terminates. Every load path must end at a support where equilibrium of the whole structure is maintained. The number of reactions must be at least three (for 2D stability) and the reactions must be arranged so the structure cannot move as a rigid body. A structure with fewer than three independent reactions is a mechanism and collapses.',
      equation: 'Pin: Rx ≠ 0, Ry ≠ 0, M = 0. Roller: one reaction perpendicular to surface, parallel translation free. Fixed: Rx ≠ 0, Ry ≠ 0, M ≠ 0. Number of unknown reactions for a 2D structure: pins contribute 2 each, rollers contribute 1 each, fixed supports contribute 3 each. Degree of indeterminacy i = total unknowns − 3 (for 2D, single body).',
      analysis: 'In analysis software, support conditions are defined by restraining specific degrees of freedom at nodes. A pinned node has rotational DOF free, translational DOFs fixed. A roller has one translation free. A fixed node has all DOFs restrained. Incorrect support modelling is one of the most common sources of error in structural analysis — a fixed end that should be pinned increases the stiffness of the model and alters the distribution of internal forces throughout the structure.',
      resultInterpretation: 'At a fixed support, a non-zero reaction moment is expected. If the analysis reports zero moment at a support that was intended as fixed, the DOF is probably not restrained. At a pin, the moment reaction should be zero — if it is not, the rotation is inadvertently restrained. These quick checks on support reactions confirm that the model is doing what was intended.',
      practice: 'Always confirm that the modelled support condition matches the intended physical connection before trusting results. A common practical error is to model column bases as fixed when the foundation is a small isolated pad on soft soil — the base rotates significantly and the column should be treated as pinned or semi-rigid. Conversely, modelling a deep pile cap as pinned when it provides significant moment capacity leads to unconservative column design.',
      designThinking: 'Changing a support condition changes the entire behaviour of the structure, not just the local reaction. Fixing an end that was pinned increases span stiffness, reduces span moments, and introduces moment demand at the support — the whole moment diagram changes. This means that choice of support condition is a design decision, not a modelling technicality. Choosing between a moment connection and a simple shear connection at a beam end affects the beam design, the column design, and the foundation design simultaneously.',
      construction: 'The as-built support condition may differ from the design intent. A base plate designed as pinned provides some moment resistance if the anchor bolts are offset from the column centreline and are highly pretensioned. A beam bearing on a masonry wall may develop some rotational restraint from friction. These deviations are typically small, but in sensitive indeterminate structures they can shift the critical design location.',
      failureReasoning: 'A support that fails removes a reaction and changes the support condition from the design assumption — often converting a determinate structure to a mechanism. A pin that seizes under corrosion and becomes partially fixed attracts moment it was not designed to carry. A roller that is prevented from sliding by debris or corrosion attracts horizontal thrust it was not intended to resist. Support failures often precede member failures.',
      failureModes: [
        'Loss of vertical support: bearing failure, support settlement, or connection fracture removes the vertical reaction, converting the span to an unsupported cantilever.',
        'Loss of horizontal restraint: a fixed-base column that loses anchor bolt capacity becomes a pin-based column with dramatically increased effective length and reduced buckling resistance.',
        'Inadvertent fixity: a nominally pinned support that develops restraint attracts moment in a member designed for zero end moment, causing premature failure.',
        'Foundation rotation: a fixed support assumption with a flexible foundation underestimates sway and amplifies P-Delta effects.'
      ],
      commonMistakes: [
        'Modelling column bases as fixed when the actual foundation has limited moment capacity.',
        'Modelling a beam end as pinned when it frames into a stiff concrete core that provides significant rotational restraint.',
        'Forgetting that a roller must be free to translate — if a roller is blocked by adjacent structure, it becomes a pin.',
        'Using support conditions from a published textbook example without checking whether they match the actual construction detail.'
      ],
      troubleshooting: [
        'Problem: large unexpected moment at a support assumed to be pinned. The rotation DOF is probably restrained in the model. Check the node fixity settings.',
        'Problem: zero moment at a support assumed to be fixed. The moment DOF is probably free. Check the node and confirm all three DOFs are restrained.',
        'Problem: horizontal reaction at a roller. Check that the sliding direction is correctly defined. A roller on a horizontal surface has a vertical reaction only.',
        'Problem: a beam deflects far more than expected. Check whether the supports are actually restraining the vertical DOF — an unrestrained node becomes a free end.'
      ],
      practicalQuestion: 'Does the support condition in your model match what is actually built — and what happens to the structure if that support behaves differently from the assumption?',
      practicalQuestions: [
        'Is the column base actually fixed, or is the foundation too small or flexible to develop a moment reaction?',
        'If I model this as a pin but the connection develops some moment, is the member designed safely for both cases?',
        'Are my rollers actually free to slide, or will thermal expansion be prevented by friction and create unexpected horizontal thrust?',
        'What happens to the structure if a support settles — does the structure redistribute, or does it become a mechanism?'
      ],
      related: ['equilibrium','free-body-diagram','determinacy','moment','deflection','continuous-beam','foundation']
    }
  },

  {
    id: 'force',
    title: 'Force',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium'],
    unlocks: ['axial-force','shear-force','moment','stress'],
    summary: 'An interaction that can change the motion, shape, or internal state of a structural system.',
    sections: {
      definition: 'A force is a push or pull acting on a body. In structural engineering, forces describe actions transferred through structural members and supports.',
      physical: 'Forces create acceleration, deformation, or internal resistance. A structure is safe when it can transfer the relevant actions to the ground without unacceptable strength, stability, or serviceability problems.',
      behaviour: 'A force produces a response depending on its magnitude, direction, point of application, structural stiffness, supports, and connectivity.',
      loadPath: 'Forces must have a continuous path through structural elements and ultimately into the supporting ground.',
      equation: 'For a static system: ΣF = 0. Forces are resolved into components such as Fx, Fy and Fz.',
      analysis: 'Analysis software may report forces as reactions, axial forces, shear forces, bending moments, torsion, or other result quantities depending on the structural model.',
      resultInterpretation: 'Always check the direction, magnitude, location, sign convention, units, and load combination before deciding whether a force result is reasonable.',
      practice: 'Always establish the direction, point of application, units, and load path before using a force in a calculation.',
      designThinking: 'Ask what is producing the force, where it is going, and what structural element is responsible for transferring it.',
      construction: 'Actual force transfer depends on real connections, supports, contact conditions, construction sequence, and material continuity.',
      failureReasoning: 'Unexpected force results may indicate incorrect loading, support conditions, releases, connectivity, stiffness assumptions, or an unusual but physically real load path.',
      failureModes: ['Overloading','Connection failure','Unexpected load path','Support failure','Local crushing'],
      commonMistakes: ['Using incorrect units','Ignoring force direction','Ignoring load path','Applying loads to the wrong structural element'],
      troubleshooting: ['Check magnitude and units','Check direction','Check load location','Check supports','Trace the load path','Compare with a simple hand calculation'],
      practicalQuestion: 'Where is this force coming from, where is it going, and does the structural system provide a realistic path for it?',
      practicalQuestions: ['Is the direction of this force correctly defined?','Is the point of application correct?','Does the load path close — is there a support reaction to balance this force?'],
      related: ['equilibrium','moment','stress','load-path','axial-force','shear-force']
    }
  },

  {
    id: 'axial-force',
    title: 'Axial Force',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','free-body-diagram','stress'],
    unlocks: ['stress','strain','buckling','slenderness','truss','column','section-properties'],
    summary: 'An internal force acting along the longitudinal axis of a member, either stretching it (tension) or compressing it (compression).',
    sections: {
      definition: 'Axial force P is the resultant of all normal stresses acting over a cross-section, directed along the member axis. Positive axial force is tension (member pulls apart); negative axial force is compression (member pushes together). In trusses, axial force is the primary internal action. In beams under transverse loading, axial force is typically zero unless the geometry or boundary conditions introduce horizontal thrust.',
      physical: 'A tension member wants to elongate. The material develops tensile stress to resist this tendency. A compression member wants to shorten. The material develops compressive stress. If the member is short and stocky, it resists compression by material strength. If it is long and slender, it resists compression through stability — the onset of buckling at a load well below the material crushing capacity.',
      behaviour: 'Axial stress distribution across a cross-section is uniform for a concentrically loaded member: σ = P/A. This is a key difference from bending stress, which varies linearly from maximum tension to maximum compression. Combined axial and bending produces a stress distribution that is the superposition of the uniform axial distribution and the linear bending distribution.',
      loadPath: 'Axial force transfers from the point of application along the member to its ends, where it is delivered as concentrated forces to the connections and supports. In a truss, every member carries only axial force — the load path is a network of tension and compression members connecting loads to supports. In a building frame, gravity load accumulates as axial compression in columns down through every storey to the foundation.',
      equation: 'Axial stress: σ = P/A (uniform distribution for concentric loading). Axial deformation: δ = PL/(AE) where L is member length, A is cross-sectional area, and E is Young\'s modulus. For a member under self-weight: P varies along the length and requires integration.',
      analysis: 'Analysis software reports axial force as a diagram along each member. Check the sign convention (tension positive or compression positive varies by software). In trusses, all members should show constant axial force (no variation along the member if loaded only at nodes). In frames, columns show approximately constant axial force within a storey with jumps at each floor level where beam reactions enter.',
      resultInterpretation: 'Large tension in a concrete member is a warning: concrete has minimal tensile capacity and cracks at low stress. Reinforcement must carry the tension. Large compression in a slender steel member requires a buckling check even if the material capacity looks adequate. Axial force results should always be checked against the load takedown (sum of gravity loads from floors above) as a sanity check.',
      practice: 'In multi-storey frames, sum axial forces in a column from the top down. The axial force at the base should equal the sum of all gravity loads from all floors above that column. A significant discrepancy indicates missing tributary area, an incorrect slab loading, or a transfer in the model that was not intended.',
      designThinking: 'In a tension member, the goal is area — provide enough area that stress stays below the yield strength, and enough length that elongation remains acceptable. In a compression member, the goal is both area and stiffness — buckling governs when slenderness is high, and adding area without controlling slenderness does not solve the problem.',
      construction: 'Axial force in columns accumulates over time as the building is constructed floor by floor. The axial shortening under increasing load, combined with creep and shrinkage in concrete columns, causes differential settlement between concrete cores and steel perimeter frames in composite buildings. This differential movement must be accounted for in connection details.',
      failureReasoning: 'Tension failure is typically a fracture of the net section — the minimum cross-sectional area accounting for bolt holes or other reductions. Compression failure depends on slenderness: stocky members crush (material failure), slender members buckle (stability failure). The transition between these governs at intermediate slenderness and is addressed by column curve equations in design codes.',
      failureModes: [
        'Tension yielding: axial stress exceeds yield strength of the material; gross section yielding is typically ductile.',
        'Tension fracture: fracture of the net section (at bolt holes or welds) at lower load than gross section yielding; can be sudden.',
        'Compression crushing: axial stress exceeds compressive strength; typical in short concrete columns or stocky steel sections.',
        'Flexural buckling: sudden lateral displacement of a compression member; governed by slenderness kL/r; occurs below crushing strength in slender members.',
        'Block shear and connection failure: the path into and out of the member cannot develop the axial force the member carries.'
      ],
      commonMistakes: [
        'Assuming axial force is zero in beams that are part of a braced or laterally loaded frame — thrust is introduced at the connections.',
        'Designing a compression member based on material stress alone without checking buckling.',
        'Ignoring axial shortening of columns and its effect on differential movement in mixed structural systems.',
        'Using gross area instead of net area for tension member capacity calculations.'
      ],
      troubleshooting: [
        'Problem: axial force in a column much larger than expected. Check tributary area — has the slab been correctly linked? Is load from multiple floors being accumulated?',
        'Problem: tension in a concrete column. Check for uplift under wind or seismic load combinations. Concrete columns normally remain in compression under gravity; tension under lateral load combinations is possible and requires reinforcement.',
        'Problem: unexpected axial force in a beam. Check whether the beam is part of a braced frame (horizontal reactions at the beam-column joints) or whether thermal restraint is introducing thrust.',
        'Problem: zero axial force in a truss member. Check connectivity — the node may not be attached to the truss chord correctly.'
      ],
      practicalQuestion: 'Is this member carrying tension, compression, or both under different load combinations — and is the design addressing all cases, including buckling for compression?',
      practicalQuestions: [
        'Does the axial force in this column at the base equal the sum of all gravity loads from floors above?',
        'For this compression member, what is the slenderness ratio and which governs — material strength or buckling?',
        'Is this tension member designed for the net area at holes or the gross area?',
        'Is axial shortening of columns compatible with the deformation tolerance of the facade and finishes?'
      ],
      related: ['stress','strain','buckling','slenderness','section-properties','truss','column','elasticity','material-properties']
    }
  },

  {
    id: 'moment',
    title: 'Bending Moment',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','force'],
    unlocks: ['curvature','deflection','shear-stress','flexural-strength','sfd-bmd','continuous-beam'],
    summary: 'A measure of the turning effect produced by a force about a point or section, creating internal tension and compression across a cross-section.',
    sections: {
      definition: 'Bending moment describes the internal rotational effect that develops in a structural member when loads act with a lever arm.',
      physical: 'Imagine pushing down on a ruler supported at its ends. The ruler curves because internal actions develop to maintain equilibrium. On the tension face the material stretches; on the compression face it shortens. The bending moment at a section is the resultant of all these tensile and compressive stresses acting across the section, expressed as a moment.',
      behaviour: 'Bending moment varies along a structural member according to the applied loads, support conditions, geometry, and continuity.',
      loadPath: 'Loads enter the member and create internal bending actions that are ultimately transferred toward the supports.',
      equation: 'For a simple force: M = F × d, where d is the perpendicular distance to the point or section. Relationship to shear: dM/dx = V (the slope of the moment diagram equals the shear force at that section).',
      analysis: 'Analysis software commonly provides bending moment diagrams and section forces. These results must be interpreted according to the selected local or global axis system.',
      resultInterpretation: 'Do not treat moment as just a number. Check its sign convention, location, distribution, governing combination, local/global axis, and whether the magnitude is physically plausible.',
      practice: 'Check support conditions, continuity, span, loading, stiffness, and load path before reacting to a large moment result.',
      designThinking: 'A high moment should trigger investigation of the load and structural behaviour before simply increasing member size or reinforcement.',
      construction: 'Reinforcement placement, anchorage, continuity, joints, construction sequence, and actual support conditions influence how bending is resisted.',
      failureReasoning: 'A bending problem may arise from excessive demand, inadequate section capacity, insufficient reinforcement, poor detailing, instability, or incorrect modelling.',
      failureModes: ['Flexural failure','Excessive deformation','Cracking','Reinforcement yielding','Connection failure'],
      commonMistakes: ['Misreading moment sign','Ignoring local axes','Ignoring support conditions','Designing from a single result without understanding its distribution'],
      troubleshooting: ['Check load magnitude','Check span and supports','Check moment diagram shape','Check load combinations','Compare with hand calculations'],
      practicalQuestion: 'Why is the moment this large at this particular location, and does the moment diagram shape make physical sense given the loads and supports?',
      practicalQuestions: ['Does the moment diagram shape match the loading pattern and support conditions I expect?','Is the moment sign consistent with which face is in tension?','Does maximum moment occur where I expect it — midspan for simply supported, over supports for continuous?'],
      related: ['force','shear-force','curvature','deflection','flexural-strength','sfd-bmd','stress']
    }
  },

  {
    id: 'shear-force',
    title: 'Shear Force',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','force'],
    unlocks: ['shear-stress','stirrups','sfd-bmd'],
    summary: 'An internal action associated with transverse loading and the tendency of adjacent cross-sections to slide relative to one another.',
    sections: {
      definition: 'Shear force is the internal force acting parallel to a cross-section that develops to maintain equilibrium.',
      physical: 'In a loaded beam, adjacent portions tend to move relative to one another. The material develops internal resistance to this tendency.',
      behaviour: 'Shear force commonly changes along a member according to distributed loads, concentrated loads, reactions, and member geometry.',
      loadPath: 'Transverse loads are transferred through the member toward supports, with shear being one of the principal internal mechanisms of transfer.',
      equation: 'For a beam, dM/dx = V under the usual sign conventions, where V is shear force and M is bending moment. Equivalently, dV/dx = −w where w is the distributed load intensity.',
      analysis: 'Shear diagrams and section forces identify locations where transverse demand is high.',
      resultInterpretation: 'Shear demand often becomes critical near supports and concentrated loads. Check the location, sign, magnitude, governing combination, and physical load path.',
      practice: 'In reinforced concrete, shear failures can be brittle, so checking and detailing require particular attention.',
      designThinking: 'Do not assume that satisfactory flexural behaviour means shear is also satisfactory.',
      construction: 'Shear resistance can be strongly affected by reinforcement anchorage, stirrup placement, spacing, development, concrete quality, and construction tolerances.',
      failureReasoning: 'High shear demand or inadequate shear resistance can produce diagonal cracking and potentially brittle failure.',
      failureModes: ['Diagonal tension failure','Shear compression failure','Punching-type shear','Web failure'],
      commonMistakes: ['Ignoring shear because flexure is satisfactory','Incorrect support modelling','Insufficient shear reinforcement','Ignoring concentrated loads near supports'],
      troubleshooting: ['Check support reactions','Check load locations','Check shear diagram','Check governing combination','Check shear resistance and detailing'],
      practicalQuestion: 'Where does the highest shear occur, and what physical load or support condition is causing it?',
      practicalQuestions: ['Does the shear diagram jump by the correct amount at each concentrated load?','Is shear highest at the supports and does it reduce toward midspan under UDL?'],
      related: ['moment','shear-stress','stirrups','beam','sfd-bmd']
    }
  },

  {
    id: 'torsion',
    title: 'Torsion',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['equilibrium','shear-force','stress'],
    unlocks: ['shear-stress','diaphragm','lateral-system'],
    summary: 'A twisting moment about the longitudinal axis of a member, producing shear stress throughout the cross-section and rotation of the member.',
    sections: {
      definition: 'Torsion is the internal moment about the longitudinal axis of a structural member. It arises when transverse loads are applied eccentric to the shear centre of the cross-section, or when end conditions prevent free warping. Torsion produces shear stresses throughout the cross-section and causes the member to twist along its length.',
      physical: 'Grip a length of rectangular steel bar at both ends and twist it: the bar resists by developing shear stresses across its section. In a circular section the distribution is simple — maximum at the outer surface, zero at the axis. In open thin-walled sections (I-beams, channels) the distribution is more complex and the section warps (cross-sections do not remain plane under torsion). In closed hollow sections (RHS, CHS) torsional resistance is far greater than in comparable open sections.',
      behaviour: 'Two types of torsion occur in structural members. St Venant (pure or uniform) torsion: the member is free to warp and resists twist purely through shear flow in the walls. Warping torsion: warping is restrained (usually at fixed ends) and additional normal stresses develop in the flanges. For most practical structural members, a combination of both occurs. Open sections (I-sections) rely heavily on warping torsion and have very low St Venant torsional stiffness. Closed sections have excellent St Venant torsional stiffness.',
      loadPath: 'Torsion must transfer to a support or connection capable of providing the resisting torque. If no such support exists, the member will twist without limit. In building frames, spandrel beams loaded by eccentric cladding or fascia loads carry torsion along their length to beam-column connections. Floor diaphragms distribute eccentric lateral loads and can impose torsion on the lateral system.',
      equation: 'For a circular section: shear stress τ = Tr/J, where T is the applied torque, r is the distance from the axis, and J is the polar moment of area (J = πd⁴/32 for solid circle). For closed thin-walled sections (Bredt formula): τ = T/(2A_o × t), where A_o is the area enclosed by the median line of the wall, and t is the wall thickness. For open sections, torsional stiffness is approximately GJ where J ≈ Σ(bt³/3) for each rectangle in the section.',
      analysis: 'Analysis software reports torsion as T (or Mx about the member axis in local coordinates). Check that the torsion result makes physical sense given the loading eccentricity. In three-dimensional models, torsion frequently appears in members due to out-of-plane loading that the model captures but the engineer may not have anticipated.',
      resultInterpretation: 'A large torsion result in a member typically signals either eccentric loading (intentional or inadvertent) or a connectivity issue in the model. Before increasing the section, confirm the torsion is real. Also confirm whether it is equilibrium torsion (must be carried) or compatibility torsion (can be redistributed by cracking in concrete). In concrete, compatibility torsion may be reduced by redistributing moment; equilibrium torsion cannot.',
      practice: 'I-sections and other open sections are poor in torsion. If significant torsion is unavoidable, hollow sections (RHS or CHS) are far more efficient. For spandrel beams with eccentric cladding, consider whether the detail can be changed to reduce the eccentricity, or whether a box section is warranted. In concrete beams, compatibility torsion may justify reduced torsion design if redistribution is confirmed.',
      designThinking: 'The distinction between equilibrium torsion and compatibility torsion is critical in concrete. Equilibrium torsion: the member must carry the torque or the structure fails. Compatibility torsion: the torque develops because of the stiffness of the connection, but the structure could redistribute it by cracking. This distinction determines whether torsion governs the design or can be managed by detailing.',
      construction: 'Torsion in concrete members requires closed stirrups — open links are ineffective at carrying torsional shear flow around the perimeter. Detailing of stirrups for combined shear and torsion is more complex than for shear alone, and the interaction between the two must be checked. Longitudinal reinforcement is also required to resist the longitudinal stresses from warping torsion.',
      failureReasoning: 'Torsional failure in concrete can be sudden if stirrups are inadequate — diagonal cracking spirals around the member and the section splits. In steel, open sections may fail by lateral-torsional buckling before pure torsional failure. Torsional failure is often brittle and provides little warning.',
      failureModes: [
        'St Venant torsional failure: shear stress from pure torsion exceeds material shear strength; more common in compact closed sections.',
        'Warping torsion failure: normal stresses in flanges from restrained warping cause local yielding or fracture; open sections under restrained warping.',
        'Diagonal tension spiral: in concrete, combined shear and torsion cause diagonal cracking that spirals around the member axis.',
        'Lateral-torsional buckling: combination of bending and torsion causes the compression flange to buckle laterally; governed by unbraced length and section geometry.'
      ],
      commonMistakes: [
        'Ignoring torsion in spandrel beams loaded by eccentric cladding or facade elements.',
        'Using open stirrups where closed links are required to resist torsional shear flow.',
        'Not checking the interaction between shear and torsion — each reduces the capacity available for the other.',
        'Assuming torsion in concrete can always be ignored as compatibility torsion without confirming that redistribution is possible.'
      ],
      troubleshooting: [
        'Problem: unexpectedly large torsion in a beam. Check the loading — is there an eccentric load, or does a perpendicular beam frame in above or below the centroid?',
        'Problem: zero torsion in a member that visually should carry twist. Check releases — the member may have a torsional release (free to twist) at its ends.',
        'Problem: torsion and shear design both require more reinforcement than fits in the section. Consider a hollow section, reduce the eccentricity, or increase the section size.',
        'Problem: compatibility torsion seems to govern. Confirm this by checking whether the structure remains stable if the member is given a torsional release. If it does, compatibility torsion is confirmed and redistribution may be allowed per the design code.'
      ],
      practicalQuestion: 'Is the torsion in this member equilibrium torsion that must be fully designed for, or compatibility torsion that the structure can redistribute through cracking?',
      practicalQuestions: [
        'What is causing this torsion — loading eccentricity, a framing condition, or restraint?',
        'Is this an open section (poor torsional resistance) or a closed section (good torsional resistance)?',
        'Have I checked the interaction between shear and torsion on the combined reinforcement requirement?',
        'Are my stirrups closed loops (required for torsion) or open links (insufficient for torsion)?'
      ],
      related: ['shear-stress','shear-force','stress','diaphragm','lateral-system','connection']
    }
  },

  {
    id: 'stress',
    title: 'Stress',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['force','equilibrium'],
    unlocks: ['shear-stress','strain','elasticity','material-properties','section-properties'],
    summary: 'Internal force intensity distributed over an area, quantifying how hard a material is working at a specific location.',
    sections: {
      definition: 'Stress describes how internal force is distributed through a material area.',
      physical: 'Two members can carry the same force but experience different stresses if their effective areas differ.',
      behaviour: 'Stress distribution depends on geometry, loading, material properties, boundary conditions, and whether the action is axial, bending, shear, or torsional.',
      loadPath: 'Stress develops inside members as the structure transfers external actions through its material.',
      equation: 'Average normal stress: σ = P/A. Bending stress: σ = My/I where y is distance from neutral axis and I is second moment of area. These are elastic distributions; the actual distribution depends on material behaviour.',
      analysis: 'Analysis may provide axial stress, bending stress, shear stress, principal stresses, or other stress measures depending on the method.',
      resultInterpretation: 'Stress is not automatically equal to capacity. Interpret it alongside material properties, limit states, geometry, instability, and code requirements.',
      practice: 'Capacity depends on material behaviour, geometry, instability, detailing, loading history, and the applicable design model — not on stress alone.',
      designThinking: 'Always identify the failure mechanism associated with the stress rather than comparing a number blindly against a limit.',
      construction: 'Material quality, defects, tolerances, reinforcement placement, welds, bolts, and construction damage can influence actual stress resistance.',
      failureReasoning: 'Failure occurs when the relevant demand exceeds the available resistance or when instability or another governing limit state occurs.',
      failureModes: ['Yielding','Crushing','Fracture','Buckling','Shear failure'],
      commonMistakes: ['Confusing stress with force','Ignoring stress concentration','Comparing stress with the wrong resistance value'],
      troubleshooting: ['Check force','Check effective area','Check material','Check stress distribution','Check relevant limit state'],
      practicalQuestion: 'What type of stress is present, where is it concentrated, and what failure mechanism would it cause?',
      practicalQuestions: ['Is this normal stress, shear stress, or a combination?','Where is the maximum stress, and is that where the section is weakest?'],
      related: ['strain','shear-stress','strength','axial-force','moment','material-properties','section-properties','elasticity']
    }
  },

  {
    id: 'shear-stress',
    title: 'Shear Stress in Beams',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['shear-force','stress','section-properties'],
    unlocks: ['stirrups','torsion'],
    summary: 'The distribution of internal shear stress across a beam cross-section, which varies with position and reaches its maximum at the neutral axis rather than the extreme fibres.',
    sections: {
      definition: 'Shear stress in a beam is the tangential stress at any horizontal plane through the cross-section, developed to resist the tendency of adjacent fibres to slide relative to each other under transverse loading. Its distribution across the section is not uniform: it varies with the geometry of the cross-section above (or below) the plane of interest.',
      physical: 'This is the most counterintuitive stress in beam theory. Students expect maximum stress at the edges — this is true for bending stress, but not for shear stress. For shear stress, the maximum is at the neutral axis and it is zero at the top and bottom surfaces. The physical reason: at the top and bottom surfaces, there is no material beyond the surface to be sheared away, so shear stress must be zero there. At the neutral axis, the area above is largest and the moment arm is greatest, producing maximum shear flow.',
      behaviour: 'For a rectangular cross-section, the shear stress distribution is parabolic: τ = (V/2I) × (h²/4 − y²), where h is the section depth and y is the distance from the neutral axis. Maximum τ = (3V)/(2A) at y = 0 (neutral axis). For an I-section, most shear is carried by the web (which is close to the neutral axis) and very little by the flanges. This is why I-beams are efficient for bending (flanges carry bending stress) and the web carries shear.',
      loadPath: 'Shear stress and bending stress together carry the applied transverse load to the supports. At every cross-section, the shear stress distribution is in equilibrium with the change in bending stress from one section to the adjacent one. The quantity VQ/I is the shear flow (force per unit length) at any level in the section.',
      equation: 'Horizontal shear stress: τ = VQ/(Ib). V = shear force at the section. Q = first moment of area of the cross-section above (or below) the plane of interest about the neutral axis. I = second moment of area of the whole cross-section. b = width of the section at the plane of interest. For a rectangular section: τ_max = (3V)/(2bh) at the neutral axis.',
      analysis: 'Shear stress is usually not directly reported by analysis software unless a detailed stress analysis is performed. Instead, the designer calculates shear stress from the reported shear force V, the section properties Q, I, b, and the formula above. In reinforced concrete, the concrete shear capacity is estimated empirically from the shear stress at the critical section.',
      resultInterpretation: 'When shear force in a beam is high, the maximum shear stress at the neutral axis may approach the material shear strength. In steel, check τ against 0.6fy (approximate yield in shear). In concrete, compare the shear demand against the concrete shear capacity and provide stirrups for the excess. In timber, shear parallel to the grain often governs because the shear capacity parallel to grain is much lower than perpendicular.',
      practice: 'For steel I-beams, the web usually carries approximately 90–95% of the total shear, so a quick check compares V against the web area times the shear yield stress. For concrete beams, shear failure is more brittle than flexural failure, so shear design should be done before considering the beam to be satisfactory.',
      designThinking: 'The shear stress formula shows that reducing the section width b at the neutral axis (as in an I-section) actually increases the shear stress at that level. This is intentional: the web is made of higher-strength material in steel sections, and it is a reminder that section geometry is optimised for the combined stress state, not any one stress component in isolation.',
      construction: 'In reinforced concrete, shear capacity depends critically on the concrete quality, the compression zone depth, and the presence and effectiveness of stirrups. Poor concrete compaction in the web, misplaced stirrups, or inadequate cover can all reduce shear resistance below the design value.',
      failureReasoning: 'Shear failure in beams is typically more brittle than flexural failure because there is less ductility in the shear mechanism. In concrete beams without adequate stirrups, a diagonal tension crack (inclined at approximately 45° to the beam axis) can propagate suddenly across the depth of the section. In steel, the web may yield in shear or buckle under high shear demand if it is slender.',
      failureModes: [
        'Diagonal tension failure in concrete: inclined cracking at approximately 45° to the beam axis, propagating from the neutral axis to the compression zone; can be sudden.',
        'Web shear yielding in steel: the web yields in shear before flanges reach their bending capacity; ductile if properly detailed.',
        'Web buckling in slender steel webs: the web buckles under shear before yielding if it is thin relative to its depth.',
        'Shear parallel to grain in timber: splitting along the grain at the neutral axis; brittle failure.'
      ],
      commonMistakes: [
        'Confusing maximum shear stress (at the neutral axis) with maximum bending stress (at the extreme fibres).',
        'Using the section area instead of the correct Q and b in the formula.',
        'Neglecting the shear stress check because the bending design looks adequate — shear often governs near supports.',
        'For I-beams, applying the formula assuming a rectangular section and getting a significantly unconservative result at the flange-web junction.'
      ],
      troubleshooting: [
        'Problem: shear stress at the neutral axis seems much higher than expected. Check whether b in the formula is the correct width at that level, not the full flange width.',
        'Problem: calculated shear stress exceeds material capacity but the member looks large enough. Check whether the shear is concentrated by a support reaction near a large concentrated load.',
        'Problem: Q calculation gives unexpected result. Break the area above the cut into simple rectangles and confirm the first moment calculation for each.',
        'Problem: shear in a concrete beam fails the code check. Increase the web width or depth to reduce the unit shear stress before adding stirrups.'
      ],
      practicalQuestion: 'Where in the cross-section does the maximum shear stress occur, and is it at the same location as the maximum bending stress?',
      practicalQuestions: [
        'Is the maximum shear stress at the neutral axis, and have I calculated it using Q/Ib rather than V/A?',
        'For this I-section, am I using the web area to estimate shear capacity, not the total section area?',
        'Is shear critical near the supports, and have I checked it there rather than at midspan?',
        'In this concrete beam, have I provided adequate stirrups where shear demand exceeds the concrete capacity?'
      ],
      related: ['shear-force','stress','section-properties','stirrups','torsion','beam']
    }
  },

  {
    id: 'strain',
    title: 'Strain',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['stress'],
    unlocks: ['elasticity','plasticity','curvature','deflection'],
    summary: 'A measure of deformation relative to an original dimension, quantifying how much a material has changed shape at a specific location.',
    sections: {
      definition: 'Strain quantifies deformation. Normal strain ε is the change in length divided by the original length: ε = ΔL/L₀. Shear strain γ is the change in angle of a right angle initially oriented along the reference axes: γ = Δu/Δy.',
      physical: 'A material can deform without necessarily failing. Understanding strain helps connect loads to stiffness, cracking, yielding, and serviceability. A steel bar under tension stretches; the average strain is the elongation divided by the original length. At yield, steel strain is approximately 0.2% (εy = fy/E ≈ 250/200000 ≈ 0.00125 for Grade 250 steel). Concrete reaches its compressive strain capacity at approximately 0.003 to 0.0035, after which the material crushes.',
      behaviour: 'Strain develops in response to stress and material behaviour. In the elastic range, strain is proportional to stress and fully recoverable on unloading. Beyond yield, permanent (plastic) strain develops. Creep is time-dependent strain under sustained stress. Shrinkage is strain not associated with stress. Thermal strain is proportional to temperature change and coefficient of thermal expansion.',
      loadPath: 'Strain develops within members as external actions are transferred through the structure. Strain compatibility — the requirement that adjacent material elements deform consistently — is the condition that makes the solution of indeterminate structures unique.',
      equation: 'Normal strain: ε = ΔL/L₀ = σ/E (elastic range). Shear strain: γ = τ/G (elastic range). Thermal strain: ε_T = α × ΔT where α is the coefficient of thermal expansion. Creep strain in concrete: ε_creep = φ × ε_elastic, where φ is the creep coefficient (typically 1.5 to 3.0 for normal concrete).',
      analysis: 'Analysis software reports displacement (total movement) rather than strain directly. Strain can be derived from the change in length of elements divided by their undeformed length. FEA software reports element strains directly when stress or strain outputs are requested.',
      resultInterpretation: 'Large deformation or strain does not automatically mean collapse, but can indicate serviceability problems or approach to a limit state. A reinforced concrete beam can develop significant tensile strain in the reinforcement (approaching yield strain at the serviceability limit state) while remaining structurally adequate — crack widths, not section failure, govern.',
      practice: 'Distinguish strain from stress: stress is internal force intensity; strain is deformation. Their relationship depends on the material constitutive model. An elastic analysis that uses the wrong stress-strain relationship will give correct forces but wrong deformations.',
      designThinking: 'Use strain to understand deformation, stiffness, ductility, cracking, and material response. The strain at which yielding begins (εy) and the strain at which the material fractures or crushes (εu) bracket the useful range of structural behaviour for most materials.',
      construction: 'Actual strain behaviour is influenced by curing, temperature, shrinkage, creep, construction sequence, and restraint. Pre-stressing introduces compressive strain in concrete before live loads are applied, delaying the onset of tensile cracking.',
      failureReasoning: 'Excessive strain can indicate yielding, cracking, instability, excessive deformation, or another limit state depending on the material. For concrete, the limiting compressive strain at failure is approximately 0.003 (ACI 318) to 0.0035 (Eurocode 2).',
      failureModes: ['Yielding: strain exceeds εy and permanent deformation begins','Cracking: in concrete, tensile strain at approximately 0.0001 (10 times less than yield strain in steel)','Crushing: concrete compressive strain exceeds limiting value (approx 0.003)','Fracture: steel strain exceeds ultimate strain εu; rupture of the bar'],
      commonMistakes: ['Confusing strain and stress','Ignoring time-dependent strains (creep, shrinkage) in long-term deflection calculations','Assuming linear elastic behaviour beyond the yield strain'],
      troubleshooting: ['Check whether the material model in the analysis accounts for cracking or yielding','Check whether creep and shrinkage are included in long-term deflection predictions','Check whether thermal strain from temperature change is included in restrained structures'],
      practicalQuestion: 'What physical deformation does this strain represent, and is that deformation acceptable for the serviceability of the structure?',
      practicalQuestions: ['Is this a short-term (elastic) or long-term (creep + shrinkage) strain estimate?','Is the structure cracked, and if so has the reduced stiffness been accounted for in deflection calculations?'],
      related: ['stress','elasticity','plasticity','curvature','deflection','material-properties']
    }
  },

  {
    id: 'curvature',
    title: 'Curvature',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['moment','strain','section-properties','material-properties'],
    unlocks: ['deflection','deflected-shape','flexural-strength'],
    summary: 'The rate of change of slope along a bent member, directly related to bending moment and flexural stiffness, and the physical link between moment and deflection.',
    sections: {
      definition: 'Curvature κ (kappa) is the reciprocal of the radius of curvature R of the deformed centreline of a beam: κ = 1/R. A straight member has zero curvature. A member bent into a tight arc has large curvature. Curvature is the second derivative of the deflection profile: κ = d²v/dx², which is the mathematical statement that curvature is the rate of change of slope.',
      physical: 'When a beam bends, its centreline curves. The degree of curving at any cross-section depends on two things: how much moment is being applied and how stiff the section is in resisting bending. A heavy moment on a flexible section produces high curvature — a sharp bend. A light moment on a stiff section produces low curvature — barely perceptible bending. This relationship is captured exactly by M = EI × κ in the elastic range. Double-integrate the curvature distribution along the member length to get the deflection profile.',
      behaviour: 'In the elastic range, curvature is proportional to moment: κ = M/(EI). Where moment is large, curvature is large; where moment is zero (at pins and free ends), curvature is zero. The sign of curvature matches the sign of the moment: positive moment produces sagging (concave upward) curvature; negative moment produces hogging (concave downward) curvature. Beyond the elastic range, the relationship becomes nonlinear — cracking of concrete reduces EI and increases curvature for the same moment.',
      loadPath: 'Curvature is the internal kinematic response to bending moment. High curvature where moment is high means the member is bending most sharply there — visually, this is where you would see the most deformation in the deflected shape.',
      equation: 'Elastic relationship: κ = M/(EI). Deflection v is obtained by integrating curvature twice: dv/dx = ∫κ dx (slope), v = ∫∫κ dx dx (deflection), with boundary conditions applied (zero slope and zero deflection at a fixed end; zero deflection at a pin or roller). For a simply supported beam with UDL: maximum curvature at midspan = wL²/(8EI).',
      analysis: 'Analysis software computes deflections by integrating the curvature distribution (using the stiffness matrix, which encodes this process numerically). The deflected shape output is the visible result of the curvature distribution. Checking that the deflected shape is concave where the moment is positive and convex where it is negative is a fundamental quality check on analysis results.',
      resultInterpretation: 'If the deflected shape from analysis does not match the moment diagram in curvature sense (concave up where M is positive, concave down where M is negative), there is an error in the model. Inflection points (where curvature reverses direction) should coincide exactly with the points of contraflexure (where the moment crosses zero).',
      practice: 'For a concrete member, curvature is much more complex than the elastic formula suggests. Below the cracking moment, EI is based on the gross uncracked section. Above the cracking moment, EI reduces (using an effective cracked section). At high moment approaching yield, EI reduces further. Long-term deflections must account for creep, which increases curvature under sustained moment.',
      designThinking: 'The M/EI relationship shows directly that increasing depth d (which increases I proportionally to d³ for a rectangle) reduces curvature very efficiently. A beam twice as deep is eight times as stiff in bending and deforms one-eighth as much. This is why depth is the primary variable in controlling deflection, not width.',
      construction: 'Curvature is affected by construction sequence. If a composite slab is cast on a steel beam without propping, the steel beam deflects during casting under the wet concrete weight, then the composite section carries the live load. The total curvature and deflection profile depend on the staged construction sequence.',
      failureReasoning: 'In reinforced concrete, excessive curvature (at high moment) is a serviceability limit before a strength limit in well-designed beams. The transition from wide flexural cracks to imminent failure is visible as rapidly increasing curvature under small additional load. In brittle failure modes (poorly detailed RC, overreinforced sections, concrete crushing), failure can occur with little curvature warning.',
      failureModes: [
        'Excessive elastic curvature: large deflection under service load, indicating inadequate EI for the span and loading; a serviceability failure.',
        'Curvature localisation: in a plastic hinge zone, all inelastic curvature concentrates over a short length; if the plastic rotation demand exceeds the plastic rotation capacity, fracture occurs.',
        'Concrete crushing: extreme compressive fibre strain reaches the limiting value (approximately 0.003) at the peak moment section; curvature increases rapidly after this point.'
      ],
      commonMistakes: [
        'Using the elastic formula κ = M/EI for concrete beams without accounting for cracking, which can increase actual curvature by a factor of 3 to 5 over the uncracked calculation.',
        'Ignoring the contribution of creep to long-term curvature — sustained loads in concrete increase curvature by the creep coefficient φ (typically 1.5 to 3.0).',
        'Not checking that the deflected shape sign matches the moment sign — a common way to catch sign convention errors.'
      ],
      troubleshooting: [
        'Problem: deflection is much larger than the elastic formula predicts. Check for cracking (concrete) or reduced effective stiffness. Also check whether creep has been included for long-term deflection.',
        'Problem: deflected shape curves in the wrong direction. Check moment sign convention and the direction assumed positive in the EI κ = M relationship.',
        'Problem: inflection point in deflected shape does not coincide with zero crossing in moment diagram. One of the two is wrong — recheck both.'
      ],
      practicalQuestion: 'Can you trace from the moment diagram to the curvature distribution to the deflected shape — and does the deflected shape from the analysis match your expectation?',
      practicalQuestions: [
        'Is the deflected shape concave up (sagging) where the moment is positive and concave down (hogging) where the moment is negative?',
        'Have I accounted for cracking when estimating curvature in a concrete member?',
        'Has creep been included in the long-term curvature estimate?',
        'Does the depth of this section give adequate EI to keep curvature and deflection within acceptable limits?'
      ],
      related: ['moment','deflection','deflected-shape','strain','section-properties','material-properties','flexural-strength']
    }
  },

  {
    id: 'deflection',
    title: 'Deflection',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['curvature','stiffness','moment'],
    unlocks: ['drift','sfd-bmd','continuous-beam','cantilever'],
    summary: 'The physical displacement of a point on a structure from its original position under load, governed by the applied loading, span, and flexural stiffness.',
    sections: {
      definition: 'Deflection is the displacement of any point on a structural member from its unloaded position, measured in the direction of the applied load (usually vertical for beams under gravity loading). Deflection results from the curvature that develops along the member under bending moment. It is controlled by the span, the load intensity, and the flexural stiffness EI of the section.',
      physical: 'A beam sags under gravity load. The amount of sag at any point depends on how much the beam has to curve throughout its entire length to accommodate the applied loading and boundary conditions. A long beam sags more than a short beam under the same load because the curvature accumulates over a greater length. A stiff beam (large EI) sags less than a flexible beam (small EI) under the same loading because less curvature is needed to carry the moment.',
      behaviour: 'Deflection increases with the fourth power of span (for distributed load) and the third power (for concentrated load). Depth of section appears in I (second moment of area), which increases with the cube of depth. Therefore, doubling the depth reduces deflection by a factor of eight under the same loading — depth is the most efficient dimension to control deflection. Width has a linear effect and is far less efficient.',
      loadPath: 'Deflection is a response quantity, not a load path concept. However, excessive deflection changes the geometry of the structure and can cause secondary moments (P-Delta effects), load redistribution, and contact with adjacent elements. A slab that deflects until it contacts partitions below transfers load into those partitions — an unintended load path.',
      equation: 'Simply supported beam, UDL w: δ_max = 5wL⁴/(384EI) at midspan. Simply supported beam, central point load P: δ_max = PL³/(48EI). Cantilever, UDL w: δ_max = wL⁴/(8EI) at free end. Cantilever, tip point load P: δ_max = PL³/(3EI). Propped cantilever (fixed-roller), UDL: δ_max = wL⁴/(185EI) (approximately, at 0.42L from fixed end). For indeterminate structures, deflections must be found by superposition or numerical analysis.',
      analysis: 'Analysis software calculates deflections using the stiffness method. Reported deflections are typically at nodes, with interpolated values along members. Always check whether reported deflections are elastic only (short-term) or include long-term effects. For concrete, always ask whether the model uses the gross or cracked section — the difference is typically a factor of 2 to 4 for deflection.',
      resultInterpretation: 'Compare deflection against span/depth ratio rules (preliminary), against serviceability limits (L/300, L/360, L/500 depending on standard and use), and against absolute limits where ponding or contact with adjacent structure is a risk. In concrete, if gross section deflection exceeds about L/500, detailed cracked section and creep calculations are essential. Elastic deflection will likely underestimate the long-term deflection by a factor of 2 to 4.',
      practice: 'For spans up to about 8–10m, preliminary control of deflection is via span-to-depth ratio rules. For longer spans or sensitive finishes, calculate deflections explicitly using cracked section properties and include creep and shrinkage. Steel beam deflection checks typically use L/360 for live load (to protect plaster) and L/240 for total load. Concrete slabs often control on span/depth ratio or explicit deflection calculation including creep.',
      designThinking: 'Deflection is usually a serviceability limit state problem, not a strength problem. A beam can be strong enough but deflect excessively. The question is: what is the consequence? For flat roof beams, excessive deflection can cause ponding — water accumulates and adds load, causing more deflection, which allows more water, in a potentially progressive failure. For floor beams, the consequence is cracked finishes, poor appearance, and damaged partitions.',
      construction: 'Pre-camber is built into steel beams to offset part of the dead load deflection, so that after loading the beam is approximately level. The pre-camber is typically equal to the calculated dead load deflection. In concrete, early removal of props causes the slab to carry its self-weight at an age when concrete strength is lower and creep rate is higher, increasing long-term deflection.',
      failureReasoning: 'Deflection-related failures are usually serviceability failures: cracking of finishes, water ponding, door/window jamming, uncomfortable floor response to walking. Structural failure from deflection is rare in well-designed structures but can occur through ponding on flat roofs, progressive collapse initiated by a failed element, or P-Delta amplification in slender structures.',
      failureModes: [
        'Excessive dead load deflection: permanent sag visible to occupants; cracked ceilings, sloping floors.',
        'Excessive live load deflection: slab vibration under walking loads; cracked plaster under repeating deflections.',
        'Ponding on flat roofs: water accumulates in the deflected bay, increasing load, increasing deflection, increasing water depth — progressive failure.',
        'P-Delta amplification: gravity load acting through lateral deflection increases lateral deflection, which increases the moment, which increases deflection further — potential instability.'
      ],
      commonMistakes: [
        'Using only elastic, uncracked section deflections for concrete — underestimating long-term deflection by a factor of 2 to 5.',
        'Ignoring the effect of creep and shrinkage on concrete deflection.',
        'Checking deflection under live load only, forgetting that the partition damage limit applies to the incremental deflection after partition installation.',
        'Not checking whether camber provided in steel beams compensates for the correct load case.'
      ],
      troubleshooting: [
        'Problem: calculated deflection exceeds limit. Increase section depth (most efficient), increase span stiffness by adding intermediate supports, or reduce span.',
        'Problem: concrete slab is deflecting more in service than the analysis predicted. Check whether cracking has occurred (significantly reduces EI) and whether creep factor is included.',
        'Problem: pre-cambered steel beam still appears to sag. Pre-camber may not have been applied in the correct direction, or dead load at time of measurement may exceed the estimated dead load.',
        'Problem: ponding risk on a flat roof. Add a positive drainage slope or increase the beam stiffness to limit deflection below the ponding threshold.'
      ],
      practicalQuestion: 'Is this deflection a strength concern, a serviceability concern, or both — and have you checked against the correct limit for the specific finish or fitting being protected?',
      practicalQuestions: [
        'What is the consequence of this deflection — cosmetic, structural, or safety?',
        'For concrete, have I used cracked section properties and included creep in the long-term deflection estimate?',
        'Is there a risk of ponding on this flat roof, and does the deflection-to-tributary-length ratio leave adequate drainage slope?',
        'Is the pre-camber provided equal to the appropriate calculated dead load deflection?'
      ],
      related: ['curvature','stiffness','moment','drift','p-delta','continuous-beam','cantilever']
    }
  },

  {
    id: 'elasticity',
    title: 'Elasticity',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['stress','strain'],
    unlocks: ['material-properties','section-properties','deflection','stiffness'],
    summary: 'The material property describing a linear, fully recoverable relationship between stress and strain, governed by Young\'s modulus, that underlies most structural analysis.',
    sections: {
      definition: 'Elasticity describes a material\'s ability to return to its original shape after the load is removed. In the elastic range, stress is proportional to strain: σ = Eε (Hooke\'s Law), where E is the modulus of elasticity (Young\'s modulus). Elastic behaviour is linear (stress proportional to strain) and recoverable (no permanent deformation on unloading).',
      physical: 'Pull a steel spring and release it: the spring returns to its original length. The spring stores the strain energy elastically. Structural members behave the same way under working loads. For steel, the elastic range extends from zero to the yield stress: σ ∈ [0, fy]. For concrete, the material is approximately linear elastic only up to about 0.4fc\'; above this, behaviour becomes increasingly nonlinear even in compression.',
      behaviour: 'Linear elastic analysis is the basis of most structural design. It assumes that all materials behave elastically, that deformations are small (the geometry does not change significantly under load), and that the principle of superposition applies. These assumptions are satisfied for most structures under service loading. They break down near failure, under large deformations, or for highly nonlinear materials.',
      loadPath: 'In a linearly elastic structure, doubling the load doubles all reactions, internal forces, stresses, and deflections. This linearity makes elastic analysis tractable and superposition valid. The load path is the same at any load level.',
      equation: 'Hooke\'s Law: σ = Eε, equivalently E = σ/ε (slope of the elastic part of the stress-strain curve). Young\'s modulus values: Steel ≈ 200,000–210,000 MPa (200–210 GPa). Concrete ≈ 25,000–35,000 MPa (depends on fc\'). Timber ≈ 8,000–15,000 MPa (varies with species and grain direction). Aluminium ≈ 70,000 MPa. Shear modulus: G = E/[2(1+ν)] where ν is Poisson\'s ratio (≈ 0.3 for steel, ≈ 0.2 for concrete).',
      analysis: 'Linear elastic analysis is the standard method for structural design. It gives the correct distribution of internal forces and deflections under service loads, provided materials remain elastic. For ultimate limit state design, elastic analysis provides a safe upper bound on demand (by the lower-bound theorem of plasticity) as long as the structure has sufficient ductility to redistribute loads.',
      resultInterpretation: 'Elastic analysis will underestimate the actual deflection of a concrete structure under service loads because cracking reduces the effective stiffness well below the uncracked elastic value. For deflection-critical concrete members, a cracked-section analysis using a reduced effective modulus is required for accurate results.',
      practice: 'Know the elastic modulus of the material you are working with and its significance: E controls the stiffness of the structural system, the deflection under load, the distribution of forces in indeterminate structures (load goes to stiff elements), and the buckling resistance of compression members. Changing E (by changing material or by cracking) changes all of these simultaneously.',
      designThinking: 'Elastic analysis gives forces and moments; it does not directly give capacity. Capacity depends on the material strength limit (yield, crushing, fracture) and the geometry. The elastic analysis tells you the demand; the strength model tells you the capacity. Comparing demand to capacity — at every critical section under every governing load combination — is structural design.',
      construction: 'During construction, materials may not be at their design elastic modulus. Concrete gains strength and stiffness with time; early loading causes higher stresses and deflections than would occur if loading were delayed. Temporary propping maintains elastic equilibrium during construction and is removed sequentially to control the load path as elastic stiffness develops.',
      failureReasoning: 'Elastic analysis underestimates deformations in inelastic materials (cracked concrete, yielded steel) and overestimates the redistribution capacity of brittle materials. When the elastic analysis predicts high concentration of demand in a brittle material, failure may occur at lower total load than the elastic analysis would suggest.',
      failureModes: ['Elastic analysis applied beyond the elastic range gives non-conservative deflection estimates (if material softens) or conservative force estimates (if the structure can redistribute).',
        'Overestimating E leads to underestimating deflections — important for concrete where cracking significantly reduces effective E.'],
      commonMistakes: ['Using the gross section elastic modulus for cracked concrete deflection calculations','Assuming that because the elastic analysis gives acceptable stresses the structure is safe — check also for stability and ductility'],
      troubleshooting: ['Problem: deflection much larger than elastic prediction. Material has probably cracked or yielded, reducing effective stiffness below the elastic value used in analysis.'],
      practicalQuestion: 'Are the materials in this structure actually behaving elastically under service loads, or has cracking or yielding begun to reduce the effective stiffness?',
      practicalQuestions: ['What is the Young\'s modulus of this material and how does it affect the stiffness distribution in this indeterminate structure?','Has cracking occurred in this concrete member and has the reduced effective EI been used in deflection calculations?'],
      related: ['stress','strain','plasticity','stiffness','material-properties','curvature','deflection']
    }
  },

  {
    id: 'plasticity',
    title: 'Plasticity and Yielding',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['elasticity','stress','strain'],
    unlocks: ['strength','flexural-strength','column','connection'],
    summary: 'The behaviour of materials beyond their elastic limit, where permanent deformation occurs, enabling redistribution of forces and ductile failure mechanisms.',
    sections: {
      definition: 'Plasticity describes material behaviour beyond the elastic limit (yield point). When stress reaches the yield strength fy, further deformation occurs without additional stress in an ideal elastic-perfectly plastic material. In real steel, the stress-strain curve includes a yield plateau followed by strain hardening. The result is permanent (non-recoverable) deformation. Plastic design methods exploit this by allowing redistribution of internal forces after first yield.',
      physical: 'Bend a steel paper clip gently: it springs back (elastic). Bend it sharply: it stays bent (plastic). Structural steel has a clearly defined yield point — the stress at which the material begins to flow plastically. Below this point, the material is elastic and recovers. Above it, permanent strain accumulates. For design, the yield strength is the dividing line between elastic serviceability behaviour and plastic ultimate behaviour.',
      behaviour: 'In a steel beam under increasing load, the extreme fibres reach yield first (at the elastic moment capacity: Me = fy × S). The plastic zone then spreads inward from the extreme fibres as the load increases. Full plasticity of the section is reached when every fibre has yielded — the plastic moment capacity Mp = fy × Z, where Z is the plastic section modulus. The ratio Mp/Me = Z/S is called the shape factor (≈ 1.12 for standard I-beams, 1.5 for rectangles).',
      loadPath: 'Plastic redistribution allows a structure to carry more load than first yield would suggest. When a critical section reaches Mp (a plastic hinge forms), it continues to carry Mp while the rest of the structure takes additional load. In a fixed-ended beam under UDL, three plastic hinges are needed to form a mechanism. The structure can carry loads significantly above the first yield load by exploiting this redistribution.',
      equation: 'Yield stress: fy (material property; typically 250–460 MPa for structural steel). Elastic moment capacity: Me = fy × S (S = elastic section modulus = I/c). Plastic moment capacity: Mp = fy × Z (Z = plastic section modulus; Z > S always). Shape factor: f = Z/S (≈ 1.12 for I-sections, ≈ 1.5 for rectangular sections). For concrete: yield of reinforcement at εs = fy/Es.',
      analysis: 'Elastic analysis underestimates the capacity of ductile structures by not accounting for redistribution after first yield. Plastic analysis (mechanism method or moment distribution with plastic hinges) gives the true collapse load of a ductile structure. Most design codes allow elastic analysis for determining internal forces but apply the plastic section modulus Z for capacity calculation — an implicit combination of the two methods.',
      resultInterpretation: 'When elastic analysis gives a demand/capacity ratio approaching 1.0 at one section while adjacent sections are still well under-designed, consider whether plastic redistribution could be relied upon to allow the overstressed section to reach Mp and transfer load. This is only valid if the material has sufficient ductility (steel usually does; heavily overreinforced concrete does not).',
      practice: 'The design codes for steel specify plastic or compact section classifications to allow use of Mp. A section classified as compact (or Class 1 in Eurocode) can achieve Mp before local buckling occurs. A non-compact or semi-compact section may buckle locally before reaching Mp, requiring use of a reduced capacity between Me and Mp.',
      designThinking: 'The distinction between elastic and plastic behaviour determines the appropriate analysis method and capacity formula. Elastic design is simpler and always conservative. Plastic design captures the true capacity of ductile structures but requires confidence in ductility. Code-based design typically uses elastic forces with plastic section capacities — a pragmatic hybrid.',
      construction: 'Plastic hinges in steel form at high rotation demand locations. Connections at these locations must be capable of accommodating the rotation without fracture. Bolted connections in plastic hinge zones must be designed to remain elastic while the connected member yields; the hierarchy of strengths must be controlled.',
      failureReasoning: 'In plastic failure of a beam, plastic hinges form sequentially until a mechanism allows the structure to displace without limit. The number of hinges needed to form a mechanism equals the degree of indeterminacy plus one. Before the mechanism forms, each hinge continues to carry Mp — capacity and ductility of the hinge zone determine whether mechanism failure is gradual and predictable (ductile) or sudden (brittle).',
      failureModes: [
        'Full plasticity at a section (plastic hinge): the section carries Mp but rotates freely; acceptable if ductility is sufficient.',
        'Premature local buckling: the compression flange buckles before the section reaches Mp; capacity is reduced to between Me and Mp.',
        'Fracture at plastic hinge zone: weld or connection fails before sufficient rotation for redistribution; brittle failure below design load.',
        'Mechanism formation: enough hinges form to convert the structure to a mechanism; ultimate limit state of the structure.'
      ],
      commonMistakes: [
        'Using the elastic section modulus S (instead of Z) for the plastic capacity of a compact steel section — underestimates capacity by about 10–12% for I-sections.',
        'Assuming plastic redistribution without checking that the section classification allows it.',
        'Applying plastic design to brittle materials (unreinforced concrete, overreinforced RC) without sufficient ductility for redistribution.',
        'Ignoring the rotation demand at a plastic hinge — the hinge must rotate through a specific angle before the mechanism forms; if the material fractures first, redistribution does not occur.'
      ],
      troubleshooting: [
        'Problem: design requires plastic section capacity but the section is non-compact. Either increase the flange or web dimensions to make the section compact, or use the reduced elastic capacity.',
        'Problem: plastic analysis gives higher capacity than expected. Check that the mechanism is correctly identified — the right number of hinges in the right locations.',
        'Problem: local buckling occurs before yielding. Check the width-to-thickness ratios of the compression elements against the compact section limits.'
      ],
      practicalQuestion: 'Is this material ductile enough to redistribute forces after first yield — and has the section been classified to confirm that plastic capacity can be relied upon?',
      practicalQuestions: [
        'Is this section compact (Class 1 or Class 2) so that the plastic moment Mp can be used for capacity?',
        'Is there sufficient rotation ductility at this hinge location for the plastic redistribution assumed?',
        'Has the interaction between local buckling and plastic capacity been checked?'
      ],
      related: ['elasticity','stress','strain','strength','flexural-strength','section-properties','buckling','moment']
    }
  },


  // ==========================================================================
  // DOMAIN 2 — STRUCTURAL BEHAVIOUR
  // ==========================================================================

  {
    id: 'section-properties',
    title: 'Section Properties',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['stress','moment','axial-force'],
    unlocks: ['curvature','deflection','buckling','slenderness','shear-stress','flexural-strength'],
    summary: 'The geometric properties of a cross-section — area, second moment of area, section moduli, and radius of gyration — that govern how a member resists applied forces and moments.',
    sections: {
      definition: 'Section properties are geometric quantities calculated from the shape of a cross-section. They determine how much stress or deformation results from a given internal force. The key properties are: A (cross-sectional area), I (second moment of area, or moment of inertia), S (elastic section modulus), Z (plastic section modulus), r (radius of gyration), and the position of the centroid and neutral axis.',
      physical: 'Two beams of the same material and weight can have vastly different bending stiffness depending on how the material is arranged. Placing material far from the neutral axis (as in an I-section) dramatically increases I and thus bending resistance, compared to a solid rectangular section of the same area. This is why I-sections are used for beams: the steel is concentrated in the flanges, which are farthest from the neutral axis, where bending stress is highest.',
      behaviour: 'Area A: controls axial stress (σ = P/A) and axial stiffness (AE). Second moment of area I: controls bending stress (σ = My/I), flexural stiffness (EI), and appears in deflection formulas. Elastic section modulus S = I/c (where c is distance to extreme fibre): at first yield, M_yield = fy × S. Plastic section modulus Z = sum of first moments of area about the plastic neutral axis: M_plastic = fy × Z. Radius of gyration r = √(I/A): controls slenderness and buckling — a compact section with large r buckles at a higher load.',
      loadPath: 'Section properties mediate between internal forces and the stress and deformation response. The load path brings force and moment to a section; the section properties determine the resulting stress and stiffness.',
      equation: 'For a rectangle (width b, depth d): A = bd, I_x = bd³/12 (about horizontal centroidal axis), S_x = bd²/6, Z_x = bd²/4, r_x = d/√12. For a circle (diameter D): A = πD²/4, I = πD⁴/64, r = D/4. For standard sections: tabulated in manufacturer data. Parallel axis theorem: I about any axis = I_centroid + A × d², where d is the distance between axes.',
      analysis: 'Analysis software uses cross-section properties to assemble element stiffness matrices. Incorrect section properties — wrong I, wrong A — directly corrupt all force and deflection results. Always verify section properties by comparison with standard tables or an independent calculation before trusting analysis output.',
      resultInterpretation: 'The ratio S/Z = (elastic section modulus)/(plastic section modulus) is the shape factor and indicates how much additional capacity the section has beyond first yield. For I-sections, this is approximately 1.12 — meaning the section can carry about 12% more moment after first yield before full plasticity. For rectangles it is 1.5, and for circles approximately 1.7.',
      practice: 'When selecting sections for bending, I controls stiffness (deflection) and S or Z controls strength. When selecting for columns, A controls material strength and r controls buckling. For combined bending and axial load (beam-columns), all four properties are involved. Standard section tables provide all these properties; only non-standard or composite sections need calculation from first principles.',
      designThinking: 'The goal in cross-section design is to arrange material efficiently. For bending: maximise I (put material far from the neutral axis). For compression: maximise r (put material far from the centroid of area). For tension: maximise net A (material area minus holes). These objectives often conflict; the chosen section is a compromise.',
      construction: 'Section properties depend on the actual built dimensions, which may vary from nominal due to manufacturing tolerance. Rolled steel section properties may differ slightly from nominal if the section is at the low end of the rolling tolerance. Reinforced concrete section properties depend on whether the section has cracked, which reduces the effective I dramatically.',
      failureReasoning: 'Using incorrect section properties in analysis is a direct path to under-design or over-design. The most dangerous error is overstating I (which underestimates stress and deflection) or underestimating r (which gives a non-conservative buckling resistance).',
      failureModes: ['Incorrect I leads to underestimated bending stress — potentially unsafe design.','Incorrect r leads to incorrect slenderness and wrong buckling resistance.'],
      commonMistakes: ['Using tabulated I for a composite section without accounting for the modular ratio','Using gross I for cracked concrete sections in deflection calculations','Confusing S (elastic) and Z (plastic) section moduli'],
      troubleshooting: ['Problem: calculated stress seems too high or too low. Verify the section property from first principles or a standard table.'],
      practicalQuestion: 'Are you using the correct section property for each calculation — I for stiffness and bending stress, Z or S for capacity, r for buckling?',
      practicalQuestions: ['Is the I value from tabulation consistent with the section depth and flange width?','Have I used Z (not S) for the plastic moment capacity check?','For a cracked concrete section, have I used the cracked I instead of the gross I?'],
      related: ['stress','moment','axial-force','curvature','deflection','slenderness','buckling','shear-stress']
    }
  },

  {
    id: 'material-properties',
    title: 'Material Properties',
    category: 'Mechanics',
    domain: 'Structural Mechanics',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['stress','strain','elasticity'],
    unlocks: ['stiffness','strength','section-properties','concrete-material','reinforcement'],
    summary: 'The mechanical characteristics of structural materials — stiffness, strength, ductility, and time-dependent behaviour — that govern how a structure responds to loading.',
    sections: {
      definition: 'Material properties quantify the physical behaviour of a structural material under loading. The primary mechanical properties are: E (Young\'s modulus — stiffness), fy (yield strength — steel), fc\' (compressive strength — concrete), fu (ultimate tensile strength), ν (Poisson\'s ratio), G (shear modulus), and ε_u (ultimate strain — ductility). Time-dependent properties include creep coefficient φ and shrinkage strain ε_sh for concrete.',
      physical: 'Steel: stiff (E ≈ 200 GPa), strong (fy ≈ 250–460 MPa), ductile (large strain capacity before fracture), consistent (mill-produced, tightly controlled properties). Concrete: stiff in compression (E ≈ 25–35 GPa), strong in compression (fc\' ≈ 25–80 MPa), very weak in tension (ft ≈ 0.1fc\'), brittle in compression failure, time-dependent (creep and shrinkage increase deformations significantly over time). Timber: anisotropic (very different properties along and across the grain), moisture-sensitive, lower stiffness and strength than steel and concrete but excellent strength-to-weight ratio.',
      behaviour: 'E (Young\'s modulus): controls stiffness of all members — deflections, natural frequencies, and load distribution in indeterminate structures. Yield strength fy (steel): the stress at which permanent deformation begins; design codes calibrate safety factors against this. fc\' (concrete): the 28-day cylinder compressive strength; design equations for concrete capacity are proportional to √fc\' or fc\'⁰·⁵–⁰·⁶⁷. Ductility (εu/εy ratio): controls how much warning failure gives and whether redistribution can be relied upon.',
      loadPath: 'Material properties determine how stiff each member is and therefore how much load it attracts in an indeterminate structure. A steel member is typically 6–8 times stiffer than a timber member of the same cross-section. If they are in parallel (sharing a load), the steel member attracts 6–8 times more force.',
      equation: 'Concrete E: Ec ≈ 4700√fc\' (MPa) per ACI 318, where fc\' is in MPa. This is approximate — actual modulus depends on aggregate type and mix proportions. Steel E: Es = 200,000–210,000 MPa (constant for all grades of structural steel). Shear modulus: G = E/[2(1+ν)]. For steel, G ≈ 80,000 MPa. Creep: additional strain ε_creep = φ × ε_elastic, where φ typically ranges from 1.5 to 3.0 for normal concrete.',
      analysis: 'Analysis software requires material properties as input. The most common error is using an incorrect E for concrete — particularly important because deflections are proportional to 1/E, and using the wrong value directly scales all computed deflections. For dynamic analysis, the modulus affects the natural frequency (ω = √(EI/mL³) for a simple beam), so an incorrect modulus shifts the predicted frequency.',
      resultInterpretation: 'The ratio of E values in a composite or mixed system determines load distribution. In a composite steel-concrete floor, the higher E of steel (≈ 200,000 MPa) versus concrete (≈ 30,000 MPa) means the steel frame is about 6–7 times stiffer per unit area. Under load, the steel frame carries proportionally more load unless composite action is developed.',
      practice: 'Always use the actual specified material grade in the analysis model, not nominal or assumed values. For existing structures, material testing may be required if documentation is missing. For concrete, the specified 28-day compressive strength fc\' is used for design; the in-situ strength at time of loading may be higher (if loading is after 28 days) or lower (if loading is early).',
      designThinking: 'Higher strength material does not always mean better design. A higher fy steel has the same E as ordinary steel — it does not deflect less. For deflection-controlled designs, increasing the yield strength is irrelevant; increasing the section size (increasing I) or using a higher E material (not possible with steel, which has constant E) is the answer.',
      construction: 'Concrete gains strength with time but its modulus of elasticity also increases. Early loading of concrete (before adequate strength development) creates higher stresses and more creep than later loading. Steel properties are consistent and do not change with age, but welding can affect local microstructure and properties at the weld zone.',
      failureReasoning: 'Using over-optimistic material properties (too high fy, too high fc\') is unconservative. Design codes apply material partial factors (γm) to the characteristic material strength to account for variability. The characteristic strength is defined as the value below which only 5% of test results fall.',
      failureModes: ['Material variability: the actual material strength falls below the design value; addressed by material partial factors.','Degradation: corrosion, fire, chemical attack, or fatigue reduces material properties below their original value.'],
      commonMistakes: ['Using nominal or specified strength for E when the actual E is needed for deflection calculations','Forgetting that concrete E depends on fc\' and not using the correct grade for the analysis model','Using steel E for reinforcement bar calculations when concrete E should be used for concrete stresses'],
      troubleshooting: ['Problem: predicted deflection disagrees with measurement. Check whether the correct E was used, whether cracking has occurred, and whether creep is included.'],
      practicalQuestion: 'Are the material properties in the analysis model consistent with the specified material grades, and have the time-dependent effects (creep, shrinkage) been included for concrete?',
      practicalQuestions: ['Is the E value in my model from the correct formula for this concrete grade?','Have I applied material partial factors before comparing capacity to demand?','Have I accounted for creep in long-term deflection estimates?'],
      related: ['stress','strain','elasticity','plasticity','stiffness','concrete-material','section-properties']
    }
  },

  {
    id: 'stiffness',
    title: 'Stiffness',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['elasticity','deflection','material-properties','section-properties'],
    unlocks: ['strength','stability','drift','p-delta','lateral-system','second-order-effects'],
    summary: 'A measure of how strongly a structural system resists deformation under an applied action.',
    sections: {
      definition: 'Stiffness describes the relationship between applied action and resulting deformation.',
      physical: 'A stiffer member generally changes shape less under the same loading, all else equal.',
      behaviour: 'Stiffness controls how forces and deformations are distributed throughout a structural system.',
      loadPath: 'Stiffness influences which structural members attract load and how load is distributed between parallel load paths.',
      equation: 'For a simple spring, k = F/Δ. Structural stiffness can involve axial, flexural, shear, torsional, or system-level behaviour. Flexural stiffness of a beam: EI/L. Axial stiffness: AE/L.',
      analysis: 'Analysis software uses member and system stiffness to determine deformation and force distribution.',
      resultInterpretation: 'Unexpected forces or deflections can sometimes be traced to incorrect stiffness assumptions rather than insufficient member strength.',
      practice: 'Strength and stiffness are different. A member can be strong enough but too flexible, leading to excessive deflection, drift, vibration, or second-order effects.',
      designThinking: 'Changing member stiffness changes the behaviour of the whole structural system, not just that member.',
      construction: 'Cracking, connection flexibility, composite action, construction sequence, and actual material properties can change effective stiffness.',
      failureReasoning: 'Insufficient stiffness can lead to excessive deformation, instability, vibration, or redistribution of forces.',
      failureModes: ['Excessive deflection','Excessive drift','Vibration','Instability','Unexpected force redistribution'],
      commonMistakes: ['Confusing strength with stiffness','Using unrealistic stiffness modifiers','Ignoring cracking','Ignoring connection flexibility'],
      troubleshooting: ['Check member properties','Check material properties','Check stiffness modifiers','Check supports','Check deformation results'],
      practicalQuestion: 'If I change this member\'s stiffness, what happens to the behaviour of the entire structural system?',
      practicalQuestions: ['Does increasing this member\'s stiffness attract more load to it?','Have I used cracked section stiffness for concrete members under service load?'],
      related: ['strength','deflection','drift','stability','material-properties','section-properties','elasticity']
    }
  },

  {
    id: 'strength',
    title: 'Strength',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['stress','material-properties'],
    unlocks: ['flexural-strength','stirrups','development-length','connection'],
    summary: 'The ability of a structural component or system to resist a specified action without unacceptable failure.',
    sections: {
      definition: 'Strength is the resistance available against a particular failure or limit state.',
      physical: 'Strength depends on material, geometry, loading, boundary conditions, imperfections, and the failure mechanism being considered.',
      behaviour: 'Different failure mechanisms can govern even within the same member.',
      loadPath: 'Strength must be considered at every important point along the load path.',
      equation: 'A common design comparison is demand ≤ design resistance, with the exact format governed by the adopted design standard.',
      analysis: 'Analysis determines demand; design checks determine whether the available resistance is adequate.',
      resultInterpretation: 'Never interpret a utilisation ratio without understanding the limit state, combination, code provisions, and modelling assumptions behind it.',
      practice: 'Do not assume that a stronger-looking member is automatically safer. The governing failure mechanism and structural system must be understood.',
      designThinking: 'Determine the governing limit state before deciding how to increase capacity.',
      construction: 'Actual capacity depends on material quality, detailing, workmanship, dimensions, connections, and construction tolerances.',
      failureReasoning: 'Failure occurs when the relevant demand exceeds available resistance or when another governing mechanism such as instability occurs.',
      failureModes: ['Flexural failure','Shear failure','Compression failure','Tension failure','Buckling','Connection failure'],
      commonMistakes: ['Checking only one failure mode','Ignoring serviceability','Ignoring stability','Misinterpreting utilisation ratios'],
      troubleshooting: ['Identify governing demand','Identify governing limit state','Check design resistance','Check modelling assumptions'],
      practicalQuestion: 'What exact failure mechanism is this strength check trying to prevent?',
      practicalQuestions: ['Have I checked all relevant failure modes, not just flexure?','Is the governing limit state strength or serviceability?'],
      related: ['stiffness','stability','flexural-strength','plasticity','section-properties','material-properties']
    }
  },

  {
    id: 'slenderness',
    title: 'Slenderness',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['buckling','axial-force','section-properties','stability'],
    unlocks: ['buckling','p-delta','column'],
    summary: 'The ratio of effective length to radius of gyration for a compression member, determining whether material failure or buckling governs its capacity.',
    sections: {
      definition: 'Slenderness ratio λ = kL/r, where k is the effective length factor (accounting for end restraint), L is the member length, and r is the radius of gyration of the cross-section about the buckling axis. For a given material and cross-section, slenderness determines the transition between material failure (crushing or yielding at low slenderness) and elastic buckling (at high slenderness).',
      physical: 'A stocky column (low slenderness) will crush before it buckles — material strength governs. A slender column (high slenderness) will buckle at a load far below the crushing load — geometry governs. Between these extremes, a transition zone exists where both material yielding and imperfections interact, reducing capacity below both the pure crushing load and the ideal Euler buckling load. Most practical columns fall in this transition zone.',
      behaviour: 'At low slenderness (λ < approximately 50 for steel): capacity ≈ material crushing load (fy × A). At high slenderness (λ > approximately 150 for steel): capacity ≈ Euler elastic buckling load. At intermediate slenderness: design code column curves (empirical, accounting for residual stresses and geometric imperfections) give a capacity that falls below both limits. The precise curve depends on the section shape, residual stress pattern, and imperfection magnitude — hence the different column curves in codes (e.g. curves a, b, c, d in Eurocode 3).',
      loadPath: 'For a compression member to remain stable, lateral restraint must exist at intervals to reduce the effective length. Every restraint point reduces kL and therefore reduces slenderness. The load path must provide these restraint forces — typically from purlins, floor beams, or bracing connected to the compression chord or flange.',
      equation: 'Slenderness ratio: λ = kL/r. Effective length factor k: 1.0 for pin-pin, 0.7 for pin-fixed, 0.5 for fixed-fixed (theoretical). Real end conditions usually give k between 0.65 and 1.0 for braced frames, potentially greater than 1.0 for unbraced frames. Euler critical stress: σ_cr = π²E/(kL/r)² = π²E/λ². Check λ against maximum limits in design standards (e.g., kL/r ≤ 200 for steel in many codes as a serviceability limit).',
      analysis: 'Analysis software may not automatically apply the effective length factor — the modelled length must match the laterally unbraced length. Verify that intermediate bracing points (purlins, floor beams) are actually connected in the model if relying on them to reduce kL.',
      resultInterpretation: 'A column with high slenderness and high axial load is a stability-critical element. A small increase in load or a slight imperfection can shift it from adequate to inadequate. Treat high-slenderness elements with extra conservatism. The P-Delta effect is essentially the manifestation of slenderness at the structure level.',
      practice: 'Check slenderness about both principal axes. The weak axis often governs because r is smallest about that axis. Check also whether the column has lateral restraint at each floor level — if restraint is missing for multiple storeys, the effective length spans multiple floors.',
      designThinking: 'To reduce slenderness: either reduce kL (add restraint) or increase r (change section shape to put more area further from the centroid). Increasing area alone (which increases A but not r proportionally) only helps if slenderness is already low and material strength governs. For very slender columns, adding area can actually reduce capacity if the section becomes more slender in proportion.',
      construction: 'During construction, before bracing is complete, columns may be more slender than in their final condition. Erection checks for steel columns in partially braced frames are critical and often overlooked.',
      failureReasoning: 'Columns that buckle in service have typically experienced one or more of: overloading, loss of lateral restraint (bracing failed or was never connected), imperfection larger than assumed (out-of-plumb, sweep), or a modelling error that overestimated the effective length factor.',
      failureModes: [
        'Flexural buckling: lateral displacement in the plane of least resistance (weak axis); most common mode.',
        'Torsional buckling: twisting without lateral movement; more common in open sections (cruciform, angle).',
        'Flexural-torsional buckling: combined lateral displacement and twist; common in channels and singly-symmetric sections.'
      ],
      commonMistakes: [
        'Using the full column height as L when intermediate floor beams or bracing reduce the effective length.',
        'Checking slenderness only about the strong axis, ignoring the weak axis which usually governs.',
        'Assuming k = 1.0 when the end conditions actually provide significant rotational restraint, giving a conservative but potentially very uneconomical result.'
      ],
      troubleshooting: [
        'Problem: column design gives very low capacity. Check the effective length assumption — are all restraint points included?',
        'Problem: column fails buckling check but stress is low. Slenderness is high and buckling, not material strength, governs. Add bracing or change the section to increase r.',
        'Problem: buckling load is much less than applied load. Check whether P-Delta effects are amplifying the effective load.'
      ],
      practicalQuestion: 'What is the effective unbraced length of this column, and is slenderness or material strength governing its design?',
      practicalQuestions: ['What is the slenderness ratio about the weak axis?','Does any bracing actually provide lateral restraint, or is it only nominally connected?','Is the effective length factor appropriate for the actual rotational restraint at the column ends?'],
      related: ['buckling','stability','p-delta','axial-force','column','section-properties']
    }
  },

  {
    id: 'stability',
    title: 'Stability',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['equilibrium','stiffness','buckling'],
    unlocks: ['p-delta','second-order-effects','lateral-system','drift'],
    summary: 'The ability of a structure to maintain an acceptable equilibrium configuration under disturbances and loading.',
    sections: {
      definition: 'Stability concerns whether an equilibrium state can be maintained as loads, geometry, and imperfections change.',
      physical: 'A structure may have adequate material strength yet become unstable through buckling, sway, overturning, or other mechanisms.',
      behaviour: 'Stability is strongly influenced by geometry, stiffness, restraints, imperfections, and load level.',
      loadPath: 'A stable load path must transfer actions without allowing uncontrolled deformation or loss of equilibrium.',
      equation: 'Stability problems often depend on geometry and stiffness rather than simple stress capacity; critical load concepts such as Euler buckling are foundational.',
      analysis: 'Stability analysis can involve eigenvalue buckling, second-order analysis, nonlinear analysis, or code-specific procedures.',
      resultInterpretation: 'A high theoretical buckling factor does not automatically guarantee real-world stability because imperfections, material nonlinearity, restraints, and modelling assumptions matter.',
      practice: 'When instability is possible, investigate boundary conditions, effective length, imperfections, second-order effects, lateral restraint, and the global load path.',
      designThinking: 'Think about how the structure behaves when it moves away from its original geometry.',
      construction: 'Temporary construction conditions can be significantly less stable than the completed structure.',
      failureReasoning: 'Instability can occur before material strength is reached.',
      failureModes: ['Buckling','Sway instability','Overturning','Lateral instability','Progressive instability'],
      commonMistakes: ['Ignoring second-order effects','Assuming ideal restraints','Ignoring imperfections','Checking material strength only'],
      troubleshooting: ['Check restraints','Check effective length','Check stiffness','Check P-Delta effects','Check imperfections','Check lateral load path'],
      practicalQuestion: 'If the structure moves slightly from its original position, does the system tend to restore equilibrium or move further away?',
      practicalQuestions: ['Has the structure been checked for stability under construction loads?','Are all bracing connections actually transferring the bracing force required?'],
      related: ['buckling','p-delta','slenderness','stiffness','second-order-effects','lateral-system']
    }
  },

  {
    id: 'buckling',
    title: 'Buckling',
    category: 'Failure & Stability',
    domain: 'Structural Behaviour',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['stability','axial-force','slenderness'],
    unlocks: ['slenderness','p-delta','column'],
    summary: 'An instability phenomenon in which a member can experience large deformation under compressive or combined loading, at a load below the material strength limit.',
    sections: {
      definition: 'Buckling is a stability-driven response in which a structural member or system loses its original equilibrium configuration.',
      physical: 'A slender compression member can deflect laterally even when material stress has not reached simple crushing strength.',
      behaviour: 'Buckling behaviour depends on slenderness, stiffness, restraints, imperfections, material properties, and loading.',
      loadPath: 'Compression forces must be transferred through a stable system with adequate lateral and rotational restraint.',
      equation: 'For an ideal Euler column, Pcr = π²EI/(kL)². Real design requires consideration of imperfections, inelasticity, restraint, residual stress, and the applicable code model.',
      analysis: 'Buckling analysis may provide eigenmodes, critical factors, or nonlinear stability response.',
      resultInterpretation: 'An eigenvalue buckling factor is not automatically a direct safety factor. It must be interpreted with the analysis assumptions and code procedure.',
      practice: 'Never use Euler buckling as a universal design formula. It is a conceptual foundation. Real members require a code-specific stability procedure.',
      designThinking: 'Identify the possible buckling mode before deciding how to increase capacity.',
      construction: 'Temporary bracing, erection sequence, imperfections, and incomplete connections can make construction-stage buckling critical.',
      failureReasoning: 'Buckling is controlled by stability and geometry and can occur before simple material crushing.',
      failureModes: ['Flexural buckling','Torsional buckling','Flexural-torsional buckling','Lateral-torsional buckling','Local buckling'],
      commonMistakes: ['Using Euler formula blindly','Ignoring effective length','Ignoring imperfections','Ignoring lateral restraint'],
      troubleshooting: ['Check effective length','Check restraints','Check member stiffness','Check slenderness','Check second-order effects'],
      practicalQuestion: 'What physical movement is the member trying to make when it becomes unstable?',
      practicalQuestions: ['What mode shape would this member buckle into?','Have I checked buckling about the weak axis?'],
      related: ['stability','slenderness','p-delta','column','second-order-effects']
    }
  },

  {
    id: 'p-delta',
    title: 'P-Delta Effect',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Advanced',
    levelNum: 2,
    status: 'complete',
    prerequisites: ['stability','deflection','drift','second-order-effects'],
    unlocks: ['second-order-effects','drift'],
    summary: 'Second-order effects caused by axial force acting through lateral displacement, amplifying both moments and drift beyond the first-order analysis values.',
    sections: {
      definition: 'P-Delta effects arise when an axial force P acts through a displaced geometry with lateral offset Δ, producing an additional moment.',
      physical: 'As a building sways, gravity loads can amplify the overturning effects. This can reduce effective stability and increase demands.',
      behaviour: 'P-Delta effects become more important as axial load and lateral displacement increase.',
      loadPath: 'Gravity loads acting through displaced geometry create additional moments that must be transferred through the lateral system.',
      equation: 'A simplified additional moment is approximately M₂ = PΔ. Real structural analysis can require iterative or geometric-nonlinear methods.',
      analysis: 'Analysis software may account for second-order effects using P-Delta or geometric nonlinear analysis.',
      resultInterpretation: 'If P-Delta significantly changes moments or drift, the engineer should investigate stability, stiffness, geometry, and code requirements.',
      practice: 'Review P-Delta when axial load and lateral displacement are significant. Check whether the analysis model, stiffness assumptions, stability criteria, and code requirements are appropriate.',
      designThinking: 'Ask whether the structure becomes more unstable as it deforms.',
      construction: 'Construction-stage geometry and incomplete lateral systems can influence second-order effects.',
      failureReasoning: 'Large P-Delta amplification can contribute to instability and excessive structural demand.',
      failureModes: ['Second-order amplification','Sway instability','Excessive drift','Progressive instability'],
      commonMistakes: ['Ignoring second-order effects','Using unrealistic stiffness','Ignoring axial load accumulation','Ignoring drift'],
      troubleshooting: ['Check axial loads','Check drift','Check stiffness','Check P-Delta settings','Check stability criteria'],
      practicalQuestion: 'As the structure moves laterally, does the gravity load create additional demand large enough to change the structural response?',
      practicalQuestions: ['Is the stability index Q = ΣPΔ/(Vh) significant (greater than 0.05 per AISC)?','Has P-Delta analysis been enabled in the software?'],
      related: ['stability','drift','buckling','second-order-effects','slenderness']
    }
  },

  {
    id: 'drift',
    title: 'Drift',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['deflection','stiffness','lateral-system'],
    unlocks: ['p-delta','second-order-effects'],
    summary: 'The lateral displacement of a floor level or building storey under horizontal loading, which controls damage to non-structural elements and amplifies P-Delta effects.',
    sections: {
      definition: 'Drift is the horizontal displacement of a floor relative to the floor below (inter-storey drift) or the top displacement of the building relative to its base (total drift). Inter-storey drift ratio is the inter-storey displacement divided by the storey height. It is a serviceability and stability measure, not a strength measure.',
      physical: 'Under wind or seismic loading, a building sways. If the sway is small, non-structural elements (partitions, facades, glazing, services) are undamaged, P-Delta effects are minor, and the structure performs as intended. If drift is excessive, partitions crack, facade elements pull out of their supports, and P-Delta effects amplify the structural demand to potentially dangerous levels.',
      behaviour: 'Drift depends on the stiffness of the lateral system, the height of the building, the magnitude of the lateral load, and the base fixity. Increasing the stiffness of the lateral system (larger walls, stiffer frames, more braces) reduces drift. Increasing height increases drift approximately as the cube of height for flexurally-dominated behaviour (cantilever walls) and as the square of height for shear-dominated behaviour (braced frames).',
      loadPath: 'Lateral loads travel from the cladding/mass into the diaphragm, then into the lateral-resisting elements (walls, frames, braces), then to the foundation. Drift is the cumulative horizontal movement through this path.',
      equation: 'Inter-storey drift ratio: Δs/hs, where Δs is the relative horizontal displacement between adjacent floors and hs is the storey height. Service wind drift limit: commonly h/400 to h/600 for typical buildings (code and occupancy dependent — not universally specified). Seismic drift limit: typically 0.010hs to 0.020hs under design earthquake (code-specific, significantly larger than service wind limits to allow inelastic deformation).',
      analysis: 'Drift is extracted from analysis results as the difference in horizontal nodal displacement between floor levels. Ensure that P-Delta effects are included if axial loads are significant — P-Delta amplifies drift. For seismic analysis, amplified design drifts (inelastic drifts) are estimated from elastic drifts by multiplying by the deflection amplification factor Cd (ASCE 7) or equivalent.',
      resultInterpretation: 'Service load drift should be compared to the limit appropriate for the cladding and partition system (typically h/400 to h/500 for brittle finishes). Seismic drift is compared to the inelastic drift limit (0.015h to 0.020h for most building systems per ASCE 7), recognising that this represents the maximum expected drift under the design earthquake with significant structural damage acceptable.',
      practice: 'In tall buildings, drift often governs the structural design, requiring larger members or more lateral system stiffness than strength would require alone. This is particularly true for moment frames, which are inherently flexible.',
      designThinking: 'Drift is primarily a stiffness problem. Unlike strength (which can sometimes be increased by adding reinforcement or a cover plate), drift can only be reduced by: adding stiffness (larger members, more walls, adding braces), reducing the building height, or reducing the tributary lateral load (by changing the cladding system). Changing the material does not help unless E is increased.',
      construction: 'During construction, before the full lateral system is in place, intermediate floors may experience excessive drift. Construction phasing should include a check of drift at key stages before full lateral system completion.',
      failureReasoning: 'Excessive drift is typically a serviceability failure (cracked facades, stuck doors, damaged partitions) before a structural failure. However, if drift is very large, P-Delta amplification can cause progressive collapse as gravity loads amplify the sway, which amplifies gravity demands, which increase sway further.',
      failureModes: [
        'Serviceability failure: cladding, partitions, or glazing damaged at drift levels well below structural failure.',
        'P-Delta instability: drift amplifies gravity load effects until equilibrium cannot be maintained; can occur in very flexible structures.',
        'Progressive collapse: lateral failure of one storey increases demand on adjacent storeys, potentially causing cascading failure.'
      ],
      commonMistakes: [
        'Comparing drift to a limit based on span instead of storey height.',
        'Using first-order drift without P-Delta amplification for buildings with significant axial loads.',
        'Applying the wind service limit to seismic demand or vice versa.',
        'Ignoring torsional drift, which adds to translational drift for buildings with asymmetric stiffness plans.'
      ],
      troubleshooting: [
        'Problem: drift exceeds the limit. Increase lateral system stiffness (larger walls, stiffer columns in moment frames, add bracing), reduce the tributary height, or revisit the load model.',
        'Problem: drift is very different between storeys. A soft storey (much more flexible than adjacent storeys) exists — check member sizes and connectivity in that storey.',
        'Problem: drift on one side of the building much larger than the other. Torsional irregularity exists — the centre of stiffness and centre of mass are significantly offset.'
      ],
      practicalQuestion: 'Is this drift a serviceability problem (cladding and finishes), a stability problem (P-Delta), or both — and which limit governs?',
      practicalQuestions: [
        'Is drift checked under service wind (h/400 to h/500 for brittle cladding) and separately under the design earthquake?',
        'Does the most flexible storey have a drift ratio significantly greater than adjacent storeys (soft storey)?',
        'Has torsional amplification of drift been included for asymmetric plan layouts?'
      ],
      related: ['stiffness','p-delta','lateral-system','second-order-effects','diaphragm','shear-wall']
    }
  },

  {
    id: 'second-order-effects',
    title: 'Second-Order Effects',
    category: 'Structural Behaviour',
    domain: 'Structural Behaviour',
    level: 'Advanced',
    levelNum: 2,
    status: 'complete',
    prerequisites: ['p-delta','stability','drift','equilibrium'],
    unlocks: ['p-delta'],
    summary: 'The additional forces and moments that arise because structural geometry changes under load, making the relationship between load and response nonlinear.',
    sections: {
      definition: 'Second-order effects are the additional internal forces and moments that develop because the geometry of the structure changes under loading. First-order analysis assumes the structure remains in its original (undeformed) geometry. Second-order analysis uses the deformed geometry to calculate equilibrium, capturing the additional bending moment produced by axial forces acting through deformations.',
      physical: 'A first-order analysis of a column under combined axial and lateral load calculates the moment at the base from the lateral load alone. A second-order analysis adds the moment from the axial load acting through the column\'s lateral deflection. As the column deflects more (under more load), this additional moment grows, and the column deflects more still — a nonlinear amplification that increases without bound as the load approaches the critical buckling load.',
      behaviour: 'Two types of second-order effects are commonly distinguished. Global (P-Δ): axial loads times storey drift — important for frames with sway. Local (P-δ): axial load in a member times the member\'s own deflection between its ends. Global effects are captured by a P-Delta analysis of the whole structure. Local effects require either analysis of each member as a beam-column or application of code amplification factors.',
      loadPath: 'Second-order effects redistribute moment toward the most deformed (most loaded or most slender) elements. They tend to concentrate demand in elements that are already most stressed, reducing the benefit of load redistribution that first-order analysis might suggest.',
      equation: 'Moment amplification factor for a member: B1 = Cm/(1 − Pu/Pco), where Pu is the applied axial force, Pco is the Euler buckling load for the member, and Cm accounts for the moment gradient. This amplifies the first-order moment to account for P-δ effects. For global sway: B2 = 1/(1 − ΣPu × Δoh/(Vus × L)), which amplifies the sway moments. Note: code-specific formulas vary; these are illustrative of the amplification concept.',
      analysis: 'Second-order analysis is available in most structural analysis software. It iterates on the displaced geometry, applying axial loads to the deformed structure and recalculating equilibrium. The analysis must include realistic stiffness (accounting for cracking in concrete, partial fixity in connections) — an overly stiff model underestimates second-order effects. For seismic design, second-order analysis with the design earthquake displacement is often required by code.',
      resultInterpretation: 'If second-order moments are significantly larger than first-order moments (more than about 15%), the structure is sensitive to stability effects. The stability index Q = ΣPu × Δo/(Vu × L) measures this sensitivity. Q < 0.05: second-order effects negligible. Q = 0.05 to 0.10: amplify first-order moments by 1/(1-Q). Q > 0.10: rigorous second-order analysis required.',
      practice: 'Enable P-Delta analysis as the default setting in any building or frame analysis. The computational cost is minimal and the result is more accurate. Only disable it for simple determinate structures where there is no mechanism for P-Delta amplification.',
      designThinking: 'Second-order effects are more severe in: tall buildings (larger absolute displacements), flexible buildings (larger relative displacements), heavily loaded buildings (large ΣP), and slender members (large local δ). They are less severe in braced, stiff structures. The design strategy for sensitive structures is to increase stiffness rather than strength — increasing member size to reduce δ eliminates the P-delta moment source.',
      construction: 'During construction, P-Delta effects may be more critical than in the completed structure if: temporary lateral bracing is not yet complete, floors are not yet acting as diaphragms, or the construction loads produce large axial forces in columns before the full lateral system is in place.',
      failureReasoning: 'P-Delta instability occurs when the amplification factor becomes very large (when Q approaches 1.0) — the structure can no longer maintain equilibrium in the displaced position under the applied loads. This is the global buckling mode of the building.',
      failureModes: [
        'P-Delta instability: displacement amplification is large enough that the structure cannot return to a stable position; global buckling of the building.',
        'Member amplification leading to capacity exceedance: second-order moments cause a member to exceed its capacity even though first-order analysis shows adequate design.',
        'Sensitive soft storey: one storey has much less stiffness than others; P-Delta effects concentrate in that storey and can cause progressive failure.'
      ],
      commonMistakes: [
        'Performing a first-order analysis of a building with significant sway and using first-order moments for design without amplification.',
        'Including P-Delta in analysis but using the uncracked concrete stiffness, which underestimates second-order effects.',
        'Applying B2 amplification to gravity-only moments that are not affected by sway.'
      ],
      troubleshooting: [
        'Problem: second-order moments are much larger than first-order. Check Q — if large, the lateral system needs more stiffness.',
        'Problem: analysis software P-Delta gives different results depending on number of iterations. Increase the iteration count until convergence is achieved.',
        'Problem: stability check fails even though member strengths are adequate. The global stability index Q is probably too high; add stiffness to the lateral system.'
      ],
      practicalQuestion: 'How much larger are the second-order moments compared to the first-order moments, and does the structure need additional stiffness to control this amplification?',
      practicalQuestions: ['Is P-Delta analysis enabled in this model?','What is the stability index Q for the most critical storey?','Has cracked stiffness been used for concrete in the P-Delta analysis?'],
      related: ['p-delta','stability','drift','buckling','slenderness','lateral-system']
    }
  },


  // ==========================================================================
  // DOMAIN 3 — STRUCTURAL ANALYSIS
  // ==========================================================================

  {
    id: 'determinacy',
    title: 'Structural Determinacy',
    category: 'Structural Analysis',
    domain: 'Structural Analysis',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','support-conditions','free-body-diagram'],
    unlocks: ['sfd-bmd','moment-distribution','continuous-beam','frame'],
    summary: 'The classification of a structure as statically determinate (solvable by equilibrium alone) or indeterminate (requiring compatibility), which fundamentally changes the analysis method and structural behaviour.',
    sections: {
      definition: 'A statically determinate structure has exactly as many independent equilibrium equations as unknown reaction and member forces — the reactions and internal forces can be found using equilibrium alone. A statically indeterminate structure has more unknowns than equilibrium equations; the additional conditions needed are compatibility equations (deformations must be geometrically consistent). The degree of indeterminacy i = total unknowns − number of independent equilibrium equations.',
      physical: 'A simply supported beam (one pin + one roller) has three reaction components against three equilibrium equations: determinate. A fixed-ended beam has four reaction components (Fx, Fy, M at each end minus the axial release) against three equations: indeterminate to the first degree. Every additional support or continuity beyond what is strictly needed for stability introduces an extra degree of indeterminacy.',
      behaviour: 'In a determinate structure, internal forces are independent of member stiffness — you can calculate bending moments without knowing the cross-section dimensions. In an indeterminate structure, the distribution of internal forces depends directly on the relative stiffness of members: stiffer members attract more load. Changing a section size in an indeterminate structure changes the forces in every other member.',
      loadPath: 'Determinate structures have a single load path — remove any member or support and the structure collapses. Indeterminate structures have alternative load paths — they can redistribute internal forces when a member yields or is removed, providing robustness against local failure.',
      equation: 'For a 2D structure: degree of indeterminacy i = r + m + c − 2j, where r = number of reaction components, m = number of members, c = number of conditions (internal hinges, releases), j = number of joints. For simple beams and frames: i = total reactions − 3. For a propped cantilever: i = 4 − 3 = 1. For a fixed-fixed beam: i = 6 − 3 = 3.',
      analysis: 'Determinate structures: solve directly using ΣFx = 0, ΣFy = 0, ΣM = 0. Indeterminate structures require additional equations from compatibility: the force method (compatibility of deformations), the displacement method (equilibrium of displaced joints), or a numerical method (finite elements). Most structural analysis software uses the stiffness method (a form of the displacement method).',
      resultInterpretation: 'In an indeterminate structure, if you change one member\'s stiffness, the forces in all connected members change. This is why the statement "I increased the beam depth so the beam now carries more moment" requires a full re-analysis of the indeterminate structure — the redistribution may reduce moments elsewhere or change which combination governs.',
      practice: 'Classifying the structure as determinate or indeterminate before analysis is essential for choosing the right method, understanding the sensitivity of results to modelling assumptions, and anticipating behaviour. Most real multi-storey buildings are highly indeterminate (dozens of degrees); simple span structures may be determinate.',
      designThinking: 'Indeterminacy provides redundancy (alternative load paths after local failure) and generally reduces maximum moments compared to determinate alternatives, but introduces sensitivity to differential settlement, temperature change, and construction sequence — all of which cause forces in indeterminate structures but not in determinate ones.',
      construction: 'Differential settlement of supports is harmless in a simply supported (determinate) beam — it merely drops one end and the bending moments are unchanged. In a continuous (indeterminate) beam, differential settlement induces additional bending moments that must be designed for. This is why isolating building sections with movement joints (creating local determinacy) is sometimes preferred on variable soil.',
      failureReasoning: 'Determinate structures fail when any single member or connection fails — there is no alternative load path. Indeterminate structures can survive local failure by redistributing forces, provided the remaining members can carry the redistributed demand. Robustness design exploits this property by ensuring sufficient indeterminacy to survive accidental removal of one member.',
      failureModes: [
        'Determinate structure: single member failure = collapse. No redundancy.',
        'Indeterminate structure: progressive redistribution after first yield can be a controlled sequence (ductile) or can overload adjacent members suddenly (brittle).'
      ],
      commonMistakes: [
        'Applying equilibrium equations to find reactions in an indeterminate structure and getting a unique answer — the answer depends on the additional stiffness assumptions, not just equilibrium.',
        'Assuming that adding members or supports always improves the structure — it also increases indeterminacy and introduces sensitivity to settlement and temperature.',
        'Not recognising internal hinges or other releases when counting degrees of indeterminacy.'
      ],
      troubleshooting: [
        'Problem: trying to solve reactions for a continuous beam using equilibrium alone and getting inconsistent equations. The beam is indeterminate; a method of analysis (moment distribution, matrix stiffness) is required.',
        'Problem: analysis gives unexpected force distribution. Check the degree of indeterminacy and confirm that the relative stiffness values in the model are correct.'
      ],
      practicalQuestion: 'Is this structure determinate or indeterminate — and does the analysis method I am using correctly account for that?',
      practicalQuestions: [
        'What is the degree of indeterminacy? Can it be solved by equilibrium alone?',
        'If one support settles, does it induce additional forces that must be designed for?',
        'If I change a member size in this indeterminate structure, will I need to re-analyse to check the new force distribution?'
      ],
      related: ['equilibrium','support-conditions','free-body-diagram','sfd-bmd','continuous-beam','moment-distribution']
    }
  },

  {
    id: 'sfd-bmd',
    title: 'Shear Force and Bending Moment Diagrams',
    category: 'Structural Analysis',
    domain: 'Structural Analysis',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['shear-force','moment','equilibrium','free-body-diagram','support-conditions'],
    unlocks: ['deflected-shape','deflection','curvature','continuous-beam','cantilever'],
    summary: 'Graphical representations of how shear force and bending moment vary along a structural member, providing the complete picture of internal demand needed for design.',
    sections: {
      definition: 'A shear force diagram (SFD) plots the variation of internal shear force V along a member. A bending moment diagram (BMD) plots the variation of internal bending moment M. Together, they provide the complete internal force distribution in a beam under a given loading, from which the critical design locations can be identified.',
      physical: 'The SFD and BMD are the visual record of how a beam transfers load to its supports. At every section, the shear force is the resultant of all transverse forces on one side of the cut; the bending moment is the resultant moment of all forces on one side of the cut. The diagrams show this for every section simultaneously, revealing where demand peaks and where design is most critical.',
      behaviour: 'Three relationships govern the shape of SFD and BMD, derived directly from equilibrium: (1) dV/dx = −w(x): the slope of the shear diagram equals minus the distributed load intensity. A UDL produces a linearly sloping shear diagram. (2) dM/dx = V(x): the slope of the moment diagram equals the shear force. Where shear is zero, moment is at a local extremum. (3) At a concentrated force P, the shear diagram jumps by P. At a concentrated moment M₀, the moment diagram jumps by M₀.',
      loadPath: 'The SFD and BMD make the internal load path visible. Starting from one end with known forces (zero at a free end, the reaction at a support), the diagrams trace exactly how the structure transfers load to the other end. Every feature of the loading appears as a feature of the diagrams: a point load is a jump in V; a UDL is a slope in V and a curve in M.',
      equation: 'Relationships: dV/dx = −w, dM/dx = V. Consequently: change in V over a length = −(area under load diagram). Change in M over a length = (area under shear diagram). For simply supported beam with central point load P, span L: V = +P/2 (left of load), −P/2 (right of load). M at centre = PL/4. For simply supported beam with UDL w: V = wL/2 − wx (linear). M = wLx/2 − wx²/2 (parabolic). M_max = wL²/8 at midspan.',
      analysis: 'Drawing SFD and BMD by hand is the most important skill for developing structural intuition. Procedure: (1) Find all reactions using equilibrium. (2) Start from the left end with V = 0 (free end) or V = reaction (support). (3) Apply the load relationships incrementally across the span. (4) Check: V should return to zero at the right end (for vertical equilibrium). (5) Derive M from V by integration, starting from M = 0 at pin/roller/free end. (6) Check: M should return to zero at the right end if unrestrained.',
      resultInterpretation: 'The BMD immediately reveals: where the maximum sagging moment occurs (governing midspan design), where the maximum hogging moment occurs (governing support design or top reinforcement in RC), and whether the moment distribution matches the assumed support conditions. A BMD that shows large moments at nominally pinned supports indicates that the connections are providing rotational restraint not assumed in the design.',
      practice: 'Before trusting any software output, sketch the expected SFD and BMD shape. If the software result does not match the expected shape qualitatively — same sign distribution, extrema at expected locations — there is an error in the model. Diagrams from software should be interpreted, not simply accepted.',
      designThinking: 'Reading a BMD reveals the physical story of the beam. Large positive moment at midspan: the beam is sagging significantly and the bottom fibres are in high tension. Negative moment at a support: the beam is hogging, the top fibres are in tension, and top reinforcement or the top flange is the critical element. Points of contraflexure (zero crossing of M) are where the moment changes sign and mark the transition from sagging to hogging.',
      construction: 'During construction, loads differ from the service state. Temporary loads (falsework, equipment, ponded concrete) can produce SFD and BMD patterns different from the final design. The construction-stage diagrams must be checked, particularly for prestressed or composite members where construction sequence defines the final stress state.',
      failureReasoning: 'Design based on incorrect SFD/BMD leads directly to under-designed critical sections. The most common error is designing for the maximum moment from a full UDL but not checking the pattern loading case for a continuous beam, which gives higher hogging at interior supports.',
      failureModes: ['Critical section missed: the maximum moment location from the SFD/BMD was not the section designed.','Wrong sign: hogging and sagging mixed up, placing tension reinforcement on the wrong face.'],
      commonMistakes: [
        'Not checking that V returns to zero at the free end — any residual means a load or reaction is missing.',
        'Drawing a linear M diagram under a UDL (should be parabolic) — indicates the slope-of-moment-equals-shear relationship was not applied.',
        'Placing maximum moment at the support for a simply supported beam (should be at midspan for symmetric loading).',
        'Not including self-weight in the load diagram.'
      ],
      troubleshooting: [
        'Problem: V does not return to zero at the end of the span. Sum reactions and loads again — the equilibrium check has an error.',
        'Problem: M is non-zero at a pin support. V must have been non-zero when integrated to M at that point, or the boundary condition M = 0 was not applied.',
        'Problem: diagram looks reasonable but software gives different values. Check units, load direction, and local axis convention.',
        'Problem: large negative moment at a support that was modelled as a pin. The support is inadvertently providing rotational restraint.'
      ],
      practicalQuestion: 'Before looking at the software output, can you sketch the expected shape of the SFD and BMD for this loading, and does the software result match?',
      practicalQuestions: [
        'Is the moment maximum where the shear diagram crosses zero?',
        'Is the moment diagram parabolic under a UDL and linear between point loads?',
        'Does the moment return to zero at every pinned support and free end?',
        'For a continuous beam, have I checked pattern loading to find the maximum support hogging moment?'
      ],
      related: ['shear-force','moment','deflected-shape','curvature','deflection','cantilever','continuous-beam','determinacy']
    }
  },

  {
    id: 'deflected-shape',
    title: 'Deflected Shape',
    category: 'Structural Analysis',
    domain: 'Structural Analysis',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['curvature','moment','sfd-bmd','support-conditions'],
    unlocks: ['deflection'],
    summary: 'The deformed profile of a structural member under loading, which can be sketched qualitatively from the bending moment diagram and serves as a fundamental quality check on analysis results.',
    sections: {
      definition: 'The deflected shape is the deformed geometry of a structural member or system under applied loading. In elastic beam theory, the curvature at any section is proportional to the bending moment divided by the flexural stiffness (κ = M/EI). The deflected shape is therefore the graphical integral of the curvature distribution — it follows directly from the bending moment diagram.',
      physical: 'Where the bending moment is positive (sagging), the member curves concave upward — the bottom fibres are in tension and the member sags. Where the bending moment is negative (hogging), the member curves concave downward — the top fibres are in tension and the member hogs. Points of zero moment (contraflexure points) are inflection points where the curvature reverses direction. Pinned and roller supports allow rotation — the member enters the support at an angle, not horizontally. Fixed supports prevent both translation and rotation — the member is horizontal at the support.',
      behaviour: 'The deflected shape carries qualitative information that complements the BMD. A simply supported beam under central point load: sags symmetrically, maximum deflection at midspan, horizontal tangent at midspan, slopes away from midspan to both supports. A fixed-ended beam under UDL: hogging at both ends (negative moment), sagging at midspan (positive moment), two inflection points approximately at L/4 from each end. Horizontal at both fixed ends. A cantilever under tip load: pure sagging, steepest slope at the fixed end, maximum deflection at the tip.',
      loadPath: 'The deflected shape confirms the load path by showing where deformation is concentrated. A stiff element deflects little; a flexible element deflects a lot. In an indeterminate structure, the deflected shape shows which elements are attracting more force (the stiffer, less deformed elements).',
      equation: 'Relationship: κ = d²v/dx² = M(x)/(EI). Integration once gives slope θ = dv/dx; integration again gives deflection v. Boundary conditions: fixed end: v = 0 and θ = 0. Pin or roller: v = 0, θ ≠ 0. Free end: v ≠ 0, θ ≠ 0. Internal hinge: v is continuous (deformation is compatible), but θ may be discontinuous (slope can change suddenly).',
      analysis: 'The deflected shape output from analysis software should be checked qualitatively before any numbers are read. It should show: curvature matching the moment diagram sign, zero deflection at all support restraints, zero slope at all rotation restraints, and sensible relative magnitudes of deformation. A deflected shape that violates any of these conditions indicates a modelling error.',
      resultInterpretation: 'If the deflected shape from software shows: zero slope at a nominally pinned support — the rotation DOF is inadvertently restrained. Non-zero deflection at a support — the vertical DOF is not restrained. Wrong sign of curvature compared to the moment diagram — a sign convention or local axis issue. Excessive deformation in one member and very little in adjacent members — a stiffness anomaly.',
      practice: 'Sketch the expected deflected shape before running the analysis. This takes 30 seconds and immediately reveals whether the model output is plausible. Engineers who cannot sketch the expected deflected shape before running analysis do not yet have sufficient understanding of the model to trust its output.',
      designThinking: 'The deflected shape is a physical argument about what the structure is doing. A connection detail that expects zero rotation (a fixed end) but actually allows rotation (because the detail is flexible) will produce a deflected shape that reveals the discrepancy: the "fixed" end will show a non-zero slope in reality, and the actual bending moment distribution will differ from the design assumption.',
      construction: 'Pre-cambering a steel beam means intentionally introducing an upward deflected shape during fabrication, equal and opposite to the expected dead load deflection, so that after loading the beam is approximately level. The pre-camber is a designed initial deflected shape — it subtracts from the dead load deflected shape to give the net final shape.',
      failureReasoning: 'Misinterpreting the deflected shape leads to incorrect understanding of the deformation mechanism. This matters when checking whether beams are contacting adjacent elements (cladding, partitions, services) under deflection, and when assessing whether P-Delta effects are significant.',
      failureModes: ['Unexpected contact between deflected beam and adjacent element due to larger deflection than anticipated.','Deflected shape reveals hinge formation (infinite curvature at one point) indicating imminent mechanism.'],
      commonMistakes: [
        'Drawing a smooth continuous deflected shape for a structure with an internal hinge — the slope may be discontinuous at the hinge.',
        'Drawing a horizontal tangent at a pin support — pin supports allow rotation; only fixed supports require horizontal tangent.',
        'Drawing the deflected shape consistent with the loads but not checking it against the moment diagram.'
      ],
      troubleshooting: [
        'Problem: software deflected shape shows non-zero slope at a fixed end. Check that the rotational DOF at that node is restrained.',
        'Problem: deflected shape curves opposite to the moment diagram at a section. Check local axis orientation and moment sign convention.'
      ],
      practicalQuestion: 'Does the deflected shape from the analysis match the expected curvature pattern from the moment diagram, with correct boundary conditions at every support?',
      practicalQuestions: [
        'Is the deflected shape concave up (sagging) where the moment is positive and concave down (hogging) where it is negative?',
        'Are all restraints (zero deflection, zero slope) correctly shown at their support locations?',
        'Is the maximum deflection at the location I expected from the loading pattern?'
      ],
      related: ['curvature','moment','sfd-bmd','deflection','support-conditions','continuous-beam','cantilever']
    }
  },

  {
    id: 'moment-distribution',
    title: 'Moment Distribution Method',
    category: 'Structural Analysis',
    domain: 'Structural Analysis',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['determinacy','moment','stiffness','support-conditions'],
    unlocks: ['continuous-beam','frame'],
    summary: 'A hand method for analysing statically indeterminate beams and frames by iteratively distributing unbalanced moments at joints until equilibrium is reached, building physical intuition for how stiffness governs load distribution.',
    sections: {
      definition: 'The moment distribution method is an iterative procedure for analysing indeterminate beams and frames, developed by Hardy Cross in 1930. It distributes unbalanced fixed-end moments at joints to adjacent members in proportion to their relative rotational stiffness, carries over a fraction to the far ends, and repeats until equilibrium is satisfied. It directly reveals how stiffness controls moment distribution.',
      physical: 'Fix all joints. Apply loads — fixed-end moments develop in all members. Now release the joints one at a time: each joint is initially out of moment equilibrium (the sum of fixed-end moments from all meeting members is non-zero). To restore equilibrium, distribute the unbalanced moment to the meeting members in proportion to their relative stiffness. Part of this distribution carries over to the far ends. Repeat until the distributed moments are negligibly small. The sum of all moments at each end gives the final end moments.',
      behaviour: 'Stiffer members attract more of any distributed moment. At a joint where a stiff member and a flexible member meet, the stiff member absorbs more of the unbalanced moment. At a fixed end, no moment is distributed further — it stays. At a pinned end, the full carry-over moment is released. These physical observations directly reflect how real structures distribute load: stiffness governs.',
      loadPath: 'Moment distribution traces the flow of moment through a frame, joint by joint. The final moment diagram shows where moment accumulates (at stiff ends, at stiff members) and where it is relieved (at flexible or pinned ends). This is the literal distribution of the moment load path through the structure.',
      equation: 'Distribution factor: DF = K_member / ΣK_joint, where K = EI/L for a far-end fixed member, K = (3/4)EI/L for a far-end pinned member. ΣK_joint is the sum of stiffness of all members meeting at the joint. Carry-over factor: 0.5 for far-end fixed, 0 for far-end pinned. Fixed-end moments (FEM): for UDL w on span L with both ends fixed: FEM = ±wL²/12. For central point load P: FEM = ±PL/8.',
      analysis: 'Moment distribution converges rapidly for typical frames. Two to four cycles usually give results within 1% of the exact answer. The method is particularly useful for continuous beams (a column line in a building) and single-storey portal frames. It is less practical for multi-storey sway frames (where separate sway analysis is needed) or structures with many members.',
      resultInterpretation: 'After moment distribution, sketch the BMD from the final end moments and applied loads. The distribution of moments between spans of a continuous beam reveals the effect of relative span and stiffness. A short stiff span will attract more moment than a long flexible span under the same distributed load — the distribution factors capture this directly.',
      practice: 'Even when using analysis software, working through a moment distribution calculation by hand for a simple case (a two-span continuous beam, a simple portal frame) gives direct physical insight into how stiffness governs the moment distribution. This understanding cannot be obtained from software output alone.',
      designThinking: 'The distribution factor is the ratio of a member\'s stiffness to the total stiffness at a joint. If you double the stiffness of one member at a joint, it attracts more of the moment at that joint at the expense of the others. This is the hand-method demonstration of the principle that stiffer elements attract more load in an indeterminate structure.',
      construction: 'If construction changes the support condition at a point — for example, temporary propping or early removal of formwork — the fixed-end moments change and the moment distribution converges to a different result. Staging effects in concrete construction must be captured by separate analyses at each stage.',
      failureReasoning: 'The moment distribution method assumes elastic behaviour throughout — if yielding occurs at one location, the stiffness changes and the distribution is altered. In plastic design, the method can be adapted (by setting a plastic hinge moment at a yielded section and continuing the distribution), but standard moment distribution is an elastic method.',
      failureModes: ['Non-convergence if sign errors are made in the distribution — check by verifying moment equilibrium at every joint after the analysis.'],
      commonMistakes: [
        'Using K = EI/L for a far-end pinned member instead of K = (3/4)EI/L, which overestimates the stiffness of that member.',
        'Forgetting that the carry-over factor is zero to a far-end pin.',
        'Getting the sign of fixed-end moments wrong — positive convention for clockwise or anticlockwise must be consistent throughout.',
        'Applying moment distribution to a sway frame without a separate sway correction.'
      ],
      troubleshooting: [
        'Problem: moments at a joint do not sum to zero after convergence. Check sign conventions and verify that all members at the joint have been included.',
        'Problem: carry-over moments seem too large. Check whether the far-end condition is fixed (carry-over = 0.5) or pinned (carry-over = 0).',
        'Problem: results differ from software. Check whether the software is using the same support conditions, stiffness values, and load inputs as the hand calculation.'
      ],
      practicalQuestion: 'At each joint in this structure, which member is stiffest and therefore attracts the most moment — and does the analysis output confirm this?',
      practicalQuestions: [
        'Are the distribution factors at each joint consistent with the relative member stiffness (EI/L)?',
        'Have I used the modified stiffness (3EI/4L) for members with far-end pinned?',
        'After convergence, does the sum of moments at each joint equal zero?'
      ],
      related: ['determinacy','stiffness','moment','continuous-beam','frame','sfd-bmd']
    }
  },

  // ==========================================================================
  // DOMAIN 4 — STRUCTURAL SYSTEMS
  // ==========================================================================

  {
    id: 'load-path',
    title: 'Load Path',
    category: 'Structural Systems',
    domain: 'Structural Systems',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','force'],
    unlocks: ['diaphragm','lateral-system','beam','column','slab','shear-wall','foundation'],
    summary: 'The continuous route by which actions are transferred through structural elements to the ground.',
    sections: {
      definition: 'A load path describes how applied actions travel from their point of application through connected structural components to the foundations and supporting ground.',
      physical: 'For gravity loading, a typical path is slab → beam → column/wall → foundation → soil. Lateral loading follows a different system involving diaphragms and lateral-resisting elements.',
      behaviour: 'Every action needs a continuous and physically realistic path through the structural system.',
      loadPath: 'The concept itself represents the complete route from applied action to supporting ground.',
      equation: 'There is no single universal equation; the principle is equilibrium and compatible force transfer through connected members.',
      analysis: 'Analysis results should be interpreted by tracing forces from their origin through the structural system.',
      resultInterpretation: 'Unexpected force concentrations, reactions, or deformations often become easier to understand when the load path is traced.',
      practice: 'Before trusting an analysis model, be able to explain the expected load path. Discontinuities, transfer levels, weak connections, and missing stiffness can produce major unintended behaviour.',
      designThinking: 'Always ask: where does the load enter, where does it go, and what element carries it at every stage?',
      construction: 'The designed load path must actually exist in the constructed structure through proper connections and continuity.',
      failureReasoning: 'A broken or weak load path can cause unexpected load redistribution and local or global failure.',
      failureModes: ['Transfer failure','Connection failure','Discontinuity','Weak storey','Progressive failure'],
      commonMistakes: ['Ignoring secondary load paths','Ignoring connections','Assuming walls or slabs automatically transfer loads','Ignoring transfer levels'],
      troubleshooting: ['Start at the applied load','Trace each supporting element','Check connections','Check reactions','Check foundations'],
      practicalQuestion: 'Can I physically draw the route this load takes from where it is applied all the way to the ground?',
      practicalQuestions: ['Is there a complete, continuous path from the applied load to the foundation?','Are all connections capable of transferring the forces implied by the load path?'],
      related: ['diaphragm','beam','column','slab','shear-wall','foundation','lateral-system','equilibrium']
    }
  },

  {
    id: 'diaphragm',
    title: 'Diaphragm',
    category: 'Structural Systems',
    domain: 'Structural Systems',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['load-path','shear-force','stiffness'],
    unlocks: ['lateral-system','drift','shear-wall'],
    summary: 'A structural floor or roof system that transfers in-plane actions to vertical lateral-resisting elements.',
    sections: {
      definition: 'A diaphragm acts primarily in its plane to distribute and transfer lateral forces between the mass of a floor or roof and the vertical elements resisting those forces.',
      physical: 'During lateral loading, the diaphragm helps coordinate the response of frames, walls, and other vertical elements.',
      behaviour: 'Diaphragm stiffness influences how lateral forces are distributed between vertical resisting elements.',
      loadPath: 'Lateral inertia forces enter the diaphragm and are transferred toward frames, walls, or other lateral-resisting elements.',
      equation: 'The exact force distribution depends on diaphragm stiffness, geometry, connectivity, and the analysis model.',
      analysis: 'Analysis models may represent diaphragms as rigid, semi-rigid, flexible, or through explicit structural elements depending on the modelling approach.',
      resultInterpretation: 'Unexpected diaphragm forces or building torsion should trigger investigation of stiffness, geometry, openings, and vertical element arrangement.',
      practice: 'Do not select rigid or flexible diaphragm assumptions mechanically. Consider actual construction, relative stiffness, openings, collectors, chords, and the requirements of the adopted standard.',
      designThinking: 'Understand how the diaphragm connects the mass of the building to the lateral-resisting system.',
      construction: 'Connections, slab continuity, joints, openings, collectors, chords, and construction sequencing influence diaphragm behaviour.',
      failureReasoning: 'Diaphragm problems can occur through inadequate strength, insufficient connectivity, excessive deformation, or discontinuity.',
      failureModes: ['Diaphragm shear failure','Chord failure','Collector failure','Connection failure','Excessive deformation'],
      commonMistakes: ['Automatically assuming rigid diaphragm behaviour','Ignoring openings','Ignoring collectors','Ignoring diaphragm connections'],
      troubleshooting: ['Check diaphragm assumption','Check openings','Check connectivity','Check lateral elements','Check torsional response'],
      practicalQuestion: 'How does the floor or roof actually transfer lateral force to the walls and frames?',
      practicalQuestions: ['Is this diaphragm rigid, semi-rigid, or flexible relative to the lateral system?','Are large openings interrupting the in-plane shear path?'],
      related: ['shear-wall','lateral-system','drift','load-path','torsion','slab']
    }
  },

  {
    id: 'lateral-system',
    title: 'Lateral Load-Resisting System',
    category: 'Structural Systems',
    domain: 'Structural Systems',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['load-path','diaphragm','stiffness','drift'],
    unlocks: ['shear-wall','drift','p-delta','second-order-effects'],
    summary: 'The structural subsystem responsible for resisting lateral forces from wind and seismic loading and controlling inter-storey drift.',
    sections: {
      definition: 'The lateral load-resisting system (LLRS) is the collection of structural elements — shear walls, moment frames, braced frames, cores, or combinations — that transfer horizontal forces from the diaphragms to the foundation. Every building must have an identifiable LLRS capable of carrying wind and seismic lateral load.',
      physical: 'Wind and earthquake generate horizontal forces at each floor level. Without a lateral system, these forces would cause the building to slide or overturn. The LLRS intercepts these forces at each floor through the diaphragm and transfers them down to the foundation as shear and overturning moment.',
      behaviour: 'Three main types exist. Moment frames: rigidity comes from beam-column joint stiffness; inherently flexible; good for architectural openness but uses large sections to control drift. Shear walls and core walls: very stiff in-plane; excellent drift control; concentrate forces into the foundation; interrupt floor plans. Braced frames: diagonal members carry lateral force as axial tension/compression; stiff; efficient material use; interrupts plan openness like walls.',
      loadPath: 'Lateral load path: cladding/mass → floor diaphragm → collectors → lateral-resisting elements (walls/frames/braces) → foundation → soil. Each link in this chain must be designed for the force it carries. The diaphragm-to-LLRS connection (collector/drag strut) is often overlooked but can be critical.',
      equation: 'In a simple one-storey building with multiple walls, lateral force is distributed to walls in proportion to their lateral stiffness: F_i = (k_i / Σk) × F_total. For walls, lateral stiffness k ≈ EI_wall/H³ (flexural) + GA_wall/H (shear), depending on aspect ratio. Torsional amplification: when the centre of mass and centre of rigidity are offset, additional torsional forces develop in the walls.',
      analysis: 'Analysis requires the complete lateral system to be modelled including diaphragm connections, wall foundations, and second-order effects. The distribution of lateral force between walls or frames depends critically on their relative stiffness — incorrect stiffness modelling (e.g. uncracked vs cracked concrete) directly changes the force distribution.',
      resultInterpretation: 'The wall or frame attracting the most shear is not necessarily the most critical — it may be the most critical in overturning, or another element may be critical in drift. Always check: storey shear in each element, overturning moment at the base, foundation demands, inter-storey drift, and torsional response.',
      practice: 'The lateral system must be identified before analysis. Load does not know it should go to the LLRS unless the structural system actually provides a continuous path. If a shear wall is interrupted at a storey — by an architectural opening or a transfer structure — the load path must be explicitly redirected through alternative members.',
      designThinking: 'The choice of lateral system determines the architectural plan, the connection details, the foundation demands, and the seismic performance. Shear walls are stiff and economical but impose planning constraints. Moment frames allow open plans but are expensive (large members, moment connections) and flexible (high drift). Dual systems use both, with the moment frame providing redundancy if the walls are damaged.',
      construction: 'During construction, before the full lateral system is complete, the partially erected building must resist construction wind loads and any seismic events. Temporary bracing or phased erection sequences must be planned so that a lateral system exists at every construction stage.',
      failureReasoning: 'Lateral system failures typically involve: missing collector between diaphragm and wall, torsional amplification due to asymmetric stiffness plan, soft storey (much more flexible than adjacent storeys), inadequate foundation for overturning demand, or excessive drift causing P-Delta instability.',
      failureModes: ['Soft storey: sudden concentration of drift at a flexible storey, potentially causing collapse.','Torsional failure: asymmetric stiffness causes excessive rotation and amplified drift at the perimeter.','Diaphragm-to-wall connection failure: shear cannot be transferred into the lateral element.','Foundation overturning: wall rocks on its foundation; stiffness is reduced, drift increases.'],
      commonMistakes: ['Not identifying the lateral system before analysis.','Assuming all walls and columns contribute to the lateral system equally.','Ignoring torsional effects when the plan is not symmetric.','Failing to design the diaphragm collectors connecting the floor to the walls.'],
      troubleshooting: ['Problem: excessive drift. Is the lateral system identified and modelled correctly? Check wall stiffness, connections to diaphragm, and foundation fixity.','Problem: one wall carries much more shear than expected. Check relative stiffness and plan symmetry — torsion may be adding to translational demand.'],
      practicalQuestion: 'Have you identified every element of the lateral-load-resisting system, and does the load path from applied force to foundation exist continuously through each one?',
      practicalQuestions: ['Is the lateral system clearly identified and does it have a continuous path to the foundation?','Has torsional amplification been checked for plan-asymmetric layouts?','Are collectors between diaphragms and lateral elements designed?'],
      related: ['diaphragm','shear-wall','drift','stiffness','p-delta','load-path','foundation']
    }
  },

  // ==========================================================================
  // DOMAIN 5 — LOADS & ACTIONS
  // ==========================================================================

  {
    id: 'load',
    title: 'Structural Load',
    category: 'Loads & Actions',
    domain: 'Loads & Actions',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['equilibrium','force'],
    unlocks: ['dead-load','live-load','wind-load','seismic-load','load-combination'],
    summary: 'An applied action that produces forces, moments, stresses, strains, or deformation in a structure.',
    sections: {
      definition: 'Structural loads/actions include permanent, variable, environmental, accidental, and other effects relevant to a project.',
      physical: 'Loads enter the structure at different locations and travel through the structural system to the supports and ground.',
      behaviour: 'Different load types produce different structural responses and may govern different members or limit states.',
      loadPath: 'Every load must have a continuous path from its point of application to the supporting ground.',
      equation: 'The appropriate load model and combinations depend on the project, hazard, occupancy, and governing standards.',
      analysis: 'Analysis software applies loads through load cases and combinations and calculates resulting structural actions.',
      resultInterpretation: 'Before interpreting an analysis result, confirm that the load magnitude, location, direction, pattern, and combination are correct.',
      practice: 'A good load assessment begins with the physical project: what exists, what will be occupied, what can move, what can fall, and what environmental actions are plausible.',
      designThinking: 'Load assessment should begin from physical reality rather than starting with numbers in the analysis software.',
      construction: 'Construction loads can differ substantially from final design loads and may create temporary critical conditions.',
      failureReasoning: 'Incorrect load assumptions can lead to either unsafe underestimation or uneconomic overdesign.',
      failureModes: ['Underestimated loading','Incorrect load combination','Incorrect load distribution','Unconsidered accidental load'],
      commonMistakes: ['Wrong units','Missing self-weight','Incorrect load combinations','Ignoring construction loads'],
      troubleshooting: ['Check load source','Check magnitude','Check direction','Check application area','Check load combinations'],
      practicalQuestion: 'What real physical action does this load represent, and is the way I applied it consistent with the actual structure?',
      practicalQuestions: ['Have I included all load types: dead, live, wind, seismic?','Is self-weight included for every structural element?'],
      related: ['dead-load','live-load','wind-load','seismic-load','load-combination','load-path']
    }
  },

  {
    id: 'dead-load',
    title: 'Dead Load',
    category: 'Loads & Actions',
    domain: 'Loads & Actions',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['load','equilibrium'],
    unlocks: ['load-combination'],
    summary: 'Permanent actions acting on a structure throughout its life — self-weight of structural elements and non-structural superimposed permanent loads.',
    sections: {
      definition: 'Dead load consists of all permanent loads acting on the structure: the self-weight of structural members (calculated from unit weight × volume), and superimposed dead load (SDL) — permanent non-structural items such as finishes, screed, raised floors, permanent partitions, facade systems, building services (mechanical, electrical, plumbing), and waterproofing.',
      physical: 'Every kilogram of structural material must be carried to the ground. A 200 mm concrete slab has a self-weight of approximately 4.8 kPa (200 mm × 24 kN/m³). A 75 mm screed adds about 1.75 kPa. A suspended ceiling and services add another 0.5–1.0 kPa. These accumulate floor by floor to the foundation. On a 20-storey building, the lower columns and walls carry an axial load that represents more than 20 floors of dead load.',
      behaviour: 'Dead load is permanent — it acts continuously throughout the life of the structure. Unlike live loads, dead loads do not vary in time (or vary very slowly and predictably, as in creep). In design codes, dead load has a load factor less than live load because its magnitude is known with greater certainty (lower variability). Typical load factors: DL = 1.2–1.4, LL = 1.6.',
      loadPath: 'Dead load is the first load to arrive on the structure and follows the gravity load path: slab → beam → column/wall → foundation → ground. In multi-storey structures, columns at lower levels carry the accumulated dead load from all floors above plus their own self-weight.',
      equation: 'Self-weight: G = unit weight γ × cross-sectional area A × length L (for members), or γ × thickness t × plan area (for slabs). Typical unit weights: reinforced concrete = 24–25 kN/m³, steel = 77–78 kN/m³, timber = 4–10 kN/m³ depending on species, masonry = 18–22 kN/m³. Superimposed dead load: typically 1.0–3.0 kPa depending on finishes and services.',
      analysis: 'Self-weight is often automatically calculated by analysis software if section and material properties are correctly defined. Always verify that self-weight is enabled and that unit weights are correct. Superimposed dead load must be entered manually as an area or line load on the appropriate elements.',
      resultInterpretation: 'A load takedown — summing dead loads floor by floor from top to bottom — is an essential manual check on the total gravity load on the foundation. If the foundation reaction from analysis does not match the load takedown total, there is a missing load or a connectivity error in the model.',
      practice: 'Quantify all permanent loads in a schedule before beginning analysis. Include: structural self-weight (calculated from geometry), floor finishes, ceiling systems, facades, and any permanently fixed equipment. Do not forget the weight of wet concrete during construction if this is a critical load case.',
      designThinking: 'Dead load is the load that is always there and cannot be avoided. It defines the baseline axial force in every column and the permanent component of every beam moment. In foundation design, the permanent dead load is the restoring force that resists overturning and uplift under lateral loading.',
      construction: 'Wet concrete during casting is a construction dead load — denser than hardened concrete (approximately 24 kN/m³ for fresh concrete versus 24–25 kN/m³ when hardened) and acting before the permanent structural system is in place. Falsework and formwork must be designed for this construction dead load.',
      failureReasoning: 'Underestimating dead load leads to under-designed members and foundations. Common errors include omitting facade loads, underestimating screed thickness, or forgetting the weight of services. In roof design, underestimating dead load can make the difference between uplift and no-uplift under wind, changing whether tie-down anchors are required.',
      failureModes: ['Under-designed column or foundation due to missing dead load in the accumulation.','Uplift failure of a roof connection where dead load was underestimated and wind uplift governs.'],
      commonMistakes: ['Forgetting superimposed dead load (finishes, services) and using only structural self-weight.','Using incorrect unit weights for the construction material.','Applying dead load to the wrong element (e.g. facade load assigned to an internal column).'],
      troubleshooting: ['Problem: foundation reactions are less than expected. Do a load takedown and compare to the foundation reaction — missing loads are revealed by the discrepancy.','Problem: beam spans more than expected. Check whether self-weight has been included, and whether SDL (screed, finishes) was added.'],
      practicalQuestion: 'Have you prepared a complete dead load schedule listing every permanent load source — structural self-weight, finishes, services, facade — before entering anything into the analysis?',
      practicalQuestions: ['Is self-weight calculation enabled in the analysis software?','Have all superimposed dead loads (finishes, services, facades) been included?','Does the sum of reactions match the total dead load from a manual load takedown?'],
      related: ['load','live-load','load-combination','load-path','foundation','column']
    }
  },

  {
    id: 'live-load',
    title: 'Live Load',
    category: 'Loads & Actions',
    domain: 'Loads & Actions',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['load','dead-load'],
    unlocks: ['load-combination'],
    summary: 'Variable occupancy loads from people, furniture, and movable equipment, whose magnitude and position vary during the structure\'s life.',
    sections: {
      definition: 'Live loads (also called imposed loads or variable actions) are loads associated with the intended occupancy of a space: people, furniture, movable equipment, vehicles, and stored materials. Unlike dead load, live load varies in magnitude and position over the life of the structure. Design codes specify characteristic live loads (statistical upper bounds) by occupancy category.',
      physical: 'An office floor at full occupancy under a meeting might carry 3.5 kPa. The same floor at night might carry 0.1 kPa. The live load fluctuates. The design code value (2.5–4.0 kPa for offices in most codes) represents an extreme value that is unlikely to be exceeded during the structure\'s life, calibrated to an appropriate return period.',
      behaviour: 'Live loads can be positioned anywhere within an occupancy area. For design of continuous beams, the critical case is pattern loading — placing live load on spans that maximise the effect of interest (maximum sagging at midspan: load adjacent spans; maximum hogging at support: load adjacent spans on one side only). Applying full live load to all spans simultaneously is often not the worst case for support moments.',
      loadPath: 'Live loads on floors travel the same gravity path as dead load: slab → beam → column/wall → foundation. However, the distribution of live load over different spans and the pattern loading cases change the critical member forces compared to dead load, which is uniformly present.',
      equation: 'Characteristic live loads (indicative — code-specific values always govern): offices = 2.5–4.0 kPa, residential = 1.5–2.0 kPa, assembly areas = 3.0–5.0 kPa, retail/commercial = 4.0–5.0 kPa, storage = 5.0 kPa minimum (often much higher depending on stored material), car parks = 2.5 kPa (light vehicles). Area reduction factor: for large tributary areas, the probability that all areas are simultaneously at maximum live load is lower — codes allow reduction of the design live load by up to 40–60% for large areas.',
      analysis: 'Apply live load as a separate load case from dead load. For continuous beams, run multiple live load pattern cases (skip loading) to find maximum support and span moments separately. Do not combine pattern cases — each pattern is an independent load case that is then combined with dead load in a load combination.',
      resultInterpretation: 'The governing moment for span design is typically dead load (full span) + live load (checked span only). The governing moment for support design is typically dead load (full) + live load (adjacent spans loaded, checked span unloaded). A single full-span analysis with combined dead and live gives neither maximum accurately for continuous beams.',
      practice: 'Always run pattern live load cases for continuous structures. The maximum span moment and maximum support moment occur under different live load patterns and must both be checked. The difference between a full-span analysis and a correct pattern-load analysis can be significant for interior supports of continuous beams.',
      designThinking: 'Live load is the load that makes the structure earn its purpose. The design code values are conservative statistical estimates. In practice, most floors never approach the design live load during their life. Nonetheless, the code value must be used for design because extreme occupancy scenarios (overcrowding, storage changes) can and do occur.',
      construction: 'Construction loads (workers, equipment, formwork, stored materials) are construction live loads. They are not the same as the design occupancy live load and may be larger for some elements during construction. Construction loads must be verified against the temporary structure capacity.',
      failureReasoning: 'Incorrect live load leads to under-designed spans or supports. A common error is using uniform live load on all spans of a continuous beam when pattern loading was needed — the maximum support moment under pattern loading can be 10–25% higher than under uniform loading.',
      failureModes: ['Pattern loading not checked: maximum support hogging underestimated.','Area reduction incorrectly applied: live load underestimated on large tributary areas.'],
      commonMistakes: ['Applying live load to all spans simultaneously without checking skip loading patterns.','Using the wrong occupancy category — residential (1.5 kPa) instead of assembly (5.0 kPa) for the same floor.','Ignoring construction live loads during the construction phase analysis.'],
      troubleshooting: ['Problem: beam passes full-span check but fails in service. Pattern loading may not have been checked — the maximum span moment or support moment may occur under partial live load.'],
      practicalQuestion: 'Have I checked pattern loading (skip loading) cases for this continuous structure to find both the maximum span moment and the maximum support moment?',
      practicalQuestions: ['Which occupancy category applies, and what is the code characteristic live load for that category?','Have I checked pattern live load cases for this continuous beam?','Is an area reduction factor applicable?'],
      related: ['load','dead-load','load-combination','sfd-bmd','continuous-beam']
    }
  },

  {
    id: 'wind-load',
    title: 'Wind Load',
    category: 'Loads & Actions',
    domain: 'Loads & Actions',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['load','lateral-system'],
    unlocks: ['load-combination','lateral-system'],
    summary: 'Dynamic pressure from wind converted into equivalent static forces on exposed structural surfaces, including positive pressure on windward faces and suction on leeward and roof surfaces.',
    sections: {
      definition: 'Wind load is the force exerted by moving air on exposed structural surfaces. It is primarily a lateral load on buildings. Wind creates positive pressure (pushing) on windward surfaces and negative pressure (suction) on leeward surfaces, side faces, and most roof surfaces. The net lateral force on the building is the sum of windward pressure and leeward suction.',
      physical: 'Wind speed varies with height (boundary layer effect), with terrain roughness, and with return period. The design wind speed represents a statistical extreme (typically 50-year or 700-year return period depending on the code). Wind velocity pressure is q = ½ρv², where ρ is air density (≈ 1.2 kg/m³) and v is wind speed. Pressure on a surface is q × Cp, where Cp is a pressure coefficient that depends on the building geometry and the surface location (windward face, leeward face, roof).',
      behaviour: 'On a typical rectangular building: windward wall Cp ≈ +0.8 (positive, inward pressure); leeward wall Cp ≈ −0.5 (negative, suction outward); side walls Cp ≈ −0.7 (suction); flat roof Cp ≈ −0.9 at the edges, −0.5 over most of the area (uplift on roof). Net lateral force per unit height of the building ≈ q × (Cp_windward − Cp_leeward) × B, where B is the width of the building in the wind direction.',
      loadPath: 'Wind load path: wind pressure on cladding → cladding to fixing → fixing to floor diaphragm → diaphragm to lateral system → foundation → soil. The cladding system must be designed for local wind pressures (often higher than the average for large areas). The lateral system carries the total wind force.',
      equation: 'Velocity pressure: q = ½ρv² (fundamental). Design wind load on a surface: w = q × Ce × Cg × Cp (code-specific coefficients for exposure, gusts, pressure). Net lateral force: F = q × (Cp_windward + |Cp_leeward|) × projected area. These are general concepts — actual coefficients and procedures depend entirely on the applicable code (ASCE 7, AS/NZS 1170.2, Eurocode EN 1991-1-4, etc.).',
      analysis: 'Wind is applied as pressure on exposed surfaces and then transferred to the structure. In a typical building analysis, the wind pressure is converted to floor-level lateral forces at each floor diaphragm level. These floor forces are calculated from the tributary height of cladding at each floor and the design wind pressure at that height.',
      resultInterpretation: 'Wind load results in lateral forces, inter-storey drift, overturning moments at the base, and potentially uplift on roof elements and tension in windward columns. Check all four. For tall buildings, dynamic wind effects (gust factor, wind-induced vibration) may need to be checked against acceleration limits for occupant comfort, not just structural strength.',
      practice: 'Determine the governing wind direction — it is not always the direction normal to the largest facade. Oblique wind can produce higher torsional effects. Apply wind in the four principal directions (North, South, East, West) and all code-required combinations. Do not forget internal pressure, which acts simultaneously with external pressure and can govern the design of cladding panels and roof elements.',
      designThinking: 'Wind load is a probabilistic event. The design wind speed corresponds to an extreme event with a specified return period. The probability of this event occurring during the building\'s life depends on the return period and building lifespan. Structures in high-wind zones (cyclone/hurricane regions) may have design wind speeds two to three times those in sheltered urban locations.',
      construction: 'Under-constructed buildings are exposed to wind before the permanent cladding and connections are in place. The partially constructed frame has less mass (lower seismic demand) but also potentially less lateral resistance. Temporary bracing must provide the lateral resistance needed for construction-stage wind.',
      failureReasoning: 'Wind failures are most commonly failures of the load path from cladding to structure: inadequate fixings, connection failures, inadequate capacity of collectors between diaphragm and lateral system. Progressive failures start when one cladding panel fails, wind enters the building (internal pressure increases), and subsequent panel failures cascade.',
      failureModes: ['Cladding failure: pressure on cladding panels exceeds fixing capacity.','Lateral drift failure: excessive drift under design wind damages non-structural elements.','Overturning: insufficient dead load to resist overturning moment from wind on a lightly loaded structure.','Uplift failure: roof membrane or roofing components lifted by suction in the absence of adequate fasteners.'],
      commonMistakes: ['Applying wind load only in one direction and missing the critical combination.','Ignoring internal pressure on partially enclosed buildings.','Not checking roof uplift separately from lateral wall forces.','Using average pressure coefficients for cladding design when local peak pressures at edges and corners are much higher.'],
      troubleshooting: ['Problem: wind drifts exceed limit. The lateral system is insufficient — increase stiffness.','Problem: roof connection in tension under wind. Uplift from wind exceeds restoring dead load — add holddown connections or increase roof dead load.'],
      practicalQuestion: 'Have you checked all wind directions, including internal pressure, and verified that every link in the load path from cladding to foundation can carry the applied forces?',
      practicalQuestions: ['Have all four wind directions been applied and the critical one identified?','Is internal pressure included for partially enclosed buildings?','Are roof uplift and cladding local pressures checked separately from overall lateral force?'],
      related: ['load','load-combination','lateral-system','drift','diaphragm','dead-load']
    }
  },

  {
    id: 'seismic-load',
    title: 'Seismic Load',
    category: 'Loads & Actions',
    domain: 'Loads & Actions',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['load','lateral-system','stiffness'],
    unlocks: ['load-combination','lateral-system'],
    summary: 'Inertia forces generated by ground acceleration acting on the building mass, distributed over the height of the building and resisted by the lateral system.',
    sections: {
      definition: 'Seismic load arises from the inertia of the building mass when the ground accelerates during an earthquake (F = ma). The ground moves; the building tends to stay still due to inertia; the difference creates lateral forces in the structure. These forces are largest where the mass is greatest (typically at the floors) and where the structural response amplifies the ground motion (dependent on natural period and damping).',
      physical: 'The building acts like an inverted pendulum during an earthquake. Ground moves horizontally; the base of the building moves with the ground; the upper floors lag behind due to inertia. The relative displacement between floors creates inter-storey drift and internal forces in the structural members. The magnitude depends on the ground acceleration (the seismic hazard at the site), the building mass, and how the building amplifies or absorbs ground motion (the structural response).',
      behaviour: 'Buildings with short natural periods (stiff buildings) are subjected to large accelerations but small displacements. Buildings with long natural periods (flexible buildings) experience large displacements but small accelerations. The response spectrum plots the peak spectral acceleration against natural period — the peak typically occurs around 0.1–0.5 seconds for typical structures.',
      loadPath: 'Seismic inertia forces are distributed at each floor level in proportion to the product of floor mass and floor height. These floor forces enter the diaphragm and transfer to the lateral system, ultimately reaching the foundation as base shear and overturning moment.',
      equation: 'Equivalent static base shear: V = Cs × W, where Cs is the seismic response coefficient (depends on spectral acceleration, R-factor for ductility, and Ie for importance) and W is the seismic weight (dead load + fraction of live load). Distribution of forces over height: F_x = V × (w_x × h_x) / Σ(w_i × h_i), giving a triangular distribution with maximum force at the top. Exact forms per ASCE 7, Eurocode 8, or applicable code.',
      analysis: 'Two primary methods: Equivalent Static Force procedure (simple, for regular buildings within specified limits) and Response Spectrum Analysis (modal superposition, for irregular or tall buildings). Time-history analysis is used for special structures. The response modification factor R (ASCE 7) or behaviour factor q (Eurocode 8) reduces the elastic demand to account for ductility — the structure is allowed to deform into the inelastic range.',
      resultInterpretation: 'Seismic design differs from wind in a critical respect: structures are designed to yield and absorb energy (inelastic deformation), not to remain elastic. The R-factor reduction of forces assumes the structure will deform significantly and requires detailing for ductility. A structure designed with R = 8 will deform approximately 8 times more than an elastic structure, requiring drift checks using amplified displacements.',
      practice: 'Seismic design has two components: strength (the design forces) and ductility (the detailing to ensure the structure can deform to the assumed ductility level without collapse). Calculating the seismic forces without providing the required detailing produces an unsafe structure even if the forces are correct.',
      designThinking: 'The seismic force on a building is not a fixed number — it depends on the structure\'s natural period, which depends on stiffness, which depends on the structural system and member sizes. Changing the structure changes the seismic demand. This feedback requires iteration: estimate the period, calculate the demand, design the structure, recalculate the period, and repeat.',
      construction: 'During construction, the building is lighter (less dead load installed) and may have a different dynamic response than the completed building. Construction earthquakes must be considered for critical structures, particularly in high-seismic zones where earthquakes are frequent.',
      failureReasoning: 'Seismic failures most commonly result from: soft storey (insufficient stiffness or ductility at one level), torsional irregularity (asymmetric plan), inadequate connection ductility (connections fracture before the member yields), pounding between adjacent buildings, and foundation failure (liquefaction, bearing failure under combined vertical and lateral demand).',
      failureModes: ['Soft storey collapse: deformation concentrates in the flexible storey.','Torsional failure: asymmetric stiffness causes excessive twist and damage at the perimeter.','Connection fracture: brittle failure before the member can yield and absorb energy.','Foundation failure: overturning or liquefaction under the combined seismic demand.'],
      commonMistakes: ['Calculating seismic forces without providing ductile detailing — the two are inseparable.','Using R = 8 (high ductility) without confirming the detailing requirements for that system.','Not checking drift under amplified displacements (multiply elastic drift by Cd).','Ignoring vertical seismic component, which can govern cantilevered elements and uplift design.'],
      troubleshooting: ['Problem: seismic forces are very large. Check the R-factor — has the correct ductility class been used?','Problem: seismic drift exceeds the limit. The lateral system needs more stiffness, or the building plan is too irregular.'],
      practicalQuestion: 'Have the seismic forces been calculated for the correct ductility class, and has the required ductile detailing for that class been provided throughout?',
      practicalQuestions: ['What natural period does the structure have and where on the response spectrum is this?','Is the chosen R-factor (or behaviour factor) consistent with the actual detailing provided?','Have amplified (inelastic) displacements been used for the drift check?'],
      related: ['load','load-combination','lateral-system','drift','stiffness','foundation','diaphragm']
    }
  },

  {
    id: 'load-combination',
    title: 'Load Combinations',
    category: 'Loads & Actions',
    domain: 'Loads & Actions',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['load','dead-load','live-load','wind-load','seismic-load'],
    unlocks: [],
    summary: 'The structured process of combining multiple load types with prescribed factors to obtain the design action effects for strength and serviceability checks.',
    sections: {
      definition: 'Load combinations define how different load types are combined simultaneously for design. They apply load factors (which amplify uncertain loads more than certain loads) and combination factors (which recognise that multiple variable loads are unlikely to all be at their maximum value simultaneously). The two primary limit state formats are LRFD (Load and Resistance Factor Design) and ASD (Allowable Stress Design), with Eurocode using a parallel format called partial factors.',
      physical: 'At any moment in a structure\'s life, it is carrying some combination of dead load, live load, wind load, and possibly others. The critical design question is: what combination of loads, applied simultaneously, produces the worst effect in each member? Dead load is always present. Live load might be present. Wind is unlikely to be at its maximum simultaneously with maximum live load. Load combinations account for these simultaneous probabilities with combination factors (ψ).',
      behaviour: 'Different combinations govern different elements and actions. Gravity-dominated combination (1.2DL + 1.6LL): governs beams, slabs, and columns in most multi-storey buildings. Wind combination (1.2DL + 1.0LL + 1.0WL): governs lateral systems and may govern uplift checks. Minimum dead load combination (0.9DL + 1.0WL): governs overturning and uplift — uses lower dead load factor to be conservative for the restoring force.',
      loadPath: 'Each load combination produces a different internal force distribution. The critical combination for a beam midspan differs from the critical combination for the column base. Analysis must be performed for each relevant combination, or the software must envelope all combinations automatically.',
      equation: 'LRFD (ASCE 7 format, illustrative): 1.4D; 1.2D + 1.6L + 0.5(Lr or S or R); 1.2D + 1.6(Lr or S or R) + (L or 0.5W); 1.2D + 1.0W + L + 0.5(Lr or S or R); 0.9D + 1.0W; 1.2D + 1.0E + L + 0.2S; 0.9D + 1.0E. Note: these are code-specific and illustrative only — always use the applicable code for actual design. Eurocode format: γG × Gk + γQ × Qk + ψ × other variable actions.',
      analysis: 'Analysis software can perform load combinations automatically if load cases are correctly defined and assigned. Verify that: all load types are present as separate cases, combination factors are consistent with the applicable code, seismic and wind are not combined (in most codes), and the software is enveloping all combinations correctly.',
      resultInterpretation: 'The governing combination varies by element and by the action being checked. Never use a single combination for all design checks. The critical column base combination differs from the critical beam midspan combination. The critical uplift combination has the minimum dead load factor, not the maximum. Always envelope results across all combinations.',
      practice: 'Set up load combinations as a table before analysis. List every combination required by the code. Verify that wind and seismic are not combined (usually). Confirm that the minimum dead load combination is included for uplift and overturning checks. Check that pattern live load cases are included for continuous structures.',
      designThinking: 'Load combination factors encode probability. The 1.6 factor on live load reflects the higher variability of live load compared to dead load (1.2). The ψ combination factors (< 1.0) reflect that multiple variable loads are unlikely all to be at their maximum simultaneously. Understanding the probabilistic rationale makes it possible to judge when unusual combinations require additional analysis.',
      construction: 'Construction load combinations differ from in-service combinations. Typical construction combination: 1.25 × construction dead load + 1.5 × construction live load. No wind reduction factors may apply during construction if the building is unclad and wind exposure is higher than in service.',
      failureReasoning: 'Errors in load combinations cause the wrong combination to govern, leading to under-designed elements. The most dangerous error is omitting the minimum dead load combination (0.9D + 1.0W), which governs foundation uplift and roof anchorage under wind uplift.',
      failureModes: ['Uplift failure: minimum dead load combination not checked; wind uplift exceeds dead load restraint.','Overturning: design overturning moment underestimated by using incorrect combination.'],
      commonMistakes: ['Omitting the minimum dead load combination (0.9D + 1.0W) for uplift and overturning checks.','Combining wind and seismic loads in the same combination (most codes do not require simultaneous wind + seismic at full intensity).','Not running pattern live load as a separate case before combination.','Using service load combinations for ultimate strength checks or vice versa.'],
      troubleshooting: ['Problem: foundation reaction shows tension in analysis. Check the minimum dead load combination — 0.9DL + wind is giving more uplift than the dead load can resist.','Problem: beam fails one combination but not others. Identify the governing combination and understand which load type is dominating.'],
      practicalQuestion: 'Have all code-required combinations been run, including the minimum dead load combination for uplift, and has each element been designed for its own governing combination rather than a single governing combination for the whole structure?',
      practicalQuestions: ['Is the minimum dead load combination (0.9D + 1.0W) included for uplift checks?','Has pattern live load been applied before combining with dead load?','Have wind and seismic been kept as separate cases and not combined?'],
      related: ['load','dead-load','live-load','wind-load','seismic-load','foundation','lateral-system']
    }
  },


  // ==========================================================================
  // DOMAIN 6 — STRUCTURAL ELEMENTS (existing + new)
  // ==========================================================================

  {
    id: 'beam',
    title: 'Beam',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['moment','shear-force','load-path','stiffness'],
    unlocks: ['continuous-beam','cantilever','flexural-strength','stirrups'],
    summary: 'A structural member that bends and carries shear under transverse loading, the most common structural element in building frames and floor systems.',
    sections: {
      definition: 'A beam is a horizontal structural member that bends under transverse loading. Simply supported beams, continuous beams, and cantilevers are the three basic configurations. The beam spans between supports and resists applied loads through internal bending moment and shear force, transferring them to the support reactions.',
      role: 'In the gravity system a beam typically gathers tributary load and delivers reactions to columns, walls, or girders. In a frame it may also provide rotational restraint, continuity, and a share of lateral stiffness.',
      physical: 'When a beam is loaded across its span, adjacent sections rotate relative to one another and the centreline curves. Internal bending moment resists that rotation; internal shear resists the tendency of adjacent portions to slide.',
      behaviour: 'Internal forces vary along the member: shear is often largest near supports and concentrated loads; moment follows from the shear diagram and the support conditions.',
      loadPath: 'A typical gravity path is slab or supported member → beam → column or wall → foundation → ground.',
      equation: 'For a beam in equilibrium: dV/dx = −w and dM/dx = V. Flexural curvature: M = EI κ. Simply supported beam with UDL: M_max = wL²/8, δ_max = 5wL⁴/384EI.',
      analysis: 'Inspect the moment and shear diagrams, support reactions, deflection, and — if framed — axial force and torsion. Note local-axis orientation, member releases, and the load combination that governs.',
      resultInterpretation: 'A large moment or shear is a demand result, not a verdict. Before changing the section, check whether the tributary loading, span, support type, continuity, and releases match the real structure.',
      practice: 'Span, depth, continuity, and what the beam frames into usually matter more than a single software peak.',
      designThinking: 'Start with role and load path, then demand, then capacity and serviceability.',
      construction: 'Assumed fixity may be a simple bearing in reality. Reinforcement placement, cover, laps, stirrup spacing, camber, shoring removal, and construction loading change cracking and deflection.',
      failureReasoning: 'If a beam fails in software or on site, name the mechanism: flexural, shear, deflection, lateral-torsional buckling, or connection.',
      failureModes: ['Flexural yielding or crushing','Shear failure','Excessive deflection or vibration','Lateral-torsional buckling','Connection or bearing failure'],
      commonMistakes: ['Treating a large moment as a command to deepen the beam without checking load path','Modelling pinned supports when the beam is continuous','Checking flexure and skipping shear, deflection, and the connection'],
      troubleshooting: ['Problem: high midspan moment. Check tributary load, span, and whether the beam is really simply supported.','Problem: large deflection. Check EI, cracking assumptions, and live-load pattern.'],
      practicalQuestion: 'If your software reports a very large bending moment in a beam, ask: why is this beam receiving this demand, and does that demand make physical sense?',
      practicalQuestions: ['Is the moment diagram shape consistent with the support conditions and loading?','Is shear, deflection, or the connection governing rather than flexure?','Where does this beam get its load, and what receives the reaction?'],
      related: ['moment','shear-force','column','slab','stiffness','load-path','strength','continuous-beam','cantilever']
    }
  },

  {
    id: 'cantilever',
    title: 'Cantilever',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['beam','moment','shear-force','support-conditions','deflection'],
    unlocks: ['deflection','sfd-bmd'],
    summary: 'A member fixed at one end and free at the other, carrying maximum moment at the fixed support and maximum deflection at the free tip.',
    sections: {
      definition: 'A cantilever is a structural member or projection that is fully fixed at one end (providing moment, shear, and axial reaction) and completely free at the other end. Under transverse loading, it develops maximum bending moment at the fixed root and zero moment at the free tip. Deflection is maximum at the free end.',
      physical: 'A diving board is a cantilever: fixed to the pool deck at one end, free at the other. Under the diver\'s weight, it bends with the root (fixed end) developing maximum hogging moment and the tip deflecting most. The fixed end must resist both the vertical force (shear) and the turning effect (moment) of the load — this is what makes a fixed support different from a pin: it provides the moment resistance that prevents the root from rotating.',
      behaviour: 'Under a point load P at the free tip: V = P (constant along the length), M varies linearly from PL at the root to 0 at the tip, and δ_tip = PL³/(3EI). Under a UDL w: V varies linearly from wL at root to 0 at tip, M varies parabolically from wL²/2 at root to 0 at tip, and δ_tip = wL⁴/(8EI). The deflection of a cantilever is 8 times greater than a simply supported beam of the same span and loading — because the boundary condition at the fixed end imposes a slope change over only half the effective span.',
      loadPath: 'All load applied to a cantilever must be transferred to the fixed support as a combination of shear force and bending moment. The deeper into the cantilever the load is applied, the greater the moment at the root. A cantilever balcony transfers slab load to the beam root, which must be designed for the combined moment, shear, and torsion delivered to the supporting column or wall.',
      equation: 'Point load P at tip: M_root = PL, V = P, δ_tip = PL³/(3EI), θ_tip = PL²/(2EI). UDL w per unit length: M_root = wL²/2, V_root = wL, δ_tip = wL⁴/(8EI). Propped cantilever (roller at tip): statically indeterminate; M_root = 3wL²/8 under UDL (vs wL²/2 for free cantilever — the prop reduces root moment by 25%). For counterbalanced cantilevers: the back-span reaction must provide a restoring moment greater than the cantilever overturning moment.',
      analysis: 'Check that the fixed end provides both moment and shear resistance in the model. In reinforced concrete, the top reinforcement at the fixed support carries the hogging moment — it must be adequately anchored into the supporting wall or column. A fixed support in analysis that corresponds to a simple bearing in construction is the most dangerous modelling error for cantilevers.',
      resultInterpretation: 'Large root moment and large tip deflection are expected and correct for a cantilever. The question is whether the root moment is correctly modelled (fixed end, not pinned), whether the section capacity at the root is adequate, and whether the tip deflection is within the serviceability limit.',
      practice: 'Cantilever deflections are very sensitive to span and to whether the fixed end actually provides the assumed rotational restraint. A 10% increase in span increases deflection by 46% (L⁴ relationship). A partially restrained fixed end (flexible connection) dramatically increases tip deflection. Always verify the fixity assumption matches the construction detail.',
      designThinking: 'For a cantilever, the governing design check is almost always: (1) hogging moment capacity at the root, (2) tip deflection under live load and long-term dead load, (3) stability of the back-span against overturning. Unlike simply supported beams where midspan governs flexure, in cantilevers the root governs and the reinforcement or steel flange must be at the top.',
      construction: 'Top reinforcement in a cantilever RC slab is critical and vulnerable to being pushed down during construction (reducing effective depth and dramatically reducing capacity — moment capacity is approximately proportional to d², where d is the effective depth). Careful quality control of top steel cover in cantilever slabs is essential.',
      failureReasoning: 'Cantilever failures commonly result from: inadequate root moment capacity (under-reinforced top steel in RC, or undersized section), top reinforcement that was depressed during construction (reducing d), rotation at the "fixed" end due to a flexible connection, excessive tip deflection causing distress to finishes, or overturning due to inadequate back-span load.',
      failureModes: ['Root flexural failure: hogging moment exceeds section capacity — brittle if concrete crushes first.','Excessive tip deflection: serviceability failure of finishes, drainage problems on cantilever roofs.','Overturning: back-span dead load insufficient to anchor against cantilever overturning moment under uplift.','Top reinforcement failure: bars depressed during construction reduce effective depth, reducing moment capacity by d² factor.'],
      commonMistakes: ['Designing the root section as if the bottom fibres are in tension (incorrect — the top fibres are in tension under hogging).','Not checking that the back-span provides sufficient counter-moment against overturning.','Underestimating tip deflection — cantilever deflections grow as L⁴ and are often the governing check.'],
      troubleshooting: ['Problem: tip deflects far more than calculated. Check whether the fixed end is actually providing full rotational restraint, or whether flexibility at the connection is adding rotation.','Problem: analysis shows tension reaction at back-support under wind uplift. The back-span dead load is insufficient to anchor the cantilever — add holddown or increase tributary dead load.'],
      practicalQuestion: 'Is the fixed end in this cantilever actually providing the moment resistance that the analysis assumes — and would a more flexible "fixed" end dramatically change the tip deflection?',
      practicalQuestions: ['Is the root reinforcement (top steel) properly anchored into the support?','Has tip deflection been calculated using the L⁴ formula, and is it within the serviceability limit?','Has the back-span been checked to confirm it prevents overturning?'],
      related: ['beam','moment','shear-force','deflection','support-conditions','sfd-bmd','continuous-beam']
    }
  },

  {
    id: 'continuous-beam',
    title: 'Continuous Beam',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['beam','determinacy','support-conditions','sfd-bmd'],
    unlocks: ['moment-distribution','sfd-bmd'],
    summary: 'A beam spanning over three or more supports, whose indeterminacy produces negative moments over interior supports and reduced positive moments in the spans, with behaviour that depends on relative span stiffness.',
    sections: {
      definition: 'A continuous beam spans over more than two supports without interruption, making it statically indeterminate. Unlike a simply supported beam (which is determinate and spans between just two supports), a continuous beam cannot be analysed by equilibrium alone. The reactions and bending moments depend on the relative stiffness of the spans. The bending moment is negative (hogging) over interior supports and positive (sagging) in the spans.',
      physical: 'Place a long plank across three sawhorses. Push it down at the midpoint: the plank sags between the supports but rises slightly over the middle sawhorse — it is pushing up on the sawhorse at the middle. This is the physical manifestation of continuity: the supports share the load, negative (hogging) moment develops over interior supports, and the maximum positive moment in the spans is less than for a simply supported beam of the same span.',
      behaviour: 'Moment distribution: for equal spans and UDL, the maximum positive moment in each span is significantly less than wL²/8 (the simply supported value). For two equal spans under UDL: maximum positive moment ≈ 0.070wL² per span (compared to 0.125wL² for simply supported). Hogging over the interior support ≈ 0.125wL². The middle support carries more reaction than the end supports. Stiffness redistribution: stiffer spans attract more moment. Pattern loading: placing live load on only one span while leaving the adjacent span unloaded increases the support hogging moment and the loaded span moment simultaneously.',
      loadPath: 'The continuous beam distributes load between all its supports simultaneously. Load applied to one span is partially carried by all supports, not just the two adjacent ones. This interaction reduces the maximum moment compared to simply supported spans but introduces the complication that the force in every member changes when load is applied anywhere in the system.',
      equation: 'The exact bending moments in a continuous beam require an indeterminate analysis method (moment distribution, slope-deflection, matrix stiffness, or software). For equal spans and UDL, approximate coefficients are available in codes: M_span ≈ 0.07–0.09 × wL² (interior spans), M_support ≈ 0.08–0.125 × wL² depending on the number of spans and end conditions. These coefficients are approximate — exact values require analysis or moment distribution.',
      analysis: 'Run multiple live load pattern cases to find both the maximum span moment and the maximum support moment. Under a single full uniform load, neither the maximum span nor the maximum support moment is found. Pattern loading (skip loading) with live load on alternate or adjacent spans is required.',
      resultInterpretation: 'The negative moment over an interior support indicates that the top fibres are in tension over that support — top reinforcement (in RC) or top flange (in steel) is critical there. The positive moment in the span indicates bottom tension. Both conditions must be designed for. Check that the moment envelope (the worst case at each section across all load patterns) is used for design.',
      practice: 'In reinforced concrete, the top reinforcement over supports must be sufficient in area and properly anchored. The curtailment of this top reinforcement — where it can be terminated — is governed by the moment diagram shape. In steel, the moment at the interior support determines whether a moment connection is needed or whether a simple shear connection is adequate.',
      designThinking: 'The key difference between a continuous beam and a series of simply supported spans is: (1) lower maximum moments (efficiency), (2) hogging moments at supports requiring top reinforcement or consideration, (3) sensitivity to differential support settlement (which induces forces in the continuous beam but not in simply supported spans), (4) sensitivity to stiffness changes (a stiffer span attracts more moment).',
      construction: 'If supports settle differentially, the continuous beam develops additional moments. A 10 mm settlement of an interior support of a two-span beam under UDL introduces a hogging moment at that support approximately equal to 6EIδ/L³, where δ is the settlement. This must be considered in the design if soil conditions are variable.',
      failureReasoning: 'Common failures in continuous beams: inadequate top reinforcement or section capacity at interior support, insufficient anchorage of top bars, ignoring the pattern loading case (critical for support moments), or differential settlement inducing unexpected additional moments.',
      failureModes: ['Top reinforcement failure at interior support: hogging demand exceeds the provided top steel capacity.','Curtailment too early: top bars terminated before the moment has reduced to the bar capacity.','Pattern loading not checked: maximum support moment from skip loading is greater than the full-span case.'],
      commonMistakes: ['Applying full UDL on all spans and using that as the governing design case — skip loading can give 10–25% higher support moments.','Terminating top reinforcement at the theoretical cut-off point without adding the required extension for shear and bond.','Not checking the end span as a cantilever-like condition if the end support is fixed.'],
      troubleshooting: ['Problem: cracking over interior support in service. Top reinforcement is probably insufficient or terminated too early.','Problem: analysis gives lower support moment than expected. Confirm that both pattern loading cases (loaded/unloaded alternate spans) have been run, not just full-span loading.'],
      practicalQuestion: 'Have pattern loading (skip loading) cases been run to find both the maximum span moment and the maximum support moment separately?',
      practicalQuestions: ['Is the top reinforcement at interior supports sufficient for the hogging moment from skip loading?','Have the top bars been anchored past the point of contraflexure with the required extension?','Has differential settlement been considered in the beam design?'],
      related: ['beam','determinacy','sfd-bmd','moment-distribution','support-conditions','deflection','cantilever']
    }
  },

  {
    id: 'column',
    title: 'Column',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['axial-force','buckling','stability','load-path'],
    unlocks: ['buckling','slenderness','p-delta','column','foundation'],
    summary: 'A primarily vertical member that transfers axial and often combined axial, bending, and shear actions down through the structure to the foundation.',
    sections: {
      definition: 'A column is a primarily vertical member that carries compression (and sometimes tension) from the structure above toward the foundation. In frames it also resists bending and shear from gravity eccentricity, continuity, and lateral loading.',
      role: 'Columns collect reactions from beams, slabs, and walls storey by storey and deliver them to foundations.',
      physical: 'Axial load shortens the member. If the load is eccentric, or the storey sways, the column also bends. Lower-storey columns typically carry the accumulated gravity of several floors.',
      behaviour: 'A stocky column may be governed by material crushing or by P–M interaction at the section. A slender column can lose stability by buckling at a load well below the squash load.',
      loadPath: 'Gravity: slab → beam or wall → column → foundation → ground. Lateral: diaphragm shear → column frame action → foundation.',
      equation: 'Section capacity involves interaction between axial force P and moments Mx, My. Euler buckling: Pcr = π²EI/(kL)², where kL is the effective length.',
      analysis: 'Review axial force accumulation, moments about both local axes, shear, effective unbraced length, P-Delta settings, and drift.',
      resultInterpretation: 'A high axial force is expected in a lower-storey gravity column. Separate section crushing from slenderness and from second-order amplification.',
      practice: 'Column size is a coordination problem: architecture, services, beam depths, and foundation layout all constrain it.',
      designThinking: 'Decide first whether the column is a gravity member, a frame member, or both.',
      construction: 'Out-of-plumb, displaced reinforcement, congested joints, and inadequate confinement change both strength and ductility.',
      failureReasoning: 'Column failure is often sudden compared with beam flexure. Diagnose the mechanism: crushing, buckling, P–M failure, or connection failure.',
      failureModes: ['Squash or crushing','Flexural or P–M interaction failure','Buckling / slenderness','Second-order amplification','Shear or short-column failure','Base or splice failure'],
      commonMistakes: ['Designing for axial load only and ignoring moments from continuity or lateral load','Using storey height as effective length without checking actual rotational restraint','Leaving P-Delta off in a sway building'],
      troubleshooting: ['Problem: high utilisation in a lower storey. Sum tributary gravity from all floors before changing size.','Problem: buckling warning. Check unbraced length and missing floor levels.'],
      practicalQuestion: 'Is this column failing because of material capacity, instability, excessive moment, incorrect load path, or a modelling assumption?',
      practicalQuestions: ['Why is the axial force so high — is the tributary area correct?','Is slenderness or P-Delta governing rather than the section area?'],
      related: ['buckling','p-delta','stability','beam','foundation','stiffness','load-path','column','slenderness']
    }
  },

  {
    id: 'truss',
    title: 'Truss',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['axial-force','equilibrium','free-body-diagram','determinacy'],
    unlocks: ['connection','buckling'],
    summary: 'A structure of pin-jointed members that carries load entirely through axial tension and compression, achieving efficient long-span performance by eliminating bending from individual members.',
    sections: {
      definition: 'A truss is a structure of straight members connected at pin joints. Every member carries only axial force — tension or compression. The method of joints (equilibrium at each pin) and method of sections (cut through members and apply equilibrium) are the two hand-analysis techniques used to find member forces in a determinate truss.',
      physical: 'A truss works like a very deep beam, but with most of the material removed from the web. The top and bottom chords act like the flanges of an I-beam, carrying the bending through axial force (compression in the top chord, tension in the bottom chord under gravity loading). The diagonal and vertical web members carry the shear. The open web is structurally efficient — material is placed only where it is needed (the chords, far from the neutral axis), and the remaining material can be used elsewhere.',
      behaviour: 'Under gravity loading: top chord in compression, bottom chord in tension. Under uplift loading (wind on roofs): forces reverse — top chord goes into tension, bottom chord into compression. Web diagonals alternate between tension and compression depending on the truss geometry and load pattern. Pratt truss (diagonals inclined toward centre): diagonals in tension under gravity loading — efficient because steel handles tension well. Warren truss (diagonals at 60°): alternating tension and compression diagonals. Vierendeel frame: rectangular openings, no diagonals, carries load through bending in chords — less efficient than a truss but allows rectangular openings.',
      loadPath: 'Applied loads at joints travel through the truss as axial forces in the members, ultimately reaching the support reactions. The load path in a simple Pratt truss: applied load at a top chord joint → web diagonals and verticals (shear path) → support reactions AND bending distributed as axial chord forces → reactions.',
      equation: 'Method of joints: apply ΣFx = 0 and ΣFy = 0 at each joint in sequence, solving for two unknowns per joint. Method of sections: cut through the truss, isolating one portion and applying ΣFx = 0, ΣFy = 0, ΣM = 0 to find up to three member forces simultaneously. For a simple Pratt truss with span L, depth d, under central point load P: top chord force ≈ PL/(4d) (compression), bottom chord force ≈ PL/(4d) (tension), diagonal force ≈ P/2 × L/d × (1/sinθ) where θ is the angle of the diagonal.',
      analysis: 'In practice, truss connections have finite rigidity, and members have non-zero eccentricity at joints. These introduce secondary bending moments that the ideal pin-joint assumption ignores. For preliminary design, the pin-joint assumption is adequate. For final design of large trusses (especially welded steel trusses), secondary moments should be checked.',
      resultInterpretation: 'Zero-force members — members that carry no force in a specific loading — appear regularly in statically determinate trusses. They are not unnecessary: they prevent buckling of adjacent members, reduce the unbraced length of chord members, and carry force under alternative load patterns. Do not remove them without checking all load cases.',
      practice: 'Truss depth controls both capacity (greater depth = larger chord lever arm = lower chord forces for the same moment) and deflection (greater I_truss = stiffer). As a starting point, truss depth is often L/10 to L/12 for flat trusses and L/6 to L/8 for pitched roofs. Chord members carry the largest forces and govern material selection. Web members carry smaller forces but must be checked for buckling (compression diagonals) and connection capacity.',
      designThinking: 'The decision to use a truss instead of a solid beam is primarily one of span and economy. For spans above approximately 15–20 m in steel, a truss begins to be more economical than a solid beam because it uses much less material for the same stiffness. The trade-off is fabrication complexity (many connections) and the fact that the open web cannot carry service runs without special detailing.',
      construction: 'Trusses are fabricated with an upward camber to offset dead load deflection. The camber must be designed in advance and built into the fabrication drawings. During erection, the truss must be braced against lateral instability of the compression chord before the permanent bracing (roof diaphragm) is connected.',
      failureReasoning: 'Truss failures typically involve: buckling of a compression diagonal (too slender, often with inadequate lateral restraint), connection failure at a highly loaded joint (gusset plate failure, weld or bolt failure), overloading of the bottom tension chord (fracture or yielding at the net section), or lateral instability of the whole truss before bracing is complete.',
      failureModes: ['Compression diagonal buckling: slender web diagonals buckle under their axial compression demand.','Gusset plate failure: high force concentrated at a joint fractures or buckles the connecting plate.','Bottom chord fracture: tensile failure of the bottom chord at a connection hole or reduced section.','Lateral truss buckling: the whole truss buckles laterally before roof bracing is in place.'],
      commonMistakes: ['Treating zero-force members as unnecessary and omitting them.','Not checking lateral bracing of the compression chord.','Ignoring secondary bending moments in stiff welded connections.','Not checking the buckling slenderness of compression web members.'],
      troubleshooting: ['Problem: bottom chord force seems unreasonably high. Check truss depth — a shallow truss requires much higher chord forces for the same moment.','Problem: deflection is much larger than estimated. Check whether all web members are present and connected — a missing member dramatically changes truss stiffness.'],
      practicalQuestion: 'In this truss, which members are in tension and which in compression under each load case — and have the compression members been checked for buckling?',
      practicalQuestions: ['Are zero-force members present and connected to prevent compression chord buckling?','Has the compression chord been checked for lateral buckling between brace points?','Have secondary moments in rigid joints been checked?'],
      related: ['axial-force','equilibrium','free-body-diagram','connection','buckling','beam','brace']
    }
  },

  {
    id: 'frame',
    title: 'Frame',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['beam','column','moment','determinacy','stiffness'],
    unlocks: ['lateral-system','drift','p-delta','connection'],
    summary: 'A structural system of beams and columns with rigid (moment-resisting) connections that carries both gravity and lateral loading through combined bending and axial action in its members.',
    sections: {
      definition: 'A frame is a structural system consisting of beams and columns connected at rigid (or semi-rigid) joints. Unlike a pin-jointed truss, the joints in a frame resist rotation — they transfer bending moment between connected members. This allows the frame to carry lateral loads through the bending stiffness of its members, making frames the primary lateral load-resisting system in many multi-storey buildings (as moment frames).',
      physical: 'A simple portal frame (one span, two columns, rigid eaves connections) under a lateral load sways as a unit. Both columns bend in double curvature (hogging at the base and eaves), the beam bends in double curvature, and the whole frame deflects laterally. The stiffness depends on the moment of inertia of both the beam and the columns — neither alone controls the behaviour.',
      behaviour: 'Under gravity: the rigid beam-column connection distributes moment from the beam into the column. The beam behaves like a partially restrained beam (more moment at the ends, less at midspan compared to a simply supported beam). Under lateral load: the frame sways, both columns bend, and the beam must carry shear to maintain equilibrium. Beam stiffness directly affects column moments and drift.',
      loadPath: 'Gravity: applied load → beam (combined bending + axial) → rigid joint (moment transfer) → column (axial + bending) → base (shear + moment) → foundation. Lateral: applied lateral force → beam (shear) → rigid joint → column (bending + axial) → base → foundation.',
      equation: 'Portal frame analysis by equilibrium (for determinate case) or by moment distribution/matrix stiffness (for indeterminate). For a symmetric single-storey fixed-base portal under lateral force H and gravity w: column base moment M = HL/2 (for equal height columns). Beam moment distribution depends on relative beam-to-column stiffness. In a sway frame, effective length factors for columns are typically greater than 1.0.',
      analysis: 'Model rigid joints accurately — a pin where a moment connection exists will completely change the analysis result. Apply lateral loads in both directions. Check both first-order and second-order (P-Delta) analysis if sway is significant. Extract: beam end moments and midspan moments, column axial forces and moments, storey drift, base shear, and base moment (for foundation design).',
      resultInterpretation: 'In a sway frame, the columns are beam-column elements carrying combined axial and bending — both must be checked simultaneously using an interaction equation. The column effective length for buckling in a sway frame is greater than L (k > 1.0) and depends on the relative stiffness of beams and columns at each end — do not use k = 1.0 for unbraced frame columns.',
      practice: 'Moment frames are inherently flexible compared to shear walls or braced frames. They provide excellent architectural flexibility (no diagonal braces, no solid walls in the perimeter) but require large members to control drift. In seismic zones, moment frames must be specially detailed for ductility at the beam-column connection — the connection is the most critical element.',
      designThinking: 'The beam stiffness affects the column. A stiff beam restrains the column top against rotation, reducing its effective length and improving buckling resistance. A flexible beam does not restrain the column, and the column behaves more like a flagpole. This interaction between beam and column is the defining characteristic of frame behaviour.',
      construction: 'Connection details in moment frames are complex, expensive, and critical. Welded moment connections require careful workmanship and quality inspection. Pre-Northridge moment frame failures (1994 Northridge earthquake) were predominantly at welded beam-column connections that were theoretically adequate but had unexpected brittle fracture due to poor weld geometry and material properties.',
      failureReasoning: 'Frame failures commonly involve: connection fracture at the moment joint (brittle, unexpected), column base failure under combined axial and moment, excessive drift causing P-Delta instability, or soft storey formation where one storey is much more flexible than adjacent storeys.',
      failureModes: ['Beam-column joint failure: the rigid connection fractures before the beam can develop its plastic moment.','Column base failure: combined axial and bending exceeds the column base capacity.','Soft storey: one storey is much more flexible, concentrating inelastic drift there under seismic load.','P-Delta instability: drift amplifies axial load effects until equilibrium cannot be maintained.'],
      commonMistakes: ['Using k = 1.0 for column effective length in an unbraced sway frame.','Modelling beam-column connections as pinned when they are intended to be moment-resisting.','Not checking the interaction between axial force and bending moment in the column design.'],
      troubleshooting: ['Problem: excessive drift in a moment frame. Beam or column stiffness is insufficient — increase depth of beams and columns or add walls/bracing.','Problem: column fails interaction check. Check whether the effective length is correct for a sway frame, and whether the combined P-M demand was calculated for the correct load combination.'],
      practicalQuestion: 'In this frame, are the rigid joints actually transferring the moments that the analysis assumes — and has the column been checked for combined axial and bending using the correct effective length for a sway frame?',
      practicalQuestions: ['Is the beam-column connection actually capable of transferring the design moment?','Has the column effective length been calculated for a sway (unbraced) frame?','Has the combined P-M interaction check been performed for the column?'],
      related: ['beam','column','moment','lateral-system','drift','p-delta','connection','determinacy']
    }
  },

  {
    id: 'brace',
    title: 'Brace',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['axial-force','lateral-system','truss','stability'],
    unlocks: ['lateral-system','buckling'],
    summary: 'A diagonal member providing lateral stiffness and strength to a frame by carrying lateral forces as axial tension or compression.',
    sections: {
      definition: 'A brace is a diagonal structural member that provides lateral resistance in a braced frame by converting lateral shear forces into axial tension and compression. The brace transforms the frame from a laterally flexible system (which resists lateral load by bending in beams and columns) to a laterally stiff system (which resists lateral load primarily through the direct axial stiffness of the braces).',
      physical: 'Add a diagonal member to a square frame: under lateral load, the diagonal shortens (if in compression) or elongates (if in tension). This axial deformation is tiny compared to the lateral bending deformation of the unbraced frame — the brace makes the frame dramatically stiffer. Remove the diagonal and the frame sways freely under any lateral load.',
      behaviour: 'Concentrically braced frames (work-lines meet at joints): under lateral load, one diagonal brace is in tension, the other (if X-brace) or none (if single diagonal) is in compression. Tension-only braces (very slender diagonals): designed for tension; the compression diagonal buckles and goes to zero force; only the tension diagonal carries load. Eccentrically braced frames: intentional eccentricity introduces a short "link beam" that yields in shear under seismic load — this provides energy dissipation and ductility while the braces remain elastic.',
      loadPath: 'Lateral load path in a braced frame: lateral force at floor level → diaphragm → collector/drag strut → brace connection → brace diagonal (axial tension or compression) → opposite connection → beam and column → foundation. The brace must connect to the diaphragm and the foundation through members capable of developing the full brace force.',
      equation: 'Brace force: F_brace = V_storey / cos θ (where θ is the angle of the brace from horizontal, V_storey is the storey shear carried by this brace). For X-brace with tension only: each diagonal carries the full V_storey / cos θ alternately. Brace stiffness: k_brace = AE cos²θ / L contributes to storey stiffness. A brace at 45° contributes approximately AE/(√2 L) to the lateral stiffness of the storey.',
      analysis: 'Ensure brace connections are properly modelled — the brace must be connected at its ends with moment releases (the member is pin-jointed unless a moment connection is detailed). Check that the beam and column at brace-end connections can carry the horizontal and vertical components of the brace force in addition to their other loads. For X-braces in seismic design, check whether tension-only design is permitted by the code.',
      resultInterpretation: 'In a concentrically braced frame under lateral load, most of the storey shear should be carried by the braces with little bending in the columns. If columns are carrying large bending moments in a braced frame, check whether the brace is actually connected or whether the model has the brace in the wrong location.',
      practice: 'Braces interrupt floor plans and must be coordinated with architecture and services. Single diagonals have asymmetric stiffness (different deflection in each direction). Chevron (inverted-V or V) braces allow openings between the diagonals for corridors and doors, but introduce a vertical unbalanced load on the beam at the brace apex that must be designed for.',
      designThinking: 'Braced frames are stiffer and more economical in material than moment frames for the same lateral drift limit. However, they require connections that can develop the full axial force in the brace, which can be large for heavily loaded braces. The brace force is V_storey / cos θ, which increases rapidly as the brace becomes more horizontal (small θ, steep cosine). Very flat braces are inefficient and require very large forces.',
      construction: 'During construction, bracing must be in place before the temporary horizontal wind bracing is removed. The sequence of erection must ensure that lateral stability exists at every stage, not just after the whole frame is complete.',
      failureReasoning: 'Brace failures commonly involve: fracture at the gusset plate connection (high force concentration), buckling of compression diagonals in non-tension-only systems, yielding of the connection components before the intended yielding mechanism (in seismic systems), or instability of the brace out-of-plane (buckling in the direction perpendicular to the frame plane).',
      failureModes: ['Gusset plate failure: the connection plate fractures under the high concentrated brace force.','Compression brace buckling: the diagonal buckles out-of-plane if slenderness is too high.','Column fracture at brace-to-column connection: stress concentration causes premature fracture.','Seismic: brace fracture in tension due to repeated tension-compression cycling under earthquake.'],
      commonMistakes: ['Not providing pin releases at brace ends when the connection cannot carry moment.','Ignoring the vertical component of the brace force on the beam at the apex of a chevron brace.','Not checking brace slenderness for compression (Euler buckling).','Forgetting to design the collector/drag strut connecting the diaphragm to the brace.'],
      troubleshooting: ['Problem: large moments in columns of a "braced" frame. Check that braces are properly connected and that the model is using pin releases at brace ends.','Problem: brace force much larger than expected. Check the brace angle — a flat brace (large θ from vertical) has a large force for a given storey shear.'],
      practicalQuestion: 'Can you trace the full lateral force path from the diaphragm through the collector, into the brace connection, along the brace diagonal, out through the opposite connection, and into the foundation?',
      practicalQuestions: ['Is the brace angle efficient, or is the brace so flat that the force is disproportionately large?','Have pin releases been provided at brace ends if the connection cannot carry moment?','Has the beam at the chevron brace apex been checked for the unbalanced vertical force?'],
      related: ['axial-force','lateral-system','truss','buckling','connection','frame','drift']
    }
  },

  {
    id: 'connection',
    title: 'Connection',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['load-path','force','moment','shear-force','axial-force'],
    unlocks: [],
    summary: 'The structural interface where forces are transferred between members or between a member and its support, requiring design for the complete set of forces implied by the analysis.',
    sections: {
      definition: 'A connection is the element or assembly that transfers structural forces from one member to another or from a member to its support. It must carry every force component that the analysis assumes: shear, axial, moment, or any combination. The connection behaviour also influences the structural model — a connection that does not match its modelled classification (pin vs moment) changes the analysis results.',
      physical: 'A bolted shear tab (simple shear connection): designed to carry vertical shear only, allowing rotation — the beam end can rotate, and no significant moment develops. A moment end plate connection: designed to carry shear and moment — it is stiff in rotation, attracts moment, and the bolts and plate must be sized for both the vertical shear and the moment couple. The distinction between these two connection types is not just a design detail — it fundamentally changes the behaviour of the entire beam.',
      behaviour: 'Connection behaviour lies on a spectrum from pinned (no moment capacity) to rigid (full moment continuity). Most practical connections are semi-rigid — they have some rotational stiffness but are not perfectly rigid. The degree of connection stiffness affects moment distribution, deflections, and forces in the entire structure. Design codes typically use idealised pin or rigid models for simplicity, but semi-rigid analysis is available for more accurate modelling.',
      loadPath: 'The load path cannot be complete without a connection capable of carrying the required forces at every transfer point. A gap in connection capacity is a break in the load path — forces build up at the gap and cause local failure, which can progress to global failure.',
      equation: 'Bolted connection — bolt shear capacity: Vn = Fnv × Ab (per bolt), where Fnv is the nominal shear stress capacity and Ab is the bolt shank area. Bearing capacity: Vn = 1.2Fu × lc × t (per bolt), or 2.4Fu × d × t in simplified form. Weld — fillet weld shear capacity: Vw = 0.6Fexx × Aw (per unit length), where Fexx is the electrode strength and Aw is the effective throat area. These are indicative; exact formulas are code-specific (AISC 360, Eurocode 3, AS 4100, etc.).',
      analysis: 'Connections are usually not explicitly modelled in a global frame analysis — they are idealised as pins or rigid joints. After the global analysis, the forces at each connection are extracted and used to design the connection components. Connection forces include the combination of shear, moment, and axial from the analysis — all three must be provided to the connection designer.',
      resultInterpretation: 'If a connection is classified as a simple shear connection in the model but the connection detail develops significant moment in reality (due to constrained rotation at a congested joint), the member may develop unexpectedly large moments. Conversely, if a moment connection is designed but is actually too flexible, the beam acts more simply supported than assumed and deflects more than calculated.',
      practice: 'Connection design is separate from but dependent on member design. Always provide connection designers with the full force set: shear V, axial N, and moment M for all load combinations, not just the peak shear. Omitting the axial force on a beam-column shear connection is a common error — the axial force can significantly affect bolt and weld capacity.',
      designThinking: 'The connection is the physical realisation of the analysis assumption. Every pin in a model requires a connection detail that actually allows rotation; every rigid joint requires a detail that actually transmits moment. Reconciling the model assumption with the constructible detail is the connection designer\'s core challenge.',
      construction: 'Bolted connections are field-fitted — holes may not align perfectly. Oversized holes, slotted holes, and adjustment in weld size accommodate construction tolerances. Moment connections require careful quality control of welds, bolt pretension, and bearing surfaces. Field welding is more variable in quality than shop welding and should be minimised.',
      failureReasoning: 'Connection failures are often more brittle than member failures. A member may show significant deformation before failure; a connection may fracture suddenly at the weld, bolt, or plate. Common causes: insufficient capacity for the actual force combination, stress concentrations at weld toes, incomplete fusion in welds, bolt fracture in overloaded connections, or block shear failure where a block of material tears out along bolt lines.',
      failureModes: ['Bolt shear failure: bolt shank shears through.','Bearing failure: plate or member material crushes around bolt holes.','Block shear: a block of material tears out along a combination of shear and tension planes through the bolt group.','Weld fracture: weld cracks, typically at the fusion boundary, especially if toughness is low or the weld has poor geometry.','Net section fracture: the member cross-section at the hole pattern fractures through the net (reduced) area.'],
      commonMistakes: ['Designing the connection for shear only without checking axial force and moment.','Using gross area instead of net area for tension capacity of a bolted connection.','Not checking all failure modes — a connection can fail in bolt shear, bearing, block shear, or net section; all must be checked.','Welding over painted surfaces without removing paint, reducing weld quality.'],
      troubleshooting: ['Problem: connection fails block shear but passes bolt shear. Increase the bolt group size (more rows or larger pitch) to increase the block shear area.','Problem: weld leg size required is too large for the connected plate thickness. Increase the plate thickness or use a different connection type.'],
      practicalQuestion: 'Have all failure modes been checked for this connection — bolt shear, bearing, block shear, net section, and weld strength — and has the full force set (V, N, M) been used for each check?',
      practicalQuestions: ['Has the full force set (V, N, M) for all governing combinations been passed to the connection designer?','Have all failure modes been checked?','Does the modelled connection (pin or rigid) match the actual connection detail?'],
      related: ['load-path','force','moment','shear-force','axial-force','frame','truss','brace']
    }
  },

  {
    id: 'slab',
    title: 'Slab',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['moment','shear-force','load-path','stiffness'],
    unlocks: ['slab','slab','diaphragm'],
    summary: 'A plate-like structural element that carries distributed loads and transfers them to supporting beams, walls, columns, or foundations.',
    sections: {
      definition: 'A slab is a relatively thin plate or shell that carries gravity loads over an area and may also act as a horizontal diaphragm. It spans one-way or two-way depending on geometry and supports, not depending on what it is called on a drawing.',
      role: 'The slab is usually the first collector in the gravity path: occupancy, finishes, and self-weight enter here. It delivers those actions to beams, walls, or directly to columns (flat slabs).',
      physical: 'Under gravity the slab curves between supports. In a one-way slab most curvature is in one direction, like a wide beam. In a two-way slab curvature develops in both directions.',
      behaviour: 'Moments follow the supports: negative moment typically occurs over continuous edges and columns; positive moment in the midpanel.',
      loadPath: 'Gravity: imposed load → slab → beams/walls/columns → vertical members → foundation → ground. Lateral: floor mass → in-plane slab → collectors → walls or frames → foundation.',
      equation: 'Elastic plate bending: D = Eh³/[12(1−ν²)], where h is slab thickness. Punching perimeter and resistance are defined by the adopted code.',
      analysis: 'Look at moments in two local directions, deflection, column punching, and in-plane diaphragm forces.',
      resultInterpretation: 'A red contour in a finite-element plot is not automatically a failed slab. Check mesh, support modelling, live load patterning, and whether peaks are at a re-entrant corner needing local detailing.',
      practice: 'Coordinate openings before reinforcing. Flat slabs trade beam congestion for punching, deflection, and vibration risk.',
      designThinking: 'First: how does it span, and what receives the load? Second: which limit state governs — flexure, punching, deflection, or diaphragm force?',
      construction: 'Cover, bar positions, chairs, openings cut after pouring, pour strips, and curing control real stiffness and crack width.',
      failureReasoning: 'Slab distress is often serviceability first: sag, cracks, vibration. Strength failures include flexural yielding of a strip and, more dangerously, punching around a column.',
      failureModes: ['Flexural yielding of a strip','Punching shear at a column','Excessive deflection','Service cracking','Vibration','Diaphragm failure'],
      commonMistakes: ['Assuming two-way behaviour when the slab is clearly one-way','Designing from a single finite-element peak','Ignoring punching because flexure looks adequate','Cutting large openings without alternative gravity and diaphragm path'],
      troubleshooting: ['Problem: high slab moment in contour plot. Check mesh, local axes, and whether a strip average is more meaningful.','Problem: punching check fails. Confirm column size, slab thickness, and openings.'],
      practicalQuestion: 'How is this slab actually spanning, and where does its load go after leaving the slab?',
      practicalQuestions: ['Is this panel one-way or two-way, and do the supports agree?','Is the coloured peak a punching problem, a flexural strip, or a mesh singularity?'],
      related: ['diaphragm','beam','column','moment','shear-force','stiffness','load-path','slab','slab']
    }
  },

  {
    id: 'shear-wall',
    title: 'Shear Wall',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['lateral-system','load-path','stiffness','stability'],
    unlocks: ['lateral-system','foundation','drift'],
    summary: 'A wall-shaped structural element designed to resist substantial lateral forces and overturning effects.',
    sections: {
      definition: 'A shear wall is a vertical plate-like member that provides in-plane lateral strength and stiffness.',
      role: 'In the lateral system the wall is often the primary drift-controlling element. Diaphragms feed it; foundations and the soil must accept its overturning and shear.',
      physical: 'Under lateral load the wall tries to slide at the base and overturn. Internal shear resists sliding; a couple of compression and tension resists overturning.',
      behaviour: 'A squat wall is often shear-sensitive; a slender wall behaves more like a vertical cantilever in flexure.',
      loadPath: 'Lateral: wind or seismic → diaphragm → collectors into the wall → in-plane shear and overturning → foundation → ground.',
      equation: 'Cantilever wall overturning: M ≈ V × h at height h. Elastic stiffness depends strongly on wall length and base fixity.',
      analysis: 'Extract storey shear, moment about the strong axis, axial force including uplift, foundation reactions, drift, and torsional response.',
      resultInterpretation: 'A wall attracting high force may be doing its job. Before thickening the wall, check plan symmetry, missing walls, diaphragm collectors, and whether frames are modelled too flexible.',
      practice: 'Wall length, location, and continuity through height usually beat local reinforcement in controlling drift.',
      designThinking: 'Start with the building\'s lateral concept. Increasing wall length increases stiffness and demand. Foundation, collectors, and coupling beams are part of the wall design.',
      construction: 'Boundary reinforcement, confinement, lap splices at the wrong height, and poorly compacted concrete at the base change strength and plastic hinge location.',
      failureReasoning: 'Walls can fail in flexure at the base, in shear, by sliding, by boundary crushing, or by foundation rocking.',
      failureModes: ['Flexural yielding or crushing at the base','Shear failure of the web','Sliding at the base','Boundary-element or toe crushing','Coupling-beam failure','Foundation rocking'],
      commonMistakes: ['Checking wall reinforcement without checking the foundation and diaphragm connection','Ignoring torsion from unsymmetric wall layout','Assuming a fixed base on flexible soil'],
      troubleshooting: ['Problem: one wall has very high shear. Check relative stiffness, plan location, missing walls, and torsion.','Problem: wall has large tension. Check overturning path and whether the foundation handles tension.'],
      practicalQuestion: 'What part of the building is this wall responsible for resisting, and how does that force reach its foundation?',
      practicalQuestions: ['Why is this wall attracting so much shear — stiffness, torsion, or a missing neighbour?','Can the foundation accept this overturning?'],
      related: ['diaphragm','foundation','load-path','stiffness','stability','p-delta','column','lateral-system']
    }
  },

  {
    id: 'foundation',
    title: 'Foundation',
    category: 'Structural Elements',
    domain: 'Structural Elements',
    level: 'Foundation',
    levelNum: 0,
    status: 'complete',
    prerequisites: ['load-path','load-combination','equilibrium'],
    unlocks: ['load-combination'],
    summary: 'The part of the structural system that transfers actions from the superstructure to the supporting ground.',
    sections: {
      definition: 'A foundation is the interface that takes actions from columns, walls, and the superstructure and delivers them into the ground.',
      role: 'The foundation completes every load path. Gravity, shear, overturning, and sometimes uplift must be accepted without excessive settlement or soil failure.',
      physical: 'A pad footing spreads a column load over an area of soil. If the load is eccentric, bearing pressure is higher on one edge. A raft shares load among many columns through plate bending on a soil spring.',
      behaviour: 'Foundation response is soil-structure interaction: a stiff raft on soft soil behaves differently from a flexible footing on dense gravel.',
      loadPath: 'Superstructure reactions → footing, raft, or pile cap → soil and/or piles → supporting ground.',
      equation: 'Average bearing pressure: q = P/A. Eccentricity produces non-uniform pressure. If the resultant leaves the kern, an edge unloads.',
      analysis: 'From the structural model, take column and wall reactions (P, Vx, Vy, Mx, My) for the relevant combinations. Soil springs, if used, are an assumption.',
      resultInterpretation: 'A pass on footing concrete does not mean the foundation works. Ask whether settlements are compatible with the superstructure and whether groundwater and long-term soil behaviour were included.',
      practice: 'Foundation design is a joint structural-geotechnical activity.',
      designThinking: 'First: what does the structure deliver, and what can this ground accept?',
      construction: 'Over-excavation, loosened bearing soil, water in the excavation, and pouring on debris destroy assumed bearing.',
      failureReasoning: 'Foundations fail in the ground (bearing, settlement, sliding, overturning) or in the concrete (flexure, punching).',
      failureModes: ['Bearing failure','Excessive or differential settlement','Sliding','Overturning or edge uplift','Structural punching of footing','Pile failure'],
      commonMistakes: ['Designing the footing as concrete without using the soil report','Using gravity-only reactions for a wall that is the lateral system','Assuming a rigid base on flexible soil'],
      troubleshooting: ['Problem: bearing pressure too high. Confirm reaction with a load takedown before changing footing size.','Problem: wall footing uplifts. Overturning from lateral load — add gravity, lengthen the foundation, or use piles.'],
      practicalQuestion: 'Can the ground safely and acceptably receive everything the structure is transferring into the foundation?',
      practicalQuestions: ['Is this a soil problem, a concrete problem, or a superstructure load-path problem?','Did the building model assume a fixed base that this foundation cannot provide?'],
      related: ['column','shear-wall','load-path','stiffness','stability','load','load-combination']
    }
  },

  // ==========================================================================
  // DOMAIN 7 — REINFORCED CONCRETE
  // ==========================================================================

  {
    id: 'concrete-material',
    title: 'Concrete Material Behaviour',
    category: 'Reinforced Concrete',
    domain: 'Reinforced Concrete',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['material-properties','stress','strain','elasticity','plasticity'],
    unlocks: ['reinforcement','flexural-strength','stirrups'],
    summary: 'The mechanical, physical, and time-dependent properties of concrete that govern its structural behaviour, including compressive strength, tension weakness, nonlinear stress-strain response, creep, and shrinkage.',
    sections: {
      definition: 'Concrete is a composite material formed from cement, aggregate, water, and admixtures. In its hardened state, it has high compressive strength and very low tensile strength. Structural concrete is almost always combined with steel reinforcement to create reinforced concrete — a composite that exploits the compressive strength of concrete and the tensile strength of steel.',
      physical: 'Concrete is strong in compression: compress it and it resists strongly up to its compressive strength fc\'. Pull it in tension: it cracks at a stress of approximately 0.1fc\' — one-tenth of its compressive strength. This fundamental asymmetry is why concrete cannot be used structurally without reinforcement or prestress to carry tensile regions. A beam in bending has tension in one face and compression in the other — the concrete on the tension face cracks, and steel bars carry the tensile force.',
      behaviour: 'Compressive stress-strain: approximately linear up to 0.4fc\'; nonlinear from 0.4fc\' to fc\' (peak); strain-softening after fc\'. Peak strain approximately 0.002; crushing strain approximately 0.003–0.0035. Tensile behaviour: essentially elastic up to cracking; cracks at tensile strain approximately 0.0001. Once cracked, the concrete contributes little and reinforcement carries all tension. Young\'s modulus: Ec ≈ 4700√fc\' MPa (ACI 318), where fc\' is in MPa. This varies with aggregate type and mix proportions.',
      loadPath: 'Concrete carries compressive stresses from axial load, bending, and shear compression. Steel reinforcement carries tensile stresses from bending and direct tension. In the compression strut-and-tie model, concrete compression struts carry diagonal forces in deep members; horizontal ties carry tension forces.',
      equation: 'Compressive strength fc\': specified at 28 days, measured on standard cylinders (150 mm × 300 mm per ACI, 150 mm cubes per BS/EN). Cube strength is approximately 1.2 × cylinder strength. Modulus: Ec ≈ 4700√fc\' MPa (ACI 318) = 33 × w¹·⁵ × √fc\' for normal-weight concrete (w ≈ 2320 kg/m³). Tensile strength: ft ≈ 0.33√fc\' MPa (direct tension), fr ≈ 0.6√fc\' MPa (modulus of rupture from flexural test). Creep coefficient φ: ratio of creep strain to elastic strain; typically 1.5–3.0 for normal concrete, increasing with lower fc\', higher humidity, and loading at early age.',
      analysis: 'In structural analysis, concrete is usually modelled as linear elastic with E = Ec. This overestimates stiffness in cracked zones. For deflection calculations in beams and slabs, the effective (cracked) stiffness must be used — either by applying a stiffness reduction factor (e.g. 0.35EcIg for beams in ACI 318) or by explicitly modelling the cracked transformed section.',
      resultInterpretation: 'When analysis of a concrete structure gives deflections that seem low, check whether cracked section stiffness has been used. Elastic, uncracked analysis routinely underestimates deflections by a factor of 2–4 for beams and 3–5 for slabs in service. The real deflection includes cracking, creep, and shrinkage, all of which increase the deformation beyond the elastic uncracked value.',
      practice: 'Specify concrete by its grade (e.g. C30/37 in Eurocode notation, where 30 = cylinder strength and 37 = cube strength; or 4000 psi = 28 MPa in ACI). Higher grades increase strength and modulus but also reduce creep potential. For durability: the water-cement ratio, cover, and curing conditions control concrete permeability, which governs carbonation and chloride ingress depth.',
      designThinking: 'The most important insight about concrete material behaviour for structural design: concrete resists compression; steel resists tension. This division of labour is the entire basis of reinforced concrete design. Design is the process of placing the right amount of steel in the right location to carry all tensile forces the analysis identifies.',
      construction: 'Concrete strength gains with time. At 28 days it has approximately reached its design strength; at 3 days approximately 40%; at 7 days approximately 65%. Loading at early age — from the floors above during construction — increases creep because the creep coefficient is higher at early age. This is one reason early removal of props is detrimental.',
      failureReasoning: 'Concrete fails in compression by crushing: the aggregates separate and the paste fractures under high compressive strain. In tension it fails by cracking: a crack initiates at a flaw and propagates across the section if unreinforced. With reinforcement, cracks are controlled but cannot be eliminated. Durability failures (corrosion of reinforcement, alkali-silica reaction, freeze-thaw) degrade the concrete over time and must be designed against through adequate cover, low permeability, and appropriate mix design.',
      failureModes: ['Compressive crushing at the extreme fibre when strain exceeds approximately 0.003','Tensile cracking — always present in reinforced concrete under service load, controlled by reinforcement','Spalling under fire or freeze-thaw if moisture is trapped in low-permeability concrete','Corrosion of reinforcement due to inadequate cover or high permeability'],
      commonMistakes: ['Using the concrete cube strength (fcu) in equations written for cylinder strength (fc\') — typically 20% unconservative','Using uncracked Ec × Ig for all deflection calculations','Ignoring the long-term increase in deflection due to creep and shrinkage'],
      troubleshooting: ['Problem: deflections significantly exceed calculations. Cracking and creep are probably not included in the analysis — recalculate using cracked stiffness and add creep factor.','Problem: concrete fails at a load below fc\'. Check for early age loading, inadequate curing, poor compaction, or incorrect grade supplied.'],
      practicalQuestion: 'Has the cracking of this concrete element been accounted for in the stiffness used for deflection calculation, and has the long-term creep increase been included?',
      practicalQuestions: ['Is Ec based on the correct fc\' for this grade of concrete?','Has the effective (cracked) moment of inertia been used for deflection?','Has the creep coefficient been applied to the long-term deflection estimate?'],
      related: ['material-properties','stress','strain','elasticity','plasticity','reinforcement','flexural-strength','stirrups']
    }
  },

  {
    id: 'reinforcement',
    title: 'Steel Reinforcement',
    category: 'Reinforced Concrete',
    domain: 'Reinforced Concrete',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['concrete-material','stress','strain','plasticity'],
    unlocks: ['flexural-strength','stirrups','development-length'],
    summary: 'Deformed steel bars embedded in concrete to carry tensile forces, with properties defined by yield strength, ductility, and bond with the surrounding concrete.',
    sections: {
      definition: 'Reinforcing bars (rebars) are deformed steel bars embedded in concrete to provide tensile resistance in regions where the concrete would crack. Deformations (ribs on the bar surface) increase mechanical bond with concrete. Reinforcement also provides ductility by yielding rather than fracturing when demand exceeds capacity — a key property for structural safety.',
      physical: 'The steel bar in the tension zone of a beam carries the tensile force that the cracked concrete cannot. The bar must be sufficiently embedded that the bond stress between bar and concrete can develop the full yield force in the bar before the bar pulls out. The bar must also not yield prematurely at a location with inadequate cover or development length.',
      behaviour: 'Elastic behaviour: below yield, the bar responds linearly (σ = Es ε, where Es = 200,000 MPa for all grades). Yield: the bar reaches fy and begins to flow — deformation increases without proportional stress increase. For design, the bar is treated as elastic-perfectly plastic (no strain hardening) for most code procedures. Ductility: the ratio εu/εy must be sufficient for the structural system to redistribute forces after first yielding — seismic codes specify minimum εu/fy ratios.',
      loadPath: 'Reinforcement follows the internal force path in the RC member. Tension reinforcement at the bottom of beams resists sagging moment. Top reinforcement resists hogging moment. Stirrups (transverse bars) resist shear and provide confinement. Column ties provide confinement and resist buckling of the longitudinal bars.',
      equation: 'Bar area: Ab = π d_b² / 4, where db is the bar diameter (mm). Yield force per bar: T = fy × Ab. Common bar sizes (diameter in mm): R8, T10, T12, T16, T20, T25, T32, T40. Cover: the distance from the outside face of the concrete to the nearest bar surface. Required cover depends on fire rating, durability exposure, and code requirements — typically 25–50 mm for floors, higher for aggressive environments.',
      analysis: 'Reinforcement is not typically modelled explicitly in global frame analysis. The reinforcement area and its position determine the section capacity — the analysis provides the demand. The section capacity check (moment, shear, or axial-moment interaction) uses the provided reinforcement as the key variable.',
      resultInterpretation: 'The required reinforcement area As,req is calculated from the design moment using the appropriate capacity model (e.g. Whitney stress block for RC flexure). The provided area As,prov must be ≥ As,req. Always check minimum reinforcement (to control crack widths even under light loading) and maximum reinforcement (to ensure ductility is not lost through over-reinforcement).',
      practice: 'Bar layout must be constructable: minimum clear spacing to allow concrete to flow (typically maximum(1.5 × bar dia, max aggregate size + 5 mm, 25 mm)), maximum spacing to control crack widths, minimum cover for durability and fire. Reinforcement placement drawings must show every bar, its size, length, and cover — this information is non-negotiable for quality construction.',
      designThinking: 'The fundamental concept: place the reinforcement where the tensile stress is, provide enough of it to carry the required tensile force, and ensure it can develop its yield strength by being long enough (development length) and correctly anchored at discontinuities.',
      construction: 'Reinforcement must be positioned accurately during construction. Top bars in cantilevers and continuous beams are particularly critical — if pushed down by workers, the effective depth d decreases and the moment capacity reduces proportionally to d² (a 10% reduction in d reduces capacity by approximately 19%). Chairs, spacers, and ties maintain bar positions during concreting.',
      failureReasoning: 'Reinforcement-related failures: insufficient area (under-designed or incorrectly placed bars), inadequate development length (bar pulls out before yielding), corrosion (reduces area and bond), and inadequate ductility (bar fractures rather than yielding, preventing redistribution).',
      failureModes: ['Insufficient As: tensile demand exceeds yield force → premature cracking or yielding at that section.','Bar pull-out: development length inadequate → bar slips before reaching yield stress.','Corrosion: reduced bar area and loss of bond → reduced capacity over time.','Fracture: bar lacks sufficient ductility → brittle failure before redistribution.'],
      commonMistakes: ['Not checking minimum reinforcement — even lightly loaded members need minimum steel for crack control.','Omitting top reinforcement at supports of "simply supported" beams that actually have some continuity.','Not providing sufficient development length at bar curtailment points and at supports.'],
      troubleshooting: ['Problem: cracks wider than expected. Check if minimum reinforcement was provided for crack control, and whether bar spacing is within the serviceability limit.','Problem: bar pull-out in test or on site. Check development length — was the bar terminated before the required embedment?'],
      practicalQuestion: 'Is the reinforcement positioned where the tensile stress is, of sufficient area to carry the design force, and long enough to develop its full yield strength?',
      practicalQuestions: ['Is the reinforcement at the correct location (bottom for sagging, top for hogging)?','Has development length been checked at all curtailment and support points?','Has minimum reinforcement been provided for crack control?'],
      related: ['concrete-material','flexural-strength','stirrups','development-length','stress','strain','plasticity']
    }
  },

  {
    id: 'flexural-strength',
    title: 'Flexural Strength (Reinforced Concrete)',
    category: 'Reinforced Concrete',
    domain: 'Reinforced Concrete',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['moment','reinforcement','concrete-material','curvature','plasticity'],
    unlocks: ['stirrups','column','slab'],
    summary: 'The moment resistance of a reinforced concrete section, determined by the equilibrium of the compressive concrete stress block and the tensile reinforcement force at the nominal strength condition.',
    sections: {
      definition: 'The flexural strength (moment capacity) of an RC section is the largest bending moment the section can resist before failure. It is calculated at the nominal (ultimate) strength condition, where the extreme compressive fibre strain has reached the limiting value (approximately 0.003 per ACI 318), using the Whitney equivalent rectangular stress block to represent the parabolic compressive stress distribution.',
      physical: 'At the nominal strength condition, the compressed concrete above the neutral axis is at full strength (represented by a uniform stress block of intensity 0.85fc\'). The steel reinforcement below the neutral axis has yielded (stress = fy). Equilibrium of the compression block and the tension force gives the neutral axis depth; the moment arm between these two forces gives the moment capacity.',
      behaviour: 'Under-reinforced section (preferred): the reinforcement yields before the concrete crushes. The section shows visible cracking and deflection before failure — a ductile, warned failure. The neutral axis is relatively close to the compression face, and the moment arm is close to the full effective depth d. Over-reinforced section (undesirable): the concrete crushes before the reinforcement yields. The failure is sudden, brittle, and without warning. Design codes limit the maximum reinforcement ratio to prevent this.',
      loadPath: 'At the section of maximum moment: applied moment → compressive stress in concrete → neutral axis depth c → tensile force in reinforcement. The moment capacity is the couple of these two forces: compression force C × moment arm jd, or equivalently tension force T × jd.',
      equation: 'Whitney equivalent stress block: stress intensity = 0.85fc\', depth a = As fy / (0.85fc\' b). (Where As = steel area, fy = steel yield strength, fc\' = concrete compressive strength, b = beam width.) Nominal moment capacity: Mn = As fy (d − a/2). For design: Mu ≤ φMn, where φ = 0.9 for flexure (ACI 318). Required steel area: As = Mu / [φ fy (d − a/2)] (iterative, since a depends on As). Note: these are ACI 318 format; Eurocode uses a slightly different format with fcd and partial factors instead of φ.',
      analysis: 'Analysis gives the design moment Mu (factored). The section design gives the required steel area As. The iterative nature arises because a (the depth of the stress block) depends on As, which is the unknown. Start with an assumed moment arm jd ≈ 0.9d, calculate As, compute a, recalculate jd = d − a/2, and repeat. Usually converges in one iteration for lightly to moderately reinforced sections.',
      resultInterpretation: 'The ratio a/(0.85d) is the normalised neutral axis depth and indicates whether the section is approaching the over-reinforced condition. ACI 318 limits this through the net tensile strain check: at the extreme tension steel, the strain must be at least 0.004 (for transition) or 0.005 (for full φ = 0.9). If the strain is below 0.004, the section is too heavily reinforced for ductile behaviour and must be redesigned.',
      practice: 'In practice, the reinforcement required by flexure is calculated first, then checked for minimum and maximum limits, then adjusted for the constructable bar sizes and spacing. The actual provided area As,prov is rounded up to the nearest constructable bar arrangement. Recalculate a with As,prov and confirm φMn ≥ Mu.',
      designThinking: 'The most efficient flexural section maximises the moment arm jd by maximising the effective depth d. A deeper beam with less reinforcement is generally more efficient than a shallow beam with more steel, because depth increases both the moment arm and the compression zone depth — reducing the required reinforcement area.',
      construction: 'The effective depth d is measured from the extreme compression face to the centroid of the tension reinforcement. It depends on cover, bar size, and (for multiple layers) the distance to the centroid of the bar group. If cover is larger than specified (e.g. bars are lower than designed), d increases and capacity actually increases. If bars are higher than designed, d decreases and capacity reduces.',
      failureReasoning: 'Flexural failures: under-reinforced (ductile, warned, yield at tension steel followed by concrete crushing) or over-reinforced (brittle, sudden concrete crushing before steel yields). Code-required limits on reinforcement ratio prevent the over-reinforced condition. Real failures often combine flexure with shear or involve inadequate development length of the tension bars.',
      failureModes: ['Under-reinforced flexural failure (ductile): progressive yielding of tension steel, large deflection, then concrete crushing.','Over-reinforced flexural failure (brittle): sudden concrete crushing without prior yielding — prohibited by code.','Bond-controlled failure: bar pulls out before section can reach Mn.'],
      commonMistakes: ['Not checking the net tensile strain — a heavily reinforced section may have inadequate ductility.','Using the full depth h instead of the effective depth d in the capacity formula.','Ignoring compression reinforcement, which can increase Mn and improve ductility.','Using a singly-reinforced formula for a T-section where the flange significantly increases the compression zone.'],
      troubleshooting: ['Problem: required As exceeds the maximum allowed. Increase the section depth, add compression reinforcement, or increase fc\'.','Problem: moment capacity with provided bars significantly exceeds the demand. Check whether the compression zone is wide enough to develop the large compression force, and whether shear now governs.'],
      practicalQuestion: 'Is the reinforcement provided for this section placed at the correct depth, sufficient to carry the design moment, and limited to ensure a ductile (under-reinforced) failure mode?',
      practicalQuestions: ['Is the net tensile strain at the tension reinforcement greater than 0.005 (for full φ) or at least 0.004?','Has the effective depth d been correctly measured to the bar centroid (not bar face)?','For a T-section, has the flange contribution to the compression zone been included?'],
      related: ['moment','reinforcement','concrete-material','curvature','section-properties','stirrups','column']
    }
  },

  {
    id: 'stirrups',
    title: 'Shear Reinforcement (Stirrups)',
    category: 'Reinforced Concrete',
    domain: 'Reinforced Concrete',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['shear-force','shear-stress','reinforcement','concrete-material'],
    unlocks: ['development-length'],
    summary: 'Transverse reinforcement loops that resist diagonal tension in RC beams, preventing brittle shear failure and confining the concrete core.',
    sections: {
      definition: 'Stirrups (or links) are closed loops of reinforcement placed transversely through a beam web to resist shear and diagonal tension. They intercept the diagonal tension cracks that form at approximately 45° to the beam axis and carry the tension that the cracked concrete can no longer carry. Stirrups also confine the concrete core (important for column ductility) and prevent the longitudinal bars from buckling under compression.',
      physical: 'Under shear, diagonal tension cracks form at approximately 45° to the beam axis. In a beam without stirrups, these cracks propagate quickly across the full depth and cause sudden brittle failure. Stirrups intercept these cracks: each stirrup crossing the crack carries tension, preventing crack widening and allowing load redistribution. More stirrups (closer spacing) means more potential crack interception and higher shear capacity.',
      behaviour: 'RC shear behaviour is modelled by the truss analogy: the longitudinal reinforcement is the horizontal tension chord, the concrete compression zone is the compression chord, the diagonal concrete compression struts are the truss diagonals, and the stirrups are the vertical tension members. This conceptual model leads directly to the shear design equation.',
      loadPath: 'Vertical shear at a section → diagonal tension in the concrete at 45° → tension in stirrups crossing the diagonal crack → vertical component of stirrup tension resists the shear.',
      equation: 'Design shear strength (ACI 318 format): Vn = Vc + Vs, where Vc = 2√fc\' × bw × d / 6 (concrete contribution, simplified version in MPa units) and Vs = Av × fy × d / s (steel contribution, s = stirrup spacing). Minimum stirrups where Vu > φVc/2: Av,min = 0.062√fc\' × bw × s / fy. Maximum stirrup spacing: d/2 (or 600 mm) where Vs ≤ 4√fc\' × bw × d; d/4 (or 300 mm) where Vs > 4√fc\' × bw × d. Note: Eurocode 2 uses a variable strut angle model that gives different results; always use the applicable code.',
      analysis: 'Analysis gives the design shear Vu at the critical section (typically at distance d from the face of a support). Compare Vu against φVc (concrete capacity). Where Vu > φVc, stirrups are required for the excess: Av/s ≥ (Vu − φVc) / (φ fy d).',
      resultInterpretation: 'Shear demand is highest near supports. Stirrup spacing should be smallest near supports and can increase toward midspan where shear decreases. The stirrup spacing at the critical section (d from support face) governs the most heavily loaded region.',
      practice: 'Use closed stirrups — open links cannot intercept diagonal cracks that pass above the horizontal leg and cannot provide confinement. Ensure correct cover to stirrups: the stirrup cover determines the cover to the longitudinal bar, so under-cover stirrups also reduce effective depth. In seismic design, use 135° hooks at stirrup ends (not 90°) to prevent the hook from opening under reversed cyclic loading.',
      designThinking: 'Shear failure is more dangerous than flexural failure in RC because it is more brittle and gives less warning. Always check shear before declaring a beam adequate. The critical check is at the support, not at midspan.',
      construction: 'Stirrups must be placed at the designed spacing with correct cover. Stirrup spacing errors (wider than designed) reduce shear capacity proportionally to the spacing ratio. Links that are not properly closed (hooks not bent correctly) provide minimal shear resistance.',
      failureReasoning: 'Without adequate stirrups, a diagonal tension crack forms and propagates across the beam depth in seconds once it initiates — a brittle and sudden failure. Even with stirrups, failure can occur if: the concrete compression strut crushes (diagonal compression failure, set by maximum Vn in code), the longitudinal bars lose anchorage at the support, or the stirrup hook opens under load.',
      failureModes: ['Diagonal tension failure: crack propagates across the depth in the absence of adequate stirrups.','Diagonal compression failure: concrete strut crushes between stirrups when Vu is extremely high.','Sliding shear: failure along a pre-existing crack plane (e.g. construction joint) — requires specific shear-friction design.'],
      commonMistakes: ['Using open links instead of closed stirrups.','Not providing stirrups where Vu > φVc/2 (minimum stirrups are required even when shear is low).','Not checking the maximum shear limit (to prevent diagonal compression failure).','Not using 135° hooks in seismic applications.'],
      troubleshooting: ['Problem: shear check fails even with closely spaced stirrups. The section size must be increased to reduce the unit shear stress below the maximum limit.','Problem: stirrups are required over the full span. Check whether the section depth is too small for the applied load — a deeper section may eliminate stirrups in the low-shear region.'],
      practicalQuestion: 'At every location along this beam where Vu > φVc/2, are closed stirrups provided at a spacing that satisfies both the required area per spacing and the maximum spacing limit?',
      practicalQuestions: ['Is the shear capacity check done at the critical section (d from support face)?','Have minimum stirrups been provided where required?','Are the stirrups closed loops with proper hooks?'],
      related: ['shear-force','shear-stress','reinforcement','concrete-material','development-length','beam']
    }
  },

  {
    id: 'development-length',
    title: 'Development Length and Anchorage',
    category: 'Reinforced Concrete',
    domain: 'Reinforced Concrete',
    level: 'Intermediate',
    levelNum: 1,
    status: 'complete',
    prerequisites: ['reinforcement','concrete-material','stress','flexural-strength'],
    unlocks: [],
    summary: 'The minimum embedment length required for a reinforcing bar to develop its full yield stress through bond with the surrounding concrete before being pulled out or slipping.',
    sections: {
      definition: 'Development length ld is the minimum length of straight reinforcing bar that must be embedded in concrete to transfer the full yield force (fy × Ab) from the bar to the concrete through bond. If the available length is less than ld, the bar will pull out before reaching yield, and the section cannot achieve its calculated capacity. Anchorage is the general requirement that every bar must be embedded sufficiently or provided with a hook/mechanical end anchorage to develop its required force.',
      physical: 'Bond stress is the shear stress at the interface between bar and concrete. For a straight bar, bond stress is distributed over the embedded length. To develop the full yield force fy × Ab, the bond stress must be integrated over enough length that the total force equals fy × Ab. Larger bar diameter requires longer development length (proportional to db² for the force, but only proportional to db for the bond area — hence ld proportional to db). Higher concrete strength improves bond (ld proportional to 1/√fc\'). Standard hooks (90° or 180° bend) provide mechanical bearing and reduce the required straight bar length.',
      behaviour: 'Development length is a function of: bar size (larger = longer ld), yield strength (higher fy = longer ld, because more force to develop), concrete strength (higher fc\' = shorter ld, because better bond), bar spacing and cover (more confinement = shorter ld), and transverse reinforcement (stirrups confine the concrete and prevent splitting = shorter ld).',
      loadPath: 'At every location where a bar is required to carry its yield stress (at the critical section, at bar cutoff points, at laps), the bar must be embedded at least ld into the concrete on each side of that point. The force is transferred from bar to concrete over this length through bond — this is the load path within the cross-section.',
      equation: 'ACI 318-19 basic development length (simplified form): ld = (3/40) × (fy / (λ √fc\')) × (ψt ψe ψs) × db, where fy and fc\' are in psi, and ψt, ψe, ψs are modification factors for bar location, epoxy coating, and bar size. In SI (MPa): ld = (fy db) / (c1 √fc\') where c1 is an empirical constant depending on confinement conditions. For standard 90° hook: ldh ≈ (0.7 × basic hook development length). Note: exact formulas depend on the applicable code (ACI 318, Eurocode 2, AS 3600); use the appropriate standard.',
      analysis: 'Development length is not directly calculated by structural analysis software — it must be checked manually in the design phase by the reinforcement detailer. The critical locations are: at supports (bottom bars must be anchored into the support), at midspan (top bars for pattern loading must extend past the inflection point), at bar curtailment points (where a bar terminates in a zone that still requires some moment capacity), and at splices.',
      resultInterpretation: 'If the available anchorage length is less than ld, the bar cannot develop its design stress — reduce the bar size (smaller diameter = shorter ld), increase the embedment, use a hook, or provide more transverse reinforcement. In detailing of RC structures, development length often drives bar layout more than the force requirements.',
      practice: 'In practice, development length tables from the applicable code or a design aid are used rather than calculating from first principles for every bar. The key is to identify every critical point where a bar must develop its full yield force and to confirm that ld is available at each point.',
      designThinking: 'Development length is the connection between analysis and construction. The analysis calculates how much force a bar must carry; the development length requirement ensures the bar can actually carry that force in the built structure. Shortfalls in development length — bars too short, hooks missing, inadequate cover — convert a theoretically adequate design into an inadequate built structure.',
      construction: 'Development length violations are common construction defects: bars that are too short cut by mistake, hooks that are not bent, or bars placed with insufficient cover. These defects are invisible after the concrete is poured. Quality inspection of reinforcement placement before concreting is the only effective control.',
      failureReasoning: 'Bar pull-out failure (slip before yield) is a brittle failure: the bond suddenly breaks along the development length and the bar slides through the concrete, losing all capacity. Unlike flexural failure (which shows visible cracking and deflection as warning), bond-pull-out failure can occur suddenly with little prior indication.',
      failureModes: ['Bar pull-out: embedment length less than ld; bar slides before yielding; brittle failure.','Splitting along bar: concrete splits along the bar under high bond stress if cover or transverse reinforcement is inadequate.','Hook failure: hook is not fully effective due to poor geometry or insufficient tail length.'],
      commonMistakes: ['Curtailing bars at the theoretical curtailment point without adding the required extension for shear and bond.','Using straight bars where hooks are required due to space constraints.','Not providing development length into the support for bottom tension bars at simply supported spans.'],
      troubleshooting: ['Problem: calculated ld is too long for available space. Use hooks, increase concrete strength, add more transverse reinforcement, or use smaller diameter bars.','Problem: curtailment point seems to be in a high-shear zone. Check code rules — bars must extend beyond the theoretical cut-off by at least d or 12db.'],
      practicalQuestion: 'At every bar cutoff, support, and splice in this structure, is the available embedment length at least equal to the required development length?',
      practicalQuestions: ['Is ld available at each support for the bottom tension reinforcement?','Do top bars extend past the point of inflection with the required extension beyond it?','At each lap splice, is the lap length at least equal to the required lap length?'],
      related: ['reinforcement','concrete-material','flexural-strength','stirrups','stress']
    }
  },


]; // end of knowledge array

// ============================================================================
// EXPORTS
// ============================================================================

export const knowledgeById = new Map(knowledge.map((k) => [k.id, k]));

export const categories = [...new Set(knowledge.map((k) => k.category))];

export const domains = [...new Set(knowledge.map((k) => k.domain))];

export const byDomain = domains.reduce((acc, d) => {
  acc[d] = knowledge.filter((k) => k.domain === d);
  return acc;
}, {});

export const byLevel = [0, 1, 2, 3].reduce((acc, n) => {
  acc[n] = knowledge.filter((k) => k.levelNum === n);
  return acc;
}, {});

// ============================================================================
// SEARCH — ranked by relevance
// ============================================================================

const STOP = new Set([
  'an','the','is','are','was','were','be','what','why','how','when','where',
  'which','who','does','do','did','can','could','should','would','will','of',
  'in','on','at','to','for','and','or','it','its','this','that','with','about',
  'explain','tell','me','my','if','happens','happen','a','i','we','they',
]);

const stem = (w) => w.replace(/(ing|ed|es|s|e)$/, '');

const tokens = (t) =>
  (String(t).toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem)
    .filter(Boolean);

// Prefix match for fragments like "stiff" matching "stiffness"
const has = (list, t) =>
  list.includes(t) || (t.length >= 4 && list.some((w) => w.startsWith(t)));

function score(k, qt) {
  const idTokens     = tokens(k.id.replace(/-/g, ' '));
  const titleTokens  = tokens(k.title);
  const summTokens   = tokens(k.summary);
  const defTokens    = tokens(k.sections?.definition ?? '');
  const physTokens   = tokens(k.sections?.physical ?? '');
  const equTokens    = tokens(k.sections?.equation ?? '');
  const relTokens    = (k.sections?.related ?? []).flatMap((r) =>
    tokens(r.replace(/-/g, ' '))
  );
  return qt.reduce(
    (s, t) =>
      s +
      (has(idTokens, t)    ? 8 : 0) +  // ID is strongest signal
      (has(titleTokens, t) ? 5 : 0) +
      (has(summTokens, t)  ? 2 : 0) +
      (has(defTokens, t)   ? 2 : 0) +
      (has(physTokens, t)  ? 1 : 0) +
      (has(equTokens, t)   ? 1 : 0) +
      (has(relTokens, t)   ? 1 : 0),
    0
  );
}

/**
 * findKnowledge — natural language lookup
 * Returns the best-matching concept or undefined if nothing scores above 0.
 */
export function findKnowledge(q) {
  const qt = [...new Set(tokens(q))];
  if (!qt.length) return undefined;
  let best;
  let bestScore = 0;
  for (const k of knowledge) {
    const sc = score(k, qt);
    if (sc > bestScore) {
      best = k;
      bestScore = sc;
    }
  }
  return best;
}

/**
 * searchKnowledge — returns an array of matches ranked by score
 * Useful for search results UI (shows multiple candidates, not just the top one).
 */
export function searchKnowledge(q, limit = 10) {
  const qt = [...new Set(tokens(q))];
  if (!qt.length) return [];
  return knowledge
    .map((k) => ({ k, sc: score(k, qt) }))
    .filter(({ sc }) => sc > 0)
    .sort((a, b) => b.sc - a.sc)
    .slice(0, limit)
    .map(({ k }) => k);
}

/**
 * getPrerequisites — returns the full prerequisite chain for a concept
 * (recursive, handles nested prerequisites)
 */
export function getPrerequisites(id, visited = new Set()) {
  if (visited.has(id)) return [];
  visited.add(id);
  const k = knowledgeById.get(id);
  if (!k) return [];
  const prereqs = k.prerequisites ?? [];
  const upstream = prereqs.flatMap((p) => getPrerequisites(p, visited));
  return [...new Set([...upstream, ...prereqs])];
}

/**
 * getUnlockedBy — returns all concepts that list this id in their prerequisites
 */
export function getUnlockedBy(id) {
  return knowledge.filter((k) => (k.prerequisites ?? []).includes(id));
}
