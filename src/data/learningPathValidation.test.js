import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPrerequisiteCycles, validateLearningPaths } from './learningPathValidation.js';

const concepts = [
  { id: 'a', prerequisites: [] }, { id: 'b', prerequisites: ['a'] },
  { id: 'c', prerequisites: ['b'] },
];
const stage = (id, conceptIds = ['a']) => ({ id, title: `Stage ${id}`, objective: 'Learn a method.', conceptIds, prerequisiteKnowledge: 'Statics.', outcome: 'Solve an example.' });
const path = (stages = Array.from({ length: 6 }, (_, i) => stage(`s${i + 1}`))) => ({ id: 'path', title: 'Analysis pathway', description: 'A recommended sequence.', stages });

test('valid six-stage learning path passes', () => assert.deepEqual(validateLearningPaths([path()], concepts), []));
test('duplicate path and stage IDs are rejected', () => assert.ok(validateLearningPaths([path([stage('same'), stage('same'), ...Array.from({length:4},(_,i)=>stage(`x${i}`))]), path()], concepts).some((e) => e.includes('duplicate'))));
test('empty stage objective is rejected', () => { const stages = Array.from({length:6},(_,i)=>stage(`s${i}`)); stages[0].objective=' '; assert.ok(validateLearningPaths([path(stages)], concepts).some((e)=>e.includes('objective is required'))); });
test('unknown and repeated concept references are rejected', () => { const stages=Array.from({length:6},(_,i)=>stage(`s${i}`,['missing','missing'])); const errors=validateLearningPaths([path(stages)],concepts); assert.ok(errors.some((e)=>e.includes('unknown concept'))); assert.ok(errors.some((e)=>e.includes('repeated concept'))); });
test('path requires six stages', () => assert.ok(validateLearningPaths([path([stage('only')])], concepts).some((e)=>e.includes('six stages'))));
test('prerequisite cycles are detected', () => assert.equal(findPrerequisiteCycles([{id:'a',prerequisites:['b']},{id:'b',prerequisites:['a']}]).length,1));
test('prerequisite earlier in the same stage is valid', () => {
  const stages = [stage('s1', ['a','b']), ...Array.from({length:5},(_,i)=>stage(`s${i+2}`))];
  assert.deepEqual(validateLearningPaths([path(stages)], concepts), []);
});
test('dependent before prerequisite in the same stage is invalid', () => {
  const stages = [stage('s1', ['b','a']), ...Array.from({length:5},(_,i)=>stage(`s${i+2}`))];
  assert.ok(validateLearningPaths([path(stages)], concepts).some((error)=>error.includes('prerequisite "a" must appear before')));
});
test('prerequisite appearing in a later stage is invalid', () => {
  const stages = [stage('s1',['b']),stage('s2',['a']),...Array.from({length:4},(_,i)=>stage(`s${i+3}`))];
  assert.ok(validateLearningPaths([path(stages)], concepts).some((error)=>error.includes('prerequisite "a" must appear before')));
});
test('prerequisite in an earlier stage is valid', () => {
  const stages = [stage('s1',['a']),stage('s2',['b']),...Array.from({length:4},(_,i)=>stage(`s${i+3}`))];
  assert.deepEqual(validateLearningPaths([path(stages)], concepts), []);
});
