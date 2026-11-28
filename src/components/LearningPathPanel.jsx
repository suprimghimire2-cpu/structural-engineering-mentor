import React, { useState } from 'react';
import { knowledgeById } from '../data/knowledge.js';
import { learningPaths } from '../data/learningPaths.js';

export default function LearningPathPanel({ onChoose }) {
  const path = learningPaths[0];
  const [activeStage, setActiveStage] = useState(path.stages[0].id);

  return (
    <section className="learningPath" aria-labelledby="learning-path-title">
      <header className="learningPath__head">
        <div><p className="eyebrow">CURATED STUDY SEQUENCE / 06 STAGES</p><h2 id="learning-path-title">{path.title}</h2></div>
        <p>{path.description}</p>
      </header>
      <ol className="learningPath__stages">
        {path.stages.map((stage, index) => {
          const open = activeStage === stage.id;
          return (
            <li className={open ? 'learningPath__stage is-open' : 'learningPath__stage'} key={stage.id}>
              <button type="button" className="learningPath__stageButton" aria-expanded={open} aria-controls={`path-content-${stage.id}`} onClick={() => setActiveStage(open ? '' : stage.id)}>
                <span className="learningPath__number">{String(index + 1).padStart(2, '0')}</span><span className="learningPath__stageTitle">{stage.title}</span><span className="learningPath__toggle" aria-hidden="true">{open ? '−' : '+'}</span>
              </button>
              {open && <div className="learningPath__content" id={`path-content-${stage.id}`}>
                <p className="learningPath__objective">{stage.objective}</p>
                <div className="learningPath__columns"><div><h3>Before this stage</h3><p>{stage.prerequisiteKnowledge}</p></div><div><h3>Learning outcome</h3><p>{stage.outcome}</p></div></div>
                <ol className="learningPath__concepts" aria-label={`Stage ${index + 1} concepts in recommended order`}>
                  {stage.conceptIds.map((id, conceptIndex) => {
                    const concept = knowledgeById.get(id);
                    if (!concept) return <li key={id} className="pathUnavailable"><span>{String(conceptIndex + 1).padStart(2,'0')}</span>{id.replaceAll('-', ' ')} · content unavailable</li>;
                    const prereqs = (concept.prerequisites ?? []).map((prereq) => knowledgeById.get(prereq)?.title).filter(Boolean);
                    const available = concept.status !== 'planned';
                    return <li key={id}><span>{String(conceptIndex + 1).padStart(2,'0')}</span><button type="button" disabled={!available} onClick={() => onChoose(concept)}>{concept.title}</button><small>{available ? 'Available' : 'Planned'}{prereqs.length ? ` · Prerequisite: ${prereqs.join(', ')}` : ' · No listed prerequisite'}</small></li>;
                  })}
                </ol>
              </div>}
            </li>
          );
        })}
      </ol>
      <p className="learningPath__note">Recommended learning sequence only. It does not represent learner completion, certification or professional qualification.</p>
    </section>
  );
}
