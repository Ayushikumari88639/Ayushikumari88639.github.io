import { useState } from 'react';
import { certifications, type CertGroup, type Certification } from '../data/certifications';
import { asset } from '../lib/site';
import { SectionHeader } from './Brand';
import { Icon } from './Icon';
import { Modal } from './Modal';

const groups: CertGroup[] = ['Competitions', 'Training & courses', 'Internships'];
const isPdf = (f: string) => /\.pdf$/i.test(f);

export function CertificateCard({ cert, onView }: { cert: Certification; onView: (c: Certification) => void }) {
  const hasFile = Boolean(cert.file);
  return (
    <li className={`cert ${hasFile ? 'cert--file' : ''}`}>
      {hasFile && (
        <button className="cert__thumb" onClick={() => onView(cert)} aria-label={`Preview certificate: ${cert.title}`}>
          {cert.thumb ? (
            <img src={asset(cert.thumb)} alt="" loading="lazy" decoding="async" />
          ) : (
            <Icon name="file" size={28} />
          )}
        </button>
      )}
      <div className="cert__body">
        <p className="cert__title">{cert.title}</p>
        {(cert.issuer || cert.date || cert.note) && (
          <p className="cert__meta">{[cert.issuer, cert.date, cert.note].filter(Boolean).join(' · ')}</p>
        )}
      </div>
      <div className="cert__actions">
        {hasFile ? (
          <>
            <button className="btn btn--small btn--outline" onClick={() => onView(cert)}>
              <Icon name="eye" size={15} /> View
            </button>
            <a className="icon-btn" href={asset(cert.file!)} download aria-label={`Download certificate: ${cert.title}`}>
              <Icon name="download" size={17} />
            </a>
          </>
        ) : null}
      </div>
    </li>
  );
}

export function CertificatePreview({ cert }: { cert: Certification }) {
  const file = asset(cert.file!);
  return (
    <div className="cert-preview">
      {isPdf(cert.file!) ? (
        <object data={file} type="application/pdf" aria-label={cert.title}>
          <p>
            This browser can’t display the PDF inline.{' '}
            <a href={file} target="_blank" rel="noopener noreferrer">
              Open the certificate
            </a>
            .
          </p>
        </object>
      ) : (
        <img src={file} alt={`Certificate: ${cert.title}`} />
      )}
      <div className="cert-preview__bar">
        <p>{[cert.issuer, cert.date].filter(Boolean).join(' · ')}</p>
        <div>
          <a className="btn btn--small btn--outline" href={file} target="_blank" rel="noopener noreferrer">
            <Icon name="arrowUpRight" size={15} /> Full screen
          </a>
          <a className="btn btn--small btn--dark" href={file} download>
            <Icon name="download" size={15} /> Download
          </a>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);
  const withFiles = certifications.filter((c) => c.file).length;

  return (
    <section id="certifications" className="section" aria-labelledby="certifications-title">
      <div className="container">
        <SectionHeader
          id="certifications"
          index="06"
          label="Certifications"
          title={
            <>
              Certificates & <em>training</em>.
            </>
          }
          intro={
            withFiles
              ? 'Select a certificate to preview or download it.'
              : 'Training and certification records from my resume. Certificate scans will be attached here as they are added.'
          }
        />

        <div className="cert-groups">
          {groups.map((g) => {
            const items = certifications.filter((c) => c.group === g);
            if (!items.length) return null;
            return (
              <div key={g} className="cert-group reveal">
                <h3 className="micro-label">
                  {g} <span className="cert-group__count">{items.length}</span>
                </h3>
                <ul className="cert-list">
                  {items.map((c) => (
                    <CertificateCard key={c.id} cert={c} onView={setActive} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.title ?? 'Certificate'} wide>
        {active && <CertificatePreview cert={active} />}
      </Modal>
    </section>
  );
}
