import { coursework, education } from '../data/education';
import { SectionHeader } from './Brand';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about"
          index="01"
          label="About"
          title={
            <>
              I like understanding software <em>all the way down</em>.
            </>
          }
        />

        <div className="about__grid">
          <div className="about__prose reveal">
            <p className="about__lead">
              My path into software development runs through a BCA at Satyanarayan Sinha College, completed with 80.2%
              and a First Division, and now an MCA at Patna Women’s College. The MCA coursework — advanced DBMS,
              algorithms, software engineering, API development — gives me the theory behind the things I build.
            </p>
            <p>
              What I enjoy most is building complete applications rather than isolated pages. In VeriSync I designed a
              14-table MySQL schema, built session-based login and role-based access in Flask, and connected an
              OpenCV face-matching pipeline to a three-step verification flow that never stores students’ photos. In SmartCV I followed one piece of data from an HTML form through
              Flask validation into MySQL and back out as a rendered resume.
            </p>
            <p>
              Three technical internships — Java, Android and web development — taught me the less glamorous parts of the
              job: working in a remote team, fixing issues real users notice, and turning feedback into changes over
              several rounds.
            </p>
            <p>
              I learn best by building, and I try to understand every layer of what I build. I’m currently looking for web and full-stack development internships where I can contribute to a real product
              team and keep growing.
            </p>
          </div>

          <div className="about__side reveal">
            <h3 id="education" className="micro-label">
              Education
            </h3>
            <ol className="timeline">
              {education.map((e) => (
                <li key={e.degree} className={`timeline__item ${e.current ? 'is-current' : ''}`}>
                  <span className="timeline__dot" aria-hidden="true" />
                  <div className="timeline__meta">
                    <span>{e.period}</span>
                    <span className={e.current ? 'tag tag--accent' : 'tag'}>{e.result}</span>
                  </div>
                  <p className="timeline__title">{e.degree}</p>
                  <p className="timeline__sub">{e.institution}</p>
                </li>
              ))}
            </ol>

            <details className="coursework">
              <summary>
                <span>MCA coursework</span>
                <span className="coursework__hint">Semesters I–III</span>
              </summary>
              <div className="coursework__body">
                {coursework.map((c) => (
                  <div key={c.term}>
                    <p className="coursework__term">{c.term}</p>
                    <ul>
                      {c.subjects.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
