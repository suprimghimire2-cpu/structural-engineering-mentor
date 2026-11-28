import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEditorialReview } from './editorialReview.js';

test('missing editorial review metadata is valid', () => {
  assert.deepEqual(validateEditorialReview(undefined), []);
});

test('valid not-reviewed record is accepted', () => {
  assert.deepEqual(validateEditorialReview({ status: 'not-reviewed' }), []);
});

test('valid editorial review record is accepted', () => {
  assert.deepEqual(validateEditorialReview({ status: 'editorially-reviewed', reviewer: 'A. Reviewer', reviewedAt: '2026-05-20', notes: 'Editorial pass.' }), []);
});

test('valid technical review record is accepted', () => {
  assert.deepEqual(validateEditorialReview({ status: 'technical-review-complete', reviewer: 'B. Engineer', reviewedAt: '2026-05-21' }), []);
});

test('invalid review status is rejected', () => {
  assert.ok(validateEditorialReview({ status: 'complete' }).some((error) => error.includes('status is invalid')));
});

test('reviewed record requires reviewer', () => {
  assert.ok(validateEditorialReview({ status: 'editorially-reviewed', reviewedAt: '2026-05-20' }).some((error) => error.includes('reviewer is required')));
});

test('reviewed record requires review date', () => {
  assert.ok(validateEditorialReview({ status: 'technical-review-complete', reviewer: 'B. Engineer' }).some((error) => error.includes('valid review date is required')));
});

test('invalid calendar date is rejected', () => {
  assert.ok(validateEditorialReview({ status: 'not-reviewed', reviewedAt: '2026-02-30' }).some((error) => error.includes('valid ISO date')));
});

test('invalid metadata structures and field types are rejected', () => {
  assert.ok(validateEditorialReview([]).some((error) => error.includes('must be an object')));
  assert.ok(validateEditorialReview({ status: 'not-reviewed', notes: 5 }).some((error) => error.includes('notes must be a string')));
});
