import { navItems, profile } from '../data/profile';
import { goToSection } from '../lib/site';
import { Monogram } from './Brand';
import { Icon } from './Icon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Monogram size={34} />
          <p className="footer__name">{profile.name}</p>
          <p className="footer__desc">{profile.descriptor}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer__nav">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(n.id);
                  }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="footer__contact">
          <li>
            <a href={`mailto:${profile.email}`}>
              <Icon name="mail" size={16} /> {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={16} /> LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={16} /> GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="container footer__bottom">
        <p>
          © {year} {profile.name}. Built with React, TypeScript and Vite.
        </p>
        <button className="footer__top" onClick={() => goToSection('home')}>
          Back to top <Icon name="arrowUp" size={15} />
        </button>
      </div>
    </footer>
  );
}
