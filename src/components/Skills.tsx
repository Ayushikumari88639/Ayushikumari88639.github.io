import { useState } from 'react';
import { fundamentals, skillGroups } from '../data/skills';
import { SectionHeader } from './Brand';

type View = 'all' | 'applied' | 'studied';

const views: { id: View; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'applied', label: 'Hands-on' },
  { id: 'studied', label: 'Studied in coursework' },
];

export function Skills() {
  const [view, setView] = useState<View>('all');

  return (
    <section id="skills" className="section section--sand" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills"
          index="02"
          label="Skills"
          title={
            <>
              A toolkit that spans the <em>whole stack</em>.
            </>
          }
          intro="No percentage bars. Solid chips are tools I have worked with hands-on; dashed chips are technologies I have studied in MCA coursework and am still building experience with."
        />

        <div className="skills__toolbar reveal" role="group" aria-label="Filter skills">
          {views.map((v) => (
            <button key={v.id} className={`chip ${view === v.id ? 'is-active' : ''}`} aria-pressed={view === v.id} onClick={() => setView(v.id)}>
              {v.id === 'studied' && <span className="skill-key skill-key--studied" aria-hidden="true" />}
              {v.id === 'applied' && <span className="skill-key" aria-hidden="true" />}
              {v.label}
            </button>
          ))}
        </div>

        <div className="skills__grid">
          {skillGroups.map((g, i) => {
            const visible = g.skills.filter((s) => (view === 'all' ? true : view === 'studied' ? s.studied : !s.studied));
            return (
              <article key={g.id} className={`skill-card reveal ${visible.length === 0 ? 'is-empty' : ''}`}>
                <header>
                  <span className="skill-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{g.title}</h3>
                </header>
                <p className="skill-card__summary">{g.summary}</p>
                {visible.length ? (
                  <ul className="skill-list">
                    {visible.map((s) => (
                      <li key={s.name} className={s.studied ? 'skill skill--studied' : 'skill'}>
                        {s.name}
                        {s.studied && <span className="visually-hidden"> (studied in coursework)</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="skill-card__none">Nothing in this view.</p>
                )}
              </article>
            );
          })}
        </div>

        <p className="skills__fundamentals reveal">
          <span className="micro-label">CS fundamentals</span>
          {fundamentals.join(' · ')}
        </p>
      </div>
    </section>
  );
}
