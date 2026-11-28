export const EDITORIAL_REVIEW_STATUSES = Object.freeze([
  'not-reviewed',
  'editorially-reviewed',
  'technical-review-complete',
]);

const REVIEWED_STATUSES = new Set([
  'editorially-reviewed',
  'technical-review-complete',
]);

function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Validate optional editorial review metadata for a knowledge concept. */
export function validateEditorialReview(review, conceptId = 'concept') {
  if (review === undefined) return [];

  const label = `${conceptId}: editorial review`;
  if (!review || typeof review !== 'object' || Array.isArray(review)) {
    return [`${label} metadata must be an object`];
  }

  const errors = [];
  if (!EDITORIAL_REVIEW_STATUSES.includes(review.status)) {
    errors.push(`${label} status is invalid`);
  }

  if (review.reviewer !== undefined && (typeof review.reviewer !== 'string' || !review.reviewer.trim())) {
    errors.push(`${label} reviewer must be a non-empty string`);
  }
  if (review.reviewedAt !== undefined && !isIsoDate(review.reviewedAt)) {
    errors.push(`${label} date must be a valid ISO date (YYYY-MM-DD)`);
  }
  if (review.notes !== undefined && typeof review.notes !== 'string') {
    errors.push(`${label} notes must be a string`);
  }

  if (REVIEWED_STATUSES.has(review.status)) {
    if (typeof review.reviewer !== 'string' || !review.reviewer.trim()) {
      errors.push(`${label} reviewer is required for a reviewed record`);
    }
    if (!isIsoDate(review.reviewedAt)) {
      errors.push(`${label} valid review date is required for a reviewed record`);
    }
  }

  return errors;
}
