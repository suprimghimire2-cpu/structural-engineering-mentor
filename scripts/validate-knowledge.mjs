import { knowledge } from '../src/data/knowledge.js';
import { sources } from '../src/data/sources.js';
import { validateSources } from '../src/data/sourceValidation.js';
import { validateEditorialReview } from '../src/data/editorialReview.js';

const REQUIRED = ['definition','physical','behaviour','loadPath','equation','analysis',
  'resultInterpretation','practice','designThinking','construction','failureReasoning','related'];
const ids = new Set(knowledge.map((k) => k.id));
const errors = [], warnings = [];

if (ids.size !== knowledge.length) errors.push('Duplicate concept ids');
errors.push(...validateSources(sources, knowledge));
for (const k of knowledge) {
  errors.push(...validateEditorialReview(k.editorialReview, k.id));
  for (const f of REQUIRED) if (!k.sections?.[f]) errors.push(k.id + ': missing "' + f + '"');
  for (const r of k.sections?.related ?? [])
    if (!ids.has(r)) warnings.push(k.id + ': related "' + r + '" has no entry yet');
}
const stubs = [...new Set(warnings.map((w) => w.split('"')[1]))];
console.log(knowledge.length + ' concepts checked.');
errors.forEach((e) => console.error('ERROR  ', e));
console.log(stubs.length + ' related ids still unwritten:\n  ' + stubs.join(', '));
process.exit(errors.length ? 1 : 0);
