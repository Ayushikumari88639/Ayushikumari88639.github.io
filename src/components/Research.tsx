import { researchProject } from '../data/projects';
import { openProject, projectHref } from '../lib/site';
import { SectionHeader } from './Brand';
import { Icon } from './Icon';
import { StatusBadge } from './ProjectBits';

export function Research() {
  const r = researchProject;
  if (!r) return null;
  const question = r.sections?.find((s) => s.heading === 'Research question')?.body;
  const method = r.sections?.find((s) => s.heading === 'Planned methodology')?.items ?? [];

  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="container">
        <SectionHeader id="research" index="07" label="Research" title={<>Ongoing <em>research</em>.</>} />

        <article className="research reveal">
          <div className="research__main">
            <p className="research__status">
              <StatusBadge status={r.status} />
              <span>{r.context}</span>
            </p>
            <h3 className="research__title">{r.title}</h3>
            {question && (
              <blockquote className="research__question">
                <p>{question}</p>
              </blockquote>
            )}
            <p className="research__desc">{r.description}</p>
            <a
              className="btn btn--outline"
              href={projectHref(r.slug)}
              onClick={(e) => {
                e.preventDefault();
                openProject(r.slug);
              }}
            >
              Read the research outline <Icon name="arrowRight" size={16} />
            </a>
          </div>
          <aside className="research__side">
            <p className="micro-label">Planned methodology</p>
            <ul className="research__method">
              {method.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="research__note">
              <strong>Findings:</strong> not yet available. Results will be published here only after the analysis is complete.
            </p>
          </aside>
        </article>
      </div>
    </section>
  );
}
