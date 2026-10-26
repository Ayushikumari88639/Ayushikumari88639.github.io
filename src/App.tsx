import { useEffect, useMemo } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { navItems } from './data/profile';
import { scrollToId, useActiveSection, useProjectRoute, useReveal } from './lib/site';
import { Home } from './pages/Home';
import { ProjectPage } from './pages/ProjectPage';

export default function App() {
  const slug = useProjectRoute();
  const onHome = !slug;
  const ids = useMemo(() => navItems.map((n) => n.id), []);
  const active = useActiveSection(ids, onHome);
  useReveal(slug);

  // Deep links like /#projects scroll to the section on first load.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (onHome && hash && ids.includes(hash)) requestAnimationFrame(() => scrollToId(hash, 'auto'));
  }, []);

  // Thin reading-progress line under the navigation.
  useEffect(() => {
    const bar = document.getElementById('progress');
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [slug]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="progress" className="progress" aria-hidden="true" />
      <Navbar active={active} onHome={onHome} />
      {slug ? <ProjectPage key={slug} slug={slug} /> : <Home />}
      <Footer />
    </>
  );
}
