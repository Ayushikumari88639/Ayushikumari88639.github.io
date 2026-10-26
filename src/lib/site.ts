import { useEffect, useState } from 'react';

/** Resolve a file in /public against the deployed base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

// ── Routing ────────────────────────────────────────────────────────────────
// Project pages live at ?project=<slug>. Query strings work on every static
// host (GitHub Pages, Netlify, Vercel) without rewrite rules, and the URLs
// are shareable.

const ROUTE_EVENT = 'portfolio:route';

const readSlug = () => new URLSearchParams(window.location.search).get('project');

export function useProjectRoute() {
  const [slug, setSlug] = useState<string | null>(() => readSlug());
  useEffect(() => {
    const update = () => setSlug(readSlug());
    window.addEventListener('popstate', update);
    window.addEventListener(ROUTE_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(ROUTE_EVENT, update);
    };
  }, []);
  return slug;
}

export const projectHref = (slug: string) => `${window.location.pathname}?project=${encodeURIComponent(slug)}`;

export function openProject(slug: string) {
  window.history.pushState({}, '', projectHref(slug));
  window.dispatchEvent(new Event(ROUTE_EVENT));
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** Scroll to a section on the home page, leaving a project page if needed. */
export function goToSection(id: string) {
  const onProjectPage = Boolean(readSlug());
  const hash = id === 'home' ? '' : `#${id}`;
  if (onProjectPage) {
    window.history.pushState({}, '', `${window.location.pathname}${hash}`);
    window.dispatchEvent(new Event(ROUTE_EVENT));
    // Wait for the home page to render before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id, 'auto')));
    return;
  }
  window.history.replaceState({}, '', `${window.location.pathname}${hash}`);
  scrollToId(id);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id: string, behavior?: ScrollBehavior) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth') });
  // Move keyboard focus to the section for screen-reader and keyboard users.
  const heading = el.querySelector<HTMLElement>('h1, h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

// ── Scroll-linked helpers ──────────────────────────────────────────────────

export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = ids[ids.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, enabled]);
  return active;
}

/** Adds `is-visible` to `.reveal` elements as they enter the viewport. */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/** Inline CSS custom properties, e.g. style={cssVars({ '--d': '80ms' })}. */
export const cssVars = (vars: Record<string, string | number>) => vars as unknown as import('react').CSSProperties;
