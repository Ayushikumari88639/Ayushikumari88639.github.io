import { useMemo, useState, type MouseEvent } from 'react';
import { categoryLabels, featuredProjects, projects, type Project, type ProjectCategory } from '../data/projects';
import { openProject, projectHref } from '../lib/site';
import { SectionHeader } from './Brand';
import { Icon } from './Icon';
import { ProjectVisual } from './ProjectVisual';
import { ProjectLinks, StatusBadge } from './ProjectBits';

type Filter = 'all' | ProjectCategory;

const filterOrder: Filter[] = ['all', 'fullstack', 'web', 'java-db', 'android', 'security', 'analytics', 'research', 'concept', 'programming', 'mini'];

const open = (slug: string) => (e: MouseEvent) => {
  e.preventDefault();
  openProject(slug);
};

function FeaturedRow({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`feature reveal ${index % 2 ? 'feature--flip' : ''}`} aria-labelledby={`feature-${project.slug}`}>
      <a className="feature__visual" href={projectHref(project.slug)} onClick={open(project.slug)} tabIndex={-1} aria-hidden="true">
        <ProjectVisual project={project} size="lg" />
      </a>
      <div className="feature__body">
        <p className="feature__meta">
          <span className="feature__num">{String(index + 1).padStart(2, '0')}</span>
          {project.categories.map((c) => categoryLabels[c]).join(' · ')}
          <StatusBadge status={project.status} />
        </p>
        <h3 id={`feature-${project.slug}`} className="feature__title">
          {project.title}
        </h3>
        <p className="feature__tagline">{project.tagline}</p>
        <p className="feature__desc">{project.description}</p>
        {project.flow && (
          <ol className="mini-flow" aria-label={project.flow.title}>
            {project.flow.steps.map((s) => (
              <li key={s.label}>{s.label}</li>
            ))}
          </ol>
        )}
        <ul className="tech-list" aria-label="Technologies">
          {project.technologies.slice(0, 7).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="feature__actions">
          <a className="btn btn--primary" href={projectHref(project.slug)} onClick={open(project.slug)}>
            {project.ctaLabel ?? `Explore ${project.name}`} <Icon name="arrowRight" size={16} />
          </a>
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card" aria-labelledby={`card-${project.slug}`}>
      <ProjectVisual project={project} size="sm" showLabel={false} />
      <div className="card__body">
        <p className="card__meta">
          <span>{categoryLabels[project.categories[0]]}</span>
          <StatusBadge status={project.status} />
        </p>
        <h3 id={`card-${project.slug}`} className="card__title">
          <a href={projectHref(project.slug)} onClick={open(project.slug)} className="card__link">
            {project.name}
          </a>
        </h3>
        <p className="card__desc">{project.tagline}</p>
        <ul className="tech-list tech-list--small" aria-label="Technologies">
          {project.technologies.slice(0, 4).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="card__foot">
          <span className="card__more" aria-hidden="true">
            View details <Icon name="arrowRight" size={14} />
          </span>
          {project.githubUrl && (
            <a className="card__gh" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={15} /> View Code
              <span className="visually-hidden"> for {project.name} on GitHub (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function CompactRow({ project }: { project: Project }) {
  return (
    <li className="compact">
      <span className="compact__name">{project.name}</span>
      <span className="compact__tech">{project.technologies.join(' · ')}</span>
      {project.githubUrl ? (
        <a className="compact__link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          View Code <Icon name="arrowUpRight" size={14} />
          <span className="visually-hidden"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      ) : (
        <span className="compact__pending">Code coming soon</span>
      )}
    </li>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['all', projects.length]]);
    projects.forEach((p) => p.categories.forEach((c) => map.set(c, (map.get(c) ?? 0) + 1)));
    return map;
  }, []);

  const filtered = useMemo(() => projects.filter((p) => filter === 'all' || p.categories.includes(filter)), [filter]);
  const cards = filtered.filter((p) => !p.compact);
  const compact = filtered.filter((p) => p.compact);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects"
          index="03"
          label="Projects"
          title={
            <>
              Things I have <em>built</em>, and how they work.
            </>
          }
          intro="Each project has its own page with the problem, the features, the stack and how the pieces connect. Where the code is public, View Code opens it on GitHub."
        />

        <div className="features">
          {featuredProjects.map((p, i) => (
            <FeaturedRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="index-head reveal">
          <h3 className="index-title">Project index</h3>
          <p className="index-count" aria-live="polite">
            Showing {filtered.length} of {projects.length}
          </p>
        </div>

        <div className="filters reveal" role="group" aria-label="Filter projects by category">
          {filterOrder
            .filter((f) => counts.get(f))
            .map((f) => (
              <button key={f} className={`chip ${filter === f ? 'is-active' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All Projects' : categoryLabels[f]}
                <span className="chip__count">{counts.get(f)}</span>
              </button>
            ))}
        </div>

        {cards.length > 0 && (
          <div className="cards">
            {cards.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}

        {compact.length > 0 && (
          <div className="compact-block">
            <h4 className="micro-label">Web mini-projects</h4>
            <ul className="compact-list">
              {compact.map((p) => (
                <CompactRow key={p.slug} project={p} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
