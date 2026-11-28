# StructIQ Engineering Review Loop

Use this workflow for every engineering calculation or analysis feature. The root `AGENTS.md` is the permanent task protocol; this document describes the practical review checkpoints.

## Theory and model definition

Write the model schema and units before implementation. State boundary conditions, degrees of freedom, sign conventions, idealisations and omitted behaviour. Derive governing relationships and calculate independent hand benchmarks before trusting code output.

## Test-first numerical work

Keep numerical functions pure and browser-independent. Tests should cover hand benchmarks and at least one separate check for each result family: global equilibrium, internal/member equilibrium, compatibility and boundary conditions as applicable. Add dimensional checks, invalid and boundary inputs, singular systems, limiting cases, symmetry, superposition and load scaling. Reference values must not call the implementation under test.

## Independent verification

For each benchmark, show the external free-body equations and the expected forces/displacements independently. Check stiffness symmetry, residuals, sign conventions and units. Review diagrams against computed values and event/discontinuity locations. A passing suite supports confidence but does not prove engineering correctness.

## Failure handling

Reject malformed and unstable models with actionable errors. Do not silently insert supports, member properties or design assumptions. Never return NaN as an analysis result or present stale results after an edit. Distinguish a solver result from design-code resistance checks.

## Integration and release review

Verify routing, keyboard operation, labels, mobile layout, result freshness, error state and existing features. Run `npm run engineering:check` and `git diff --check`. Inspect the whole diff, tests and output. Repeat the relevant numerical tests after each correction, then rerun the full command. Do not change expected values or suppress failures to obtain a green build.

## Current Studio scope

The beam implementation is a first-order simply supported, prismatic beam with downward point loads and piecewise constant downward UDLs. The truss implementation is a linear-elastic, small-displacement, axial-only 2D direct-stiffness model. Neither calculates design resistance, code compliance, beam deflection, buckling capacity, geometric/material nonlinearity or construction stages. Both are educational and require independent professional verification before any engineering use.
