import { useState } from 'react';
import type { Motif, Project } from '../data/projects';
import { asset } from '../lib/site';

// Designed placeholder art. Shown only when a project has no real thumbnail,
// and always labelled so it can never be mistaken for a screenshot.

const E = 'var(--espresso)';
const T = 'var(--terracotta)';
const P = 'var(--peach)';
const S = 'var(--sand)';
const W = 'var(--white)';

function Art({ motif }: { motif: Motif }) {
  switch (motif) {
    case 'verify':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M70 100h180" stroke={E} strokeWidth="1.5" strokeDasharray="3 6" />
          {/* face */}
          <circle cx="70" cy="100" r="34" fill={W} stroke={E} strokeWidth="1.5" />
          <circle cx="60" cy="95" r="2.5" fill={E} />
          <circle cx="80" cy="95" r="2.5" fill={E} />
          <path d="M61 110c6 5 12 5 18 0" stroke={E} strokeWidth="1.5" fill="none" />
          <path d="M44 74v-8h8M96 74v-8h-8M44 126v8h8M96 126v8h-8" stroke={T} strokeWidth="2" fill="none" />
          {/* qr */}
          <rect x="128" y="68" width="64" height="64" rx="6" fill={W} stroke={E} strokeWidth="1.5" />
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2, 3, 4].map((c) =>
              (r * 3 + c * 7) % 3 === 0 || (r < 2 && c < 2) ? (
                <rect key={`${r}${c}`} x={136 + c * 10} y={76 + r * 10} width="8" height="8" rx="1.5" fill={E} />
              ) : null,
            ),
          )}
          {/* otp */}
          <rect x="216" y="80" width="78" height="40" rx="20" fill={E} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={236 + i * 13} cy="100" r="3.5" fill={i === 3 ? T : W} />
          ))}
        </g>
      );
    case 'shield':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M160 32 214 52v44c0 36-24 60-54 72-30-12-54-36-54-72V52z" fill={W} stroke={E} strokeWidth="1.5" />
          <path d="m136 100 16 16 32-34" stroke={T} strokeWidth="4" fill="none" />
          <rect x="34" y="56" width="62" height="34" rx="10" fill={S} />
          <path d="M46 70h38M46 78h24" stroke={E} strokeWidth="1.5" />
          <rect x="226" y="112" width="62" height="34" rx="10" fill={P} />
          <path d="M238 126h38M238 134h20" stroke={E} strokeWidth="1.5" />
        </g>
      );
    case 'document':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="44" y="52" width="84" height="96" rx="8" fill={W} stroke={E} strokeWidth="1.5" />
          {[72, 92, 112].map((y) => (
            <rect key={y} x="56" y={y} width="60" height="12" rx="3" fill={S} />
          ))}
          <path d="M140 100h34" stroke={T} strokeWidth="2" />
          <path d="m168 94 6 6-6 6" stroke={T} strokeWidth="2" fill="none" />
          <rect x="188" y="34" width="98" height="132" rx="6" fill={W} stroke={E} strokeWidth="1.5" />
          <circle cx="210" cy="58" r="10" fill={P} />
          <path d="M228 54h44M228 62h28" stroke={E} strokeWidth="1.5" />
          {[86, 96, 106, 122, 132, 142].map((y, i) => (
            <path key={y} d={`M202 ${y}h${i % 3 === 0 ? 40 : 70}`} stroke={i % 3 === 0 ? T : E} strokeWidth={i % 3 === 0 ? 2 : 1.2} />
          ))}
        </g>
      );
    case 'cart':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => (
              <g key={`${c}${r}`}>
                <rect x={40 + c * 62} y={40 + r * 64} width="52" height="54" rx="6" fill={W} stroke={E} strokeWidth="1.2" />
                <rect x={48 + c * 62} y={48 + r * 64} width="36" height="24" rx="3" fill={c === 1 && r === 0 ? P : S} />
                <path d={`M48 ${84 + r * 64}h${20}`} transform={`translate(${c * 62} 0)`} stroke={E} strokeWidth="1.5" />
              </g>
            )),
          )}
          <path d="M226 70h12l12 52h40l10-36h-56" stroke={E} strokeWidth="1.8" fill="none" />
          <circle cx="256" cy="136" r="6" fill={T} />
          <circle cx="284" cy="136" r="6" fill={E} />
        </g>
      );
    case 'plane':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 150C100 40 220 40 280 150" stroke={E} strokeWidth="1.5" strokeDasharray="3 6" fill="none" />
          <path d="m152 66 18 8-18 8 4-8z" fill={T} />
          {[0, 1, 2, 3, 4, 5].map((c) =>
            [0, 1, 2].map((r) => (
              <rect
                key={`${c}${r}`}
                x={98 + c * 22 + (c > 2 ? 10 : 0)}
                y={112 + r * 22}
                width="16"
                height="16"
                rx="4"
                fill={c === 4 && r === 1 ? T : r === 0 && c < 2 ? E : W}
                stroke={E}
                strokeWidth="1.2"
              />
            )),
          )}
        </g>
      );
    case 'location':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="120" y="22" width="80" height="156" rx="14" fill={W} stroke={E} strokeWidth="1.5" />
          <circle cx="160" cy="96" r="44" fill="none" stroke={P} strokeWidth="1.5" />
          <circle cx="160" cy="96" r="28" fill="none" stroke={T} strokeWidth="1.5" strokeDasharray="2 4" />
          <path d="M160 116s-14-12-14-23a14 14 0 0 1 28 0c0 11-14 23-14 23z" fill={T} />
          <circle cx="160" cy="93" r="5" fill={W} />
          <rect x="138" y="152" width="44" height="14" rx="7" fill={E} />
          <path d="M60 60h40M60 72h26M220 128h40M234 140h26" stroke={S} strokeWidth="4" />
        </g>
      );
    case 'vr':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="82" y="64" width="156" height="72" rx="30" fill={W} stroke={E} strokeWidth="1.5" />
          <circle cx="126" cy="100" r="20" fill={S} stroke={E} strokeWidth="1.2" />
          <circle cx="194" cy="100" r="20" fill={S} stroke={E} strokeWidth="1.2" />
          <path d="M146 100h28" stroke={E} strokeWidth="1.5" />
          <path d="M194 92v16M186 100h16" stroke={T} strokeWidth="3" />
          <path d="M60 100h22M238 100h22" stroke={E} strokeWidth="1.5" />
          <path d="M44 40c12-10 28-10 40 0M236 160c12 10 28 10 40 0" stroke={P} strokeWidth="2" fill="none" />
        </g>
      );
    case 'chart':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 160h220M50 160V40" stroke={E} strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const h = [40, 64, 52, 88, 74, 104][i];
            return <rect key={i} x={70 + i * 32} y={160 - h} width="20" height={h} rx="3" fill={i === 5 ? T : i % 2 ? P : S} />;
          })}
          <path d="M80 110 112 92l32 14 32-30 32 10 32-34" stroke={E} strokeWidth="1.5" fill="none" />
        </g>
      );
    case 'grid':
      return (
        <g>
          <rect x="74" y="34" width="172" height="146" rx="12" fill={E} />
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 7 }).map((__, c) => {
              const filled = r >= 4 ? (c + r) % 2 : r === 3 && c === 3 ? 1 : r === 3 && c === 4 ? 0 : -1;
              const fill = filled === 1 ? T : filled === 0 ? P : 'var(--ivory)';
              return <circle key={`${r}${c}`} cx={92 + c * 22.5} cy={52 + r * 22.5} r="8" fill={fill} />;
            }),
          )}
        </g>
      );
    case 'research':
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <rect x="70" y="30" width="112" height="140" rx="8" fill={W} stroke={E} strokeWidth="1.5" />
          {[56, 84, 112, 140].map((y, i) => (
            <g key={y}>
              <rect x="84" y={y - 7} width="12" height="12" rx="3" fill={i < 2 ? T : 'none'} stroke={E} strokeWidth="1.2" />
              <path d={`M106 ${y - 1}h${i % 2 ? 46 : 60}`} stroke={E} strokeWidth="1.4" />
            </g>
          ))}
          <circle cx="222" cy="104" r="30" fill={P} fillOpacity="0.45" stroke={E} strokeWidth="1.5" />
          <path d="m244 126 22 22" stroke={E} strokeWidth="4" />
        </g>
      );
    case 'code':
    default:
      return (
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="m120 70-30 30 30 30M200 70l30 30-30 30" stroke={E} strokeWidth="3" />
          <path d="m172 60-24 80" stroke={T} strokeWidth="3" />
        </g>
      );
  }
}

export function ProjectVisual({ project, size = 'md', showLabel = true }: { project: Project; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (project.thumbnail && !failed) {
    const isGitHubCard = project.thumbnail.includes('opengraph.githubassets.com');
    return (
      <div className={`plate plate--${size} ${isGitHubCard ? 'plate--gh' : ''}`}>
        <img
          src={asset(project.thumbnail)}
          alt={isGitHubCard ? `GitHub repository card for ${project.name}` : `${project.name} screenshot`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
        {isGitHubCard && showLabel && <span className="plate__label">GitHub repository preview</span>}
      </div>
    );
  }
  return (
    <div className={`plate plate--${size} plate--art`}>
      <svg viewBox="0 0 320 200" role="img" aria-label={`Illustration representing ${project.name}`}>
        <Art motif={project.motif} />
      </svg>
      {showLabel && <span className="plate__label">Illustration</span>}
    </div>
  );
}
