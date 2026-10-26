import { useState } from 'react';
import { getCertificate, type Certification } from '../data/certifications';
import { experience } from '../data/experience';
import { SectionHeader } from './Brand';
import { CertificatePreview } from './Certifications';
import { Icon } from './Icon';
import { Modal } from './Modal';

export function Experience() {
  const [cert, setCert] = useState<Certification | null>(null);

  return (
    <section id="experience" className="section section--dark" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience"
          index="04"
          label="Experience"
          title={
            <>
              Three internships, <em>three</em> different stacks.
            </>
          }
          intro="Technical internships through an industry internship program in India."
        />

        <ol className="exp-list">
          {experience.map((x, i) => {
            const c = getCertificate(x.certificateId);
            return (
              <li key={x.id} className="exp reveal">
                <span className="exp__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="exp__head">
                  <h3 className="exp__role">{x.role}</h3>
                  <p className="exp__org">
                    {x.organisation}
                    {x.mode && <span className="tag tag--on-dark">{x.mode}</span>}
                    {x.period && <span className="exp__period">{x.period}</span>}
                  </p>
                </div>
                <p className="exp__summary">{x.summary}</p>
                <div className="exp__foot">
                  <ul className="tech-list tech-list--on-dark" aria-label="Focus areas">
                    {x.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {c?.file && (
                    <button className="btn btn--small btn--on-dark" onClick={() => setCert(c)}>
                      <Icon name="file" size={15} /> Certificate
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <Modal open={Boolean(cert)} onClose={() => setCert(null)} title={cert?.title ?? 'Certificate'} wide>
        {cert && <CertificatePreview cert={cert} />}
      </Modal>
    </section>
  );
}
