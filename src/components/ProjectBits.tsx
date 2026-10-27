import type { FlowStep, Project, ProjectStatus } from '../data/projects';
import { profile } from '../data/profile';
import { Icon } from './Icon';

const statusClass: Record<ProjectStatus, string> = {
  Built: 'status--built',
  'Hackathon prototype': 'status--proto',
  'Workshop concept': 'status--concept',
  'In progress': 'status--progress',
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status ${statusClass[status]}`}>
      <span className="status__dot" aria-hidden="true" />
      {status}
    </span>
  );
}

/**
 * Repository / demo / video links. Missing links render a quiet label instead
 * of a button, so there are never dead links.
 */
export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  return (
    <div className={`project-links ${compact ? 'project-links--compact' : ''}`}>
      {project.githubUrl ? (
        <a className="btn btn--outline" href={project.githubUrl} {...ext}>
          <Icon name="github" size={16} /> View Code
          <span className="visually-hidden"> on GitHub (opens in a new tab)</span>
        </a>
      ) : (
        !compact && (
          <span className="pending">
            <Icon name="clock" size={15} /> Code coming soon on GitHub
          </span>
        )
      )}
      {project.liveUrl ? (
        <a className="btn btn--outline" href={project.liveUrl} {...ext}>
          <Icon name="arrowUpRight" size={16} /> Live demo
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ) : (
        !compact && (
          <span className="pending">
            <Icon name="clock" size={15} /> Live demo not available
          </span>
        )
      )}
      {project.videoUrl && (
        <a className="btn btn--outline" href={project.videoUrl} {...ext}>
          <Icon name="eye" size={16} /> Video walkthrough
        </a>
      )}
      {!compact && !project.githubUrl && (
        <a className="btn btn--link" href={profile.github} {...ext}>
          Browse my GitHub <Icon name="arrowUpRight" size={14} />
        </a>
      )}
    </div>
  );
}

/** Horizontal, wrapping step diagram used for flows and architecture. */
export function FlowDiagram({ steps, variant = 'flow', label }: { steps: FlowStep[]; variant?: 'flow' | 'layers'; label: string }) {
  return (
    <ol className={`flow flow--${variant}`} aria-label={label}>
      {steps.map((s, i) => (
        <li key={s.label} className="flow__step">
          <span className="flow__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="flow__label">{s.label}</span>
          {s.detail && <span className="flow__detail">{s.detail}</span>}
        </li>
      ))}
    </ol>
  );
}
