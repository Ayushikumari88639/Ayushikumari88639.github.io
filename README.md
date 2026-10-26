# Ayushi Kumari — Developer Portfolio

Personal portfolio of **Ayushi Kumari**, MCA student (Patna Women's College, 2025–27) and aspiring full-stack developer.
Built with **React 19, TypeScript and Vite**, plain CSS design tokens, and no UI or animation libraries.

All content comes from `Ayushi_Kumari_Resume.docx`. Nothing is invented: projects without a public repository say
“Repository coming soon”, illustrations are labelled as illustrations, and the research project reports no findings.

---

## Run it locally

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run typecheck  # optional TypeScript check
```

## Project structure

```
src/
  data/            ← edit content here — every section renders from these files
    profile.ts         name, email, links, resume path, snapshot facts, nav
    projects.ts        all projects (featured flag, links, flows, sections…)
    skills.ts          skill groups; `studied: true` marks coursework-only skills
    experience.ts      internships
    achievements.ts    awards, training, workshops
    certifications.ts  certificate records (+ optional files)
    education.ts       education timeline and MCA coursework
  components/      ← one file per section + shared pieces (Modal, Icon, ProjectVisual…)
  pages/           ← Home and ProjectPage
  lib/site.ts      ← routing (?project=slug), scroll helpers, asset() path helper
  styles/          ← tokens.css (palette, type, spacing), global.css, sections.css
public/
  resume/Ayushi_Kumari_Resume.pdf
  certificates/    ← put certificate scans here
  projects/        ← put screenshots here, one folder per project slug
  og-image.png, favicon.svg, apple-touch-icon.png
```

Project pages use `?project=<slug>` URLs, so they work on any static host without redirect rules.

## Updating content

**Add a project** — copy one object in `src/data/projects.ts`, give it a unique `id` and `slug`, and fill in what you
know. Optional fields you leave out simply don't render (no empty buttons or dead links).

**Add screenshots** — save optimised images (WebP or JPG, ~1600px wide) to `public/projects/<slug>/`, then:

```ts
thumbnail: 'projects/verisync/dashboard.webp',
screenshots: [
  { src: 'projects/verisync/dashboard.webp', alt: 'Faculty dashboard showing today’s attendance', caption: 'Faculty dashboard' },
],
```

**Add repository / demo links** — set `githubUrl`, `liveUrl` or `videoUrl` on the project.

**Add a certificate** — save the scan to `public/certificates/` and set `file` (PDF or image) and optionally `thumb`
(a small image) on its record in `src/data/certifications.ts`. It then gets a thumbnail, a preview dialog and a
download button, and internships linked by `certificateId` get a “Certificate” button automatically.
Only add documents you are happy to make public — never ID documents.

**Replace the resume** — overwrite `public/resume/Ayushi_Kumari_Resume.pdf`. Set `resumePdf: ''` in `profile.ts`
to hide all resume buttons.

## Contact form

Without configuration, the form validates input and opens the visitor's email app with the message pre-filled
(nothing is “sent” behind the scenes). To deliver messages directly:

1. Create a free form at [formspree.io](https://formspree.io) and copy its form ID (e.g. `xyzabcde`). This ID is public, not a secret.
2. **GitHub Pages:** repository → Settings → Secrets and variables → Actions → **Variables** → add `FORMSPREE_ID`.
   **Locally / other hosts:** copy `.env.example` to `.env` and set `VITE_FORMSPREE_ID`.
3. Rebuild. The button changes to “Send message”.

## Publish on GitHub Pages

1. Create a new **public** repository on GitHub.
   - Name it **`Ayushikumari88639.github.io`** for the address `https://ayushikumari88639.github.io/`, or
   - any other name (e.g. `ayushi-portfolio`) for `https://ayushikumari88639.github.io/ayushi-portfolio/`.
   (The name `portfolio` is already used by your older mini-project.)
2. Push this folder:
   ```bash
   git remote add origin https://github.com/Ayushikumari88639/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for “Deploy to GitHub Pages” to finish (≈1–2 min). Re-run it once if the first
   run started before step 3. The live URL appears in the workflow summary.

The build uses a relative base path, so the same build works for both repository names above.
Every later `git push` to `main` redeploys automatically.

### Netlify or Vercel

Import the repository; `netlify.toml` / `vercel.json` already set the build command (`npm run build`) and output
folder (`dist`). Add `SITE_URL` (your live URL) as an environment variable so canonical and social-preview tags are filled in.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus states, `aria-current` on the active nav item.
- Native `<dialog>` for previews: focus is trapped, Escape closes, focus returns to the trigger.
- Colour pairs meet WCAG AA; terracotta text uses a darker `--accent-ink` (5.3:1 on ivory).
- Animations are CSS-only and switch off under `prefers-reduced-motion`.
- No analytics or tracking is included.
