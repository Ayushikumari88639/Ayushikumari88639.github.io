import { useEffect, type ReactNode } from 'react';
import { categoryLabels, getProject, projects, type Project } from '../data/projects';
import { asset, goToSection, openProject, projectHref } from '../lib/site';
import { ConnectFour } from '../components/ConnectFour';
import { Icon } from '../components/Icon';
import { FlowDiagram, ProjectLinks, StatusBadge } from '../components/ProjectBits';
import { ProjectVisual } from '../components/ProjectVisual';

function Block({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section className="pblock" aria-labelledby={id}>
      <h2 id={id} className="pblock__title">
        {title}
      </h2>
      <div className="pblock__body">{children}</div>
    </section>
  );
}

function NotFound({ slug }: { slug: string }) {
  return (
    <main id="main" className="ppage container">
      <h1 className="ppage__title">Project not found</h1>
      <p>There is no project called “{slug}”.</p>
      <button className="btn btn--primary" onClick={() => goToSection('projects')}>
        <Icon name="arrowLeft" size={16} /> Back to all projects
      </button>
    </main>
  );
}

export function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug);

  useEffect(() => {
    const prev = document.title;
    if (project) document.title = `${project.name} — Ayushi Kumari`;
    document.getElementById('project-title')?.focus({ preventScroll: true });
    return () => {
      document.title = prev;
    };
  }, [project]);

  if (!project) return <NotFound slug={slug} />;

  const list = projects.filter((p) => !p.compact);
  const i = list.findIndex((p) => p.slug === project.slug);
  const prev: Project | undefined = i > 0 ? list[i - 1] : undefined;
  const next: Project | undefined = i >= 0 && i < list.length - 1 ? list[i + 1] : undefined;
  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <main id="main" className="ppage">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              goToSection('projects');
            }}
          >
            <Icon name="arrowLeft" size={15} /> All projects
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>

        <header className="ppage__head">
          <p className="ppage__meta">
            {project.categories.map((c) => (
              <span key={c} className="tag">
                {categoryLabels[c]}
              </span>
            ))}
            <StatusBadge status={project.status} />
          </p>
          <h1 id="project-title" className="ppage__title" tabIndex={-1}>
            {project.title}
          </h1>
          <p className="ppage__tagline">{project.tagline}</p>
          {project.context && <p className="ppage__context">{project.context}</p>}
          <ProjectLinks project={project} />
        </header>

        <div className="ppage__hero">
          <ProjectVisual project={project} size="lg" />
        </div>

        <div className="ppage__layout">
          <aside className="ppage__aside">
            <dl className="facts">
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{project.categories.map((c) => categoryLabels[c]).join(', ')}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>
                  <ul className="tech-list tech-list--small">
                    {project.technologies.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          <div className="ppage__content">
            <Block title={`${num()} — Overview`} id="p-overview">
              <p>{project.description}</p>
            </Block>

            {project.problem && (
              <Block title={`${num()} — Problem`} id="p-problem">
                <p>{project.problem}</p>
              </Block>
            )}

            {project.objective && (
              <Block title={`${num()} — Objective`} id="p-objective">
                <p>{project.objective}</p>
              </Block>
            )}

            {project.flow && (
              <Block title={`${num()} — ${project.flow.title}`} id="p-flow">
                <FlowDiagram steps={project.flow.steps} label={project.flow.title} />
                {project.flow.note && <p className="note">{project.flow.note}</p>}
              </Block>
            )}

            {project.features.length > 0 && (
              <Block title={`${num()} — Features`} id="p-features">
                <ul className="checklist">
                  {project.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={16} /> {f}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {project.contribution && (
              <Block title={`${num()} — My contribution`} id="p-contribution">
                <ul className="bullets">
                  {project.contribution.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Block>
            )}

            {project.architecture && (
              <Block title={`${num()} — Architecture overview`} id="p-architecture">
                <FlowDiagram steps={project.architecture.steps} variant="layers" label="Architecture layers" />
                {project.architecture.note && <p className="note">{project.architecture.note}</p>}
              </Block>
            )}

            {project.database && (
              <Block title={`${num()} — Database design`} id="p-database">
                <ul className="bullets">
                  {project.database.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Block>
            )}

            {project.sections?.map((s) => (
              <Block key={s.heading} title={`${num()} — ${s.heading}`} id={`p-${s.heading.toLowerCase().replace(/\W+/g, '-')}`}>
                {s.body && <p>{s.body}</p>}
                {s.items && (
                  <ul className="bullets">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </Block>
            ))}

            {project.slug === 'connect-4' && (
              <Block title={`${num()} — Try the logic`} id="p-play">
                <p className="note">
                  A small playable illustration of the logic above, written for this portfolio. It is not the original project
                  code.
                </p>
                <ConnectFour />
              </Block>
            )}

            {project.challenges && (
              <Block title={`${num()} — Challenges & solutions`} id="p-challenges">
                <dl className="challenges">
                  {project.challenges.map((c) => (
                    <div key={c.challenge}>
                      <dt>{c.challenge}</dt>
                      <dd>{c.solution}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
            )}

            <Block title={`${num()} — Screenshots`} id="p-screens">
              {project.screenshots?.length ? (
                <>
                  <div className="shots">
                    {project.screenshots.map((s) => (
                      <figure key={s.src}>
                        <a href={asset(s.src)} target="_blank" rel="noopener noreferrer" aria-label={`Open full size: ${s.caption ?? s.alt}`}>
                          <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" width={1440} height={900} />
                        </a>
                        {s.caption && <figcaption>{s.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                  {project.screenshotNote && <p className="note">{project.screenshotNote}</p>}
                </>
              ) : (
                <p className="empty-note">
                  Screenshots haven’t been added yet. The illustration above is a placeholder, not a capture of the application.
                </p>
              )}
            </Block>

            {project.videoUrl && (
              <Block title={`${num()} — Video`} id="p-video">
                <a className="btn btn--outline" href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="eye" size={16} /> Watch the walkthrough
                </a>
              </Block>
            )}
          </div>
        </div>

        <nav className="pnav" aria-label="More projects">
          {prev ? (
            <a
              href={projectHref(prev.slug)}
              onClick={(e) => {
                e.preventDefault();
                openProject(prev.slug);
              }}
            >
              <span className="pnav__dir">
                <Icon name="arrowLeft" size={15} /> Previous
              </span>
              <span className="pnav__name">{prev.name}</span>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a
              className="pnav__next"
              href={projectHref(next.slug)}
              onClick={(e) => {
                e.preventDefault();
                openProject(next.slug);
              }}
            >
              <span className="pnav__dir">
                Next <Icon name="arrowRight" size={15} />
              </span>
              <span className="pnav__name">{next.name}</span>
            </a>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}
