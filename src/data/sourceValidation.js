import { SOURCE_REVIEW_STATUSES } from './sources.js';

export function validateSources(sources, concepts = []) {
  const errors = [];
  const sourceIds = new Set();

  for (const [index, source] of sources.entries()) {
    const label = source.id || `source at index ${index}`;
    if (typeof source.id !== 'string' || !source.id.trim()) errors.push(`${label}: source ID is required`);
    else if (sourceIds.has(source.id)) errors.push(`${source.id}: duplicate source ID`);
    else sourceIds.add(source.id);

    for (const field of ['title', 'publisher', 'documentType']) {
      if (typeof source[field] !== 'string' || !source[field].trim()) errors.push(`${label}: ${field} is required`);
    }
    if (source.url !== undefined) {
      try {
        const url = new URL(source.url);
        if (!['http:', 'https:'].includes(url.protocol)) errors.push(`${label}: URL must use HTTP or HTTPS`);
      } catch {
        errors.push(`${label}: URL is invalid`);
      }
    }
    if (source.year !== undefined && (!Number.isInteger(source.year) || source.year < 1 || source.year > new Date().getUTCFullYear())) {
      errors.push(`${label}: publication year is invalid`);
    }
    if (!SOURCE_REVIEW_STATUSES.includes(source.reviewStatus)) errors.push(`${label}: review status is invalid`);
  }

  for (const concept of concepts) {
    const refs = concept.sourceIds ?? [];
    if (new Set(refs).size !== refs.length) errors.push(`${concept.id}: duplicate source IDs`);
    for (const sourceId of refs) {
      if (!sourceIds.has(sourceId)) errors.push(`${concept.id}: unknown source ID "${sourceId}"`);
    }
  }

  return errors;
}
