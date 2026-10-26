import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { navItems, profile } from '../data/profile';
import { asset, goToSection } from '../lib/site';
import { Monogram } from './Brand';
import { Icon } from './Icon';

export function Navbar({ active, onHome }: { active: string; onHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goToSection(id);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__brand" onClick={go('home')} aria-label="Ayushi Kumari — home">
          <Monogram size={24} />
          <span className="nav__wordmark">
            Ayushi <em>Kumari</em>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navItems
              .filter((n) => n.id !== 'home')
              .map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className={onHome && active === item.id ? 'is-active' : undefined}
                    aria-current={onHome && active === item.id ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="nav__actions">
          {profile.resumePdf && (
            <a className="btn btn--small btn--dark nav__resume" href={asset(profile.resumePdf)} download="Ayushi_Kumari_Resume.pdf">
              <Icon name="download" size={15} />
              <span>Resume</span>
            </a>
          )}
          <button
            ref={toggleRef}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="nav__panel" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  className={onHome && active === item.id ? 'is-active' : undefined}
                  aria-current={onHome && active === item.id ? 'location' : undefined}
                >
                  <span className="nav__panel-index">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {profile.resumePdf && (
            <a className="btn btn--primary nav__panel-resume" href={asset(profile.resumePdf)} download="Ayushi_Kumari_Resume.pdf">
              <Icon name="download" size={16} /> Download Resume
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
