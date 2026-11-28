import React from 'react';
import { sourceById } from '../data/sources.js';

const sourceReviewLabels = {
  unreviewed: 'Reference not reviewed',
  'metadata-verified': 'Metadata verified',
  'technical-content-reviewed': 'Technical content reviewed',
};

const editorialReviewLabels = {
  'not-reviewed': 'Not reviewed',
  'editorially-reviewed': 'Editorially reviewed',
  'technical-review-complete': 'Technical review complete',
};

function safeHttpUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export default function SourceReviewPanel({ concept }) {
  const review = concept.editorialReview;
  const sourceIds = Array.isArray(concept.sourceIds) ? concept.sourceIds : [];

  return (
    <section className="sourceReviewPanel" aria-label="Editorial review and supporting references">
      <section className="reviewBlock" aria-labelledby="concept-review-heading">
        <h3 id="concept-review-heading">Concept editorial review</h3>
        {review ? (
          <>
            <p><span className="reviewStatus">{editorialReviewLabels[review.status] ?? review.status}</span></p>
            {(review.reviewer || review.reviewedAt) && (
              <dl className="reviewMetadata">
                {review.reviewer && <div><dt>Reviewer</dt><dd>{review.reviewer}</dd></div>}
                {review.reviewedAt && <div><dt>Review date</dt><dd>{review.reviewedAt}</dd></div>}
              </dl>
            )}
            {review.notes && <p className="reviewNotes">{review.notes}</p>}
          </>
        ) : <p className="reviewEmpty">Editorial review not recorded.</p>}
      </section>

      <section className="referencesBlock" aria-labelledby="supporting-references-heading">
        <h3 id="supporting-references-heading">Supporting references</h3>
        {sourceIds.length === 0 ? (
          <p className="reviewEmpty">No references linked yet. Source verification has not been recorded for this concept.</p>
        ) : (
          <ul className="sourceList">
            {sourceIds.map((sourceId) => {
              const source = sourceById.get(sourceId);
              if (!source) {
                return <li className="sourceItem" key={sourceId}><p>Reference unavailable: this linked reference could not be found.</p></li>;
              }
              const href = safeHttpUrl(source.url);
              return (
                <li className="sourceItem" key={source.id}>
                  <h4>{source.title}</h4>
                  <dl className="sourceMetadata">
                    <div><dt>Publisher</dt><dd>{source.publisher}</dd></div>
                    <div><dt>Document type</dt><dd>{source.documentType}</dd></div>
                    {(source.year || source.edition) && <div><dt>Year / edition</dt><dd>{[source.year, source.edition].filter(Boolean).join(' · ')}</dd></div>}
                    {source.jurisdiction && <div><dt>Jurisdiction</dt><dd>{source.jurisdiction}</dd></div>}
                    {href && <div><dt>Source URL</dt><dd><a href={href} target="_blank" rel="noopener noreferrer">{href}</a></dd></div>}
                  </dl>
                  <p><span className="reviewStatus">{sourceReviewLabels[source.reviewStatus] ?? 'Reference review status unavailable'}</span></p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <p className="reviewDisclaimer">Editorial and reference review records do not constitute approval for project-specific structural design.</p>
    </section>
  );
}
