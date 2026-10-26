import { achievements } from '../data/achievements';
import { SectionHeader } from './Brand';

export function Achievements() {
  const highlights = achievements.filter((a) => a.highlight);
  const others = achievements.filter((a) => !a.highlight);

  return (
    <section id="achievements" className="section section--sand" aria-labelledby="achievements-title">
      <div className="container">
        <SectionHeader
          id="achievements"
          index="05"
          label="Achievements"
          title={
            <>
              Recognition &amp; <em>milestones</em>.
            </>
          }
        />

        <div className="awards">
          {highlights.map((a) => (
            <article key={a.id} className="award reveal" aria-labelledby={`award-${a.id}`}>
              <p className="award__mark" aria-hidden="true">
                {a.mark}
              </p>
              <div className="award__body">
                <p className="award__kind">{a.kind}</p>
                <h3 id={`award-${a.id}`} className="award__title">
                  {a.title}
                </h3>
                <p className="award__org">
                  {a.organiser} · <time>{a.date}</time>
                </p>
                <ul className="award__details">
                  {a.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <ul className="recog">
          {others.map((a) => (
            <li key={a.id} className="recog__item reveal">
              <span className="recog__mark" aria-hidden="true">
                {a.mark}
              </span>
              <div>
                <p className="recog__kind">{a.kind}</p>
                <h3 className="recog__title">{a.title}</h3>
                <p className="recog__org">
                  {a.organiser}
                  {a.date && <> · {a.date}</>}
                </p>
                <p className="recog__detail">{a.details.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="awards__foot reveal">First Division throughout my academic career — Matriculation, Intermediate and BCA.</p>
      </div>
    </section>
  );
}
