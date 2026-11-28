# Structural Analysis Studio — verification record

## Model conventions

### Beam

Input schema: `{ spanM, pointLoads: [{id, positionM, magnitudeKN}], udlSegments: [{id, startM, endM, magnitudeKNPerM}] }`. Supports are a pin at A and roller at B. Coordinates are metres; loads and reactions are kN; shear is kN; moment is kN·m. Downward applied load is entered positive, reactions are upward-positive, positive shear is `RA` minus downward loads to the left, and positive bending moment is sagging. Point loads at an event have distinct left- and right-side shear values. The moment remains continuous.

Reactions follow global equilibrium: `RB = Σ(Pa + W x̄)/L`, `RA = ΣP + ΣW − RB`; for a UDL on `[a,b]`, `W=w(b−a)` and `x̄=(a+b)/2`. Shear and moment follow the beam section free body. UDL event boundaries and point-load positions partition exact intervals; shear is linear within each interval and moment stationary points are found from `V=0`. The diagram polyline is a visual rendering; reported extrema use event and stationary-point evaluation, not sampled maxima.

### Plane truss

Input schema: nodes `{id,xM,yM}`, members `{id,startNode,endNode,elasticModulusGPa,areaMM2}`, supports `{nodeId,restrainX,restrainY}`, loads `{nodeId,fxKN,fyKN}`. Coordinates are m, `E` is GPa, area mm² and applied nodal forces kN. Results are translations mm, member axial force kN, strain dimensionless and stress MPa. Tension-positive member force; negative means compression.

For each member, `L=sqrt(dx²+dy²)`, `c=dx/L`, and `s=dy/L`. Before assembly, `E` is converted from GPa to Pa, area from mm² to m², and applied load from kN to N. The stiffness matrix is assembled in N/m, and the reduced system `Kff df=Ff` is solved for displacements in metres using dense Gaussian elimination with partial pivoting. Reactions are `Kd−F` at restrained DOFs and are converted to kN for display. Member axial force is recovered from the solved projected extension in N, then reported in kN; stress is reported in MPa. No automatic restraints or stiffnesses are added.

## Benchmarks

### Beam 1: central point load

`L=6 m`, `P=20 kN` at `a=3 m`: `RA=RB=10 kN`; `V=+10 kN` to the left of the load and `−10 kN` to its right; `Mmax=PL/4=30 kN·m` at 3 m.

### Beam 2: full-span UDL

`L=6 m`, `w=10 kN/m`: total load 60 kN, `RA=RB=30 kN`; `M(x)=30x−5x²`; maximum at `V=30−10x=0`, hence `x=3 m`, `Mmax=45 kN·m`.

### Beam 3: mixed loads

`L=8 m`; 12 kN at 2 m; 8 kN at 6 m; 4 kN/m on `[1,5]`. Total load 36 kN and applied moment about A 120 kN·m, so `RB=15 kN`, `RA=21 kN`. At 2 m, `M=40 kN·m`; within the UDL after the first point load, `V=5−4(x−2)`, so the positive moment maximum occurs at `x=3.25 m`, `M=43.125 kN·m`. At 5 m, `M=37 kN·m`.

### Truss 1: symmetric triangle

Nodes A(0,0), B(6,0), C(3,4) m; members AB, AC, BC; A pin and B vertical roller; 30 kN downward at C; all `E=200 GPa`, `A=1000 mm²`. Joint equilibrium gives reactions `(Ax,Ay,By)=(0,15,15) kN`; `AB=+11.25 kN`, `AC=BC=−18.75 kN`. Stiffness solution gives B horizontal displacement 0.3375 mm, C `(ux,uy)=(0.16875,−0.7125) mm`. These displacement references follow member elongations and geometry, independently of the solver.

### Truss 2: two-panel Warren form

Nodes A(0,0), B(3,0), C(6,0), D(1.5,2), E(4.5,2) m. Members AB, BC, AD, DB, BE, EC, DE. Supports A pin and C vertical roller; 20 kN downward at B; all `E=200 GPa`, `A=1000 mm²`. Symmetry and joint equilibrium give reactions 10 kN at A and C; `AB=BC=+7.5 kN`, `AD=EC=−12.5 kN`, `DB=BE=+12.5 kN`, `DE=−15 kN`.

### Truss 3: unstable model

The starter has two members in a three-node triangle with A fixed in x/y and B restrained only in y. The apex has no complete axial load path; the reduced stiffness is singular. Analysis must reject it with an instability/restraint explanation.

## Verification matrix

Beam tests cover point and distributed loading, partial and separate UDL segments, multiple loads, endpoints, zero load, equilibrium, exact extrema, shear jumps, moment continuity, superposition, scaling, deterministic load-position cases, duplicates and invalid spans/load data. Truss tests cover both determinate benchmarks, stiffness entries and symmetry, reactions, member force/stress/displacement units, free and global residuals, deterministic mixed-load scaling, zero loads, malformed references/properties, duplicate IDs, zero length, small/large stiffness and unstable models.

## Limitations and disclaimer

Beam deflection is not implemented. Beam loads are downward only. Truss modelling excludes bending stiffness, out-of-plane response, geometric/material nonlinearity, buckling capacity, connection eccentricity, code resistance and construction sequencing. Dense solution is intended for small educational models, not large production systems. The Studio is educational, not certified, not design-code compliant and not suitable as sole basis for construction or project design. Independently verify all engineering decisions.
