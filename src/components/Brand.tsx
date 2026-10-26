import type { ReactNode } from 'react';

/** The AK monogram: the A's right leg meets the K's stem at the baseline. */
export function Monogram({ size = 32, title }: { size?: number; title?: string }) {
  return (
    <svg
      width={size * 1.25}
      height={size}
      viewBox="0 0 40 32"
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className="monogram"
    >
      <path
        d="M4 28 13 4l9 24M8.2 19h9.6M22 4v24M34 4 22.4 16.6 34 28"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36.5" cy="16.5" r="2.2" fill="var(--terracotta)" />
    </svg>
  );
}

/** Small accent motif: a connector line ending in a node — interface → database. */
export function Motif() {
  return (
    <span className="motif" aria-hidden="true">
      <span className="motif__line" />
      <span className="motif__node" />
    </span>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
}) {
  return (
    <header className="section-header reveal">
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <Motif />
        {label}
      </p>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
