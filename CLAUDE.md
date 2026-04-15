# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server → http://localhost:5174
npm run build      # Production build → .svelte-kit/output/
npm run preview    # Preview production build
npm run check      # svelte-check + TypeScript (no type errors before commit)
```

## Architecture

SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v3. Deployed on Vercel at leojjoseph.com via `@sveltejs/adapter-vercel`.

**Single-page layout**: one route (`/`) with anchor-linked sections — `#hero`, `#projects`, `#skills`, `#about`, `#contact`. Sections are composed in `src/routes/+page.svelte`.

**Styling**: Tailwind v3 (PostCSS plugin, not Vite plugin). All theme colors are CSS custom properties declared in `src/app.css`. `[data-theme='dark']` is the default; `[data-theme='light']` overrides. Never hardcode hex values in components — always use `var(--color-*)`.

**Theme**: Automotive. Dark graphite `#0d0f14` / chrome text `#e8ecef` / amber accent `#d4a017` / cobalt `#2b4a7a`. Light mode swaps to warm white and muted variants. No-flash script in `app.html` reads `localStorage` before first paint.

**Fonts**: `Inter Variable` (UI) and `JetBrains Mono Variable` (accents/mono), both self-hosted via `@fontsource-variable/`.

## File structure

```
src/
  lib/
    assets/photos/     # Hero carousel images (auto-discovered via import.meta.glob)
    components/        # Reusable: Nav, Footer, PhotoCarousel, ProjectCard, etc.
    sections/          # Page sections: Hero, Projects, Skills, About, Contact
    data/              # Static content: profile.ts, projects.ts, skills.ts, about.ts
    server/            # Server-only: email.ts (Resend wrapper)
  routes/
    +layout.svelte     # HTML shell, Nav, Footer
    +layout.ts         # prerender = true
    +page.svelte       # Composes all sections
    +page.server.ts    # Contact form action (?/send)
  hooks.server.ts      # Security headers
  app.html             # No-flash theme script, favicon
  app.css              # Tailwind directives + CSS vars
static/
  leo_favicon.jpeg
```

## Contact form

Server-side form action at `+page.server.ts` — the `send` action. Security layers:

1. SvelteKit CSRF (built-in, same-origin check)
2. Honeypot field (`name="website"` — invisible, non-empty = drop)
3. In-memory rate limit: 3 messages per 10 minutes per IP
4. Server-side validation: name (1–100), email (RFC-ish regex), message (10–5000)
5. Resend SDK — API key loaded from `$env/static/private`, never reaches client bundle
6. CSP headers in `svelte.config.js`
7. Security headers (`X-Frame-Options`, etc.) in `hooks.server.ts`

Required env vars (set in Vercel project settings and `.env.local` locally):

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=l1joseph@ucsd.edu
```

## Photo carousel

Add images to `src/lib/assets/photos/` and they auto-appear on next build. Glob pattern in `PhotoCarousel.svelte` picks up `.png`, `.jpg`, `.jpeg`, `.webp`, `.JPG`, `.JPEG`, `.PNG`. HEIC files are not supported by browsers — convert with `sips -s format jpeg INPUT.HEIC --out OUTPUT.jpg` before dropping in.

## Content data files

All copy lives in `src/lib/data/`. Edit these to update the site without touching component code:

- `profile.ts` — name, tagline, personal line, social links
- `projects.ts` — 8 project cards with metrics, descriptions, tags
- `skills.ts` — grouped skill badges
- `about.ts` — bio paragraphs, education, research/industry experience, coursework

**Bio maintenance rule**: keep `about.ts` bio paragraphs at the lab-level only (Knight Lab, Alexandrov Lab). No specific project names, paper counts, or conference years — those live in `projects.ts`.

## Svelte 5 patterns

This codebase uses Svelte 5 runes throughout:

- State: `let x = $state(value)`
- Props: `let { prop } = $props()`
- Derived: `let y = $derived(expr)`
- Effects: `$effect(() => { ... })`
- Children: `{@render children()}`

Do not use legacy Svelte 4 syntax (`export let`, `$:`, `<slot />`).

## Git conventions

See global `~/.claude/CLAUDE.md`. Branch: `feat-*`, `fix-*`, etc. Commit: `FEAT-ticket: description`. No Co-Authored-By lines.
