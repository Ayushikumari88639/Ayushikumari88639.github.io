import { useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { SectionHeader } from './Brand';
import { Icon } from './Icon';

// The form posts to Formspree when VITE_FORMSPREE_ID is set at build time
// (a public form ID — not a secret). Without it, the same form composes an
// email in the visitor's own mail app, so it is never a fake "success".
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string | undefined)?.trim();
const endpoint = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : '';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type State = 'idle' | 'sending' | 'sent' | 'error';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!emailOk(f.email.trim())) e.email = 'Please enter a valid email address, like name@example.com.';
  if (f.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.';
  if (f.message.length > 4000) e.message = 'Please keep the message under 4000 characters.';
  return e;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>('idle');
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard unavailable — the address is visible on the page. */
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name.trim()}`);
      const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setState('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `Portfolio enquiry from ${fields.name.trim()}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setState('error');
    }
  };

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container contact">
        <div className="contact__intro">
          <SectionHeader
            id="contact"
            index="08"
            label="Contact"
            title={
              <>
                Have a project, opportunity, or <em>idea</em> in mind?
              </>
            }
            intro="I’m interested in opportunities where I can contribute to software development, build useful applications, and continue learning with a strong engineering team."
          />
          <div className="contact__channels reveal">
            <div className="contact__email">
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                <Icon name="mail" size={17} /> Email me
              </a>
              <button className="btn btn--outline" onClick={copyEmail} aria-live="polite">
                <Icon name={copied ? 'check' : 'copy'} size={16} />
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
            <p className="contact__address">{profile.email}</p>
            <ul className="contact__links">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" size={18} /> LinkedIn <Icon name="arrowUpRight" size={14} />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" size={18} /> GitHub · {profile.githubHandle} <Icon name="arrowUpRight" size={14} />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li className="contact__place">
                <Icon name="pin" size={18} /> {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <form className="form reveal" onSubmit={onSubmit} noValidate aria-describedby="form-note">
          <p className="form__title">Send a message</p>
          {(['name', 'email'] as const).map((k) => (
            <div key={k} className={`field ${errors[k] ? 'field--error' : ''}`}>
              <label htmlFor={`cf-${k}`}>{k === 'name' ? 'Your name' : 'Your email'}</label>
              <input
                id={`cf-${k}`}
                name={k}
                type={k === 'email' ? 'email' : 'text'}
                autoComplete={k === 'email' ? 'email' : 'name'}
                value={fields[k]}
                onChange={set(k)}
                aria-invalid={Boolean(errors[k])}
                aria-describedby={errors[k] ? `cf-${k}-error` : undefined}
                required
              />
              {errors[k] && (
                <p id={`cf-${k}-error`} className="field__error" role="alert">
                  {errors[k]}
                </p>
              )}
            </div>
          ))}
          <div className={`field ${errors.message ? 'field--error' : ''}`}>
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              rows={5}
              value={fields.message}
              onChange={set('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'cf-message-error' : undefined}
              required
            />
            {errors.message && (
              <p id="cf-message-error" className="field__error" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <button className="btn btn--dark form__submit" type="submit" disabled={state === 'sending'}>
            <Icon name="send" size={16} />
            {state === 'sending' ? 'Sending…' : endpoint ? 'Send message' : 'Compose email'}
          </button>

          <p id="form-note" className="form__note">
            {endpoint
              ? 'Your message is delivered by Formspree. I only use your email to reply.'
              : 'This opens your email app with the message ready to send — nothing is sent until you press send there.'}
          </p>
          <div aria-live="polite" role="status">
            {state === 'sent' && <p className="form__ok">Thank you — your message was sent. I’ll reply by email.</p>}
            {state === 'error' && (
              <p className="form__fail">
                The message couldn’t be sent. Please email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
