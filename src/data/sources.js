/**
 * STRUCTIQ — Knowledge Source Registry
 *
 * Add records only when source metadata has been verified.
 *
 * Required fields:
 * id, title, publisher, documentType, reviewStatus
 *
 * Optional fields:
 * author, year, edition, url, jurisdiction,
 * verifiedAt, licensing
 *
 * @typedef {Object} KnowledgeSource
 * @property {string} id
 * @property {string} title
 * @property {string} publisher
 * @property {string} documentType
 * @property {'unreviewed'|'metadata-verified'|'technical-content-reviewed'} reviewStatus
 * @property {string} [author]
 * @property {number} [year]
 * @property {string} [edition]
 * @property {string} [url]
 * @property {string} [jurisdiction]
 * @property {string} [verifiedAt]
 * @property {string} [licensing]
 */

/** @type {KnowledgeSource[]} */
export const sources = [];

export const sourceById = new Map(
  sources.map((source) => [source.id, source])
);

export const SOURCE_REVIEW_STATUSES = Object.freeze([
  'unreviewed',
  'metadata-verified',
  'technical-content-reviewed',
]);