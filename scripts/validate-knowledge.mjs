import { knowledge } from '../src/data/knowledge.js';
import { sources } from '../src/data/sources.js';
import { validateSources } from '../src/data/sourceValidation.js';
import { validateEditorialReview } from '../src/data/editorialReview.js';
import { learningPaths } from '../src/data/learningPaths.js';
import { findPrerequisiteCycles, validateLearningPaths } from '../src/data/learningPathValidation.js';

const REQUIRED = ['definition','physical','behaviour','loadPath','equation','analysis',
  'resultInterpretation','practice','designThinking','construction','failureReasoning','related'];
const REQUIRED_NEW_CONCEPTS = ['compatibility','principle-of-virtual-work','unit-load-method','moment-area-method',
  'conjugate-beam-method','method-of-joints','method-of-sections','flexibility-method','matrix-stiffness-method',
  'slope-deflection-method','influence-lines','muller-breslau-principle'];
const ids = new Set(knowledge.map((k) => k.id));
const errors = [], warnings = [];

if (ids.size !== knowledge.length) errors.push('Duplicate concept ids');
if (knowledge.length !== 66) errors.push(`Expected 66 concepts after the 12-concept expansion; found ${knowledge.length}`);
for (const id of REQUIRED_NEW_CONCEPTS) if (!ids.has(id)) errors.push(`Missing structural analysis concept "${id}"`);
errors.push(...validateSources(sources, knowledge));
errors.push(...validateLearningPaths(learningPaths, knowledge));
for (const k of knowledge) {
  errors.push(...validateEditorialReview(k.editorialReview, k.id));
  for (const f of REQUIRED) if (!k.sections?.[f]) errors.push(k.id + ': missing "' + f + '"');
  for (const r of k.sections?.related ?? [])
    if (!ids.has(r)) warnings.push(k.id + ': related "' + r + '" has no entry yet');
}
const stubs = [...new Set(warnings.map((w) => w.split('"')[1]))];
console.log(knowledge.length + ' concepts checked.');
console.log(learningPaths.length + ' learning path(s) checked.');
const prerequisiteCycles = findPrerequisiteCycles(knowledge);
const newAnalysisIds = new Set(['compatibility','principle-of-virtual-work','unit-load-method','moment-area-method','conjugate-beam-method','method-of-joints','method-of-sections','flexibility-method','matrix-stiffness-method','slope-deflection-method','influence-lines','muller-breslau-principle']);
const newConceptCycles = prerequisiteCycles.filter((cycle) => cycle.some((id) => newAnalysisIds.has(id)));
if (newConceptCycles.length) errors.push(...newConceptCycles.map((cycle) => 'Prerequisite cycle: ' + cycle.join(' -> ')));
else if (prerequisiteCycles.length) console.warn(prerequisiteCycles.length + ' pre-existing prerequisite cycle(s) found outside the new concepts.');
errors.forEach((e) => console.error('ERROR  ', e));
console.log(stubs.length + ' related ids still unwritten:\n  ' + stubs.join(', '));
process.exit(errors.length ? 1 : 0);
