import { featuredProjects } from '../data/projects';
import { profile, snapshot } from '../data/profile';
import { asset, cssVars, goToSection, openProject, projectHref } from '../lib/site';
import { Monogram } from './Brand';
import { Icon } from './Icon';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow anim" style={cssVars({ '--d': '0ms' })}>
            MCA Student <span aria-hidden="true">·</span> Web Developer <span aria-hidden="true">·</span> India
          </p>
          <h1 id="home-title" className="hero__title anim" style={cssVars({ '--d': '80ms' })}>
            Building thoughtful digital experiences, from <em>interface</em> to <em>database</em>.
          </h1>
          <p className="hero__lede anim" style={cssVars({ '--d': '160ms' })}>
            I’m Ayushi Kumari, an MCA student and aspiring full-stack developer who enjoys turning ideas into functional
            applications. I work across frontend interfaces, backend logic, databases, and application security.
          </p>
          <div className="hero__ctas anim" style={cssVars({ '--d': '240ms' })}>
            <a
              className="btn btn--primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                goToSection('projects');
              }}
            >
              Explore My Work <Icon name="arrowRight" size={16} />
            </a>
            {profile.resumePdf && (
              <a className="btn btn--outline" href={asset(profile.resumePdf)} download="Ayushi_Kumari_Resume.pdf">
                <Icon name="download" size={16} /> Download Resume
              </a>
            )}
            <a
              className="btn btn--link"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goToSection('contact');
              }}
            >
              Let’s Connect <Icon name="arrowUpRight" size={16} />
            </a>
          </div>
          <p className="hero__interest anim" style={cssVars({ '--d': '320ms' })}>
            <span className="pulse" aria-hidden="true" />
            {profile.careerInterest}
          </p>
        </div>

        <aside className="hero__card anim" style={cssVars({ '--d': '200ms' })} aria-label="Profile card and selected work">
          <div className="hero__portrait">
            <div className="hero__portrait-mark">
              <Monogram size={72} />
            </div>
            <div className="hero__stack" aria-label="Areas of work: interface, logic, database">
              {['Interface', 'Logic', 'Database'].map((layer, i) => (
                <span key={layer} className="hero__layer" style={cssVars({ '--i': i })}>
                  <span className="hero__layer-dot" aria-hidden="true" />
                  {layer}
                </span>
              ))}
            </div>
          </div>
          <div className="hero__selected">
            <p className="micro-label">Selected work</p>
            <ol>
              {featuredProjects.map((p, i) => (
                <li key={p.slug}>
                  <a
                    href={projectHref(p.slug)}
                    onClick={(e) => {
                      e.preventDefault();
                      openProject(p.slug);
                    }}
                  >
                    <span className="hero__selected-index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hero__selected-name">{p.name}</span>
                    <span className="hero__selected-tech">{p.technologies.slice(0, 2).join(' · ')}</span>
                    <Icon name="arrowUpRight" size={15} />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      <div className="container">
        <dl className="snapshot anim" style={cssVars({ '--d': '380ms' })} aria-label="Professional snapshot">
          {snapshot.map((s) => (
            <div key={s.label} className="snapshot__item">
              <dt>
                <span className="snapshot__label">{s.label}</span>
              </dt>
              <dd>
                <span className="snapshot__value">{s.value}</span>
                <span className="snapshot__note">{s.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
