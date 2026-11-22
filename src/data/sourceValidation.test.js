import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateSources } from './sourceValidation.js';

const validSource = { id: 'ref-1', title: 'Verified title', publisher: 'Verified publisher', documentType: 'text', reviewStatus: 'unreviewed' };

test('empty source registry is valid', () => assert.deepEqual(validateSources([], []), []));
test('valid source and concept reference resolve', () => assert.deepEqual(validateSources([validSource], [{ id: 'concept-1', sourceIds: ['ref-1'] }]), []));
test('duplicate source ID is rejected', () => assert.ok(validateSources([validSource, validSource]).some((e) => e.includes('duplicate source ID'))));
test('invalid URL is rejected', () => assert.ok(validateSources([{ ...validSource, url: 'javascript:alert(1)' }]).some((e) => e.includes('HTTP or HTTPS'))));
test('missing required metadata is rejected', () => assert.ok(validateSources([{ id: 'ref-2' }]).some((e) => e.includes('title is required'))));
test('unknown concept source ID is rejected', () => assert.ok(validateSources([], [{ id: 'concept-1', sourceIds: ['missing'] }]).some((e) => e.includes('unknown source ID'))));
test('invalid review status is rejected', () => assert.ok(validateSources([{ ...validSource, reviewStatus: 'approved' }]).some((e) => e.includes('review status is invalid'))));
test('duplicate source IDs within a concept are rejected', () => assert.ok(validateSources([validSource], [{ id: 'concept-1', sourceIds: ['ref-1', 'ref-1'] }]).some((e) => e.includes('duplicate source IDs'))));
