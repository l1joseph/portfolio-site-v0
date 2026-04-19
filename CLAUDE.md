# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server → http://localhost:5173/
npm run build      # Production build → .svelte-kit/output/
npm run preview    # Preview production build
npm run check      # svelte-check + TypeScript (no type errors before commit)
```

## Branches & Deployments

This repo has two active site variants, both deployed under the same Vercel project:

| Branch | URL | Theme |
|--------|-----|-------|
| `main` | leojjoseph.com | Automotive — dark graphite, amber accent, photo carousel hero |
| `feat-terminal-redesign` | bash.leojjoseph.com | Terminal/brutalist — JetBrains Mono, shell-prompt sections, pretext ASCII banner |

**Never push `feat-terminal-redesign` to `main`.** The terminal redesign is a permanent side branch, not a PR target.

The terminal branch is a hidden easter egg — linked from main's footer via a `>_` icon. The main site is linked from the terminal footer via a car icon.

`backup/pre-rewrite` preserves the old Next.js site before the SvelteKit rewrite.

## Architecture

SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v3. Deployed on Vercel at leojjoseph.com via `@sveltejs/adapter-vercel`.

**Single-page layout**: one route (`/`) with anchor-linked sections — `#hero`, `#projects`, `#publications` (terminal branch only), `#skills`, `#about`, `#contact`. Sections composed in `src/routes/+page.svelte`.

**Styling**: Tailwind v3 (PostCSS plugin, not Vite plugin). All theme colors are CSS custom properties in `src/app.css`. `[data-theme='dark']` is default; `[data-theme='light']` overrides. Never hardcode hex values — always use `var(--color-*)`.

**Theme toggle**: reads system preference on first load; session-only override via a button. No localStorage persistence.

## Branch-specific design systems

### `main` — Automotive theme
- **Fonts**: `Inter Variable` (UI), `JetBrains Mono Variable` (accents)
- **Colors**: dark graphite `#0d0f14` / chrome text `#e8ecef` / amber accent `#d4a017` / cobalt `#2b4a7a`
- **Layout**: `max-w-6xl` centered, card-based project grid, `PhotoCarousel` hero
- **Key components**: `PhotoCarousel`, `ProjectCard`, `SectionHeading`, `SocialLinks`, `AsciiBackground`

### `feat-terminal-redesign` — Terminal theme
- **Fonts**: `JetBrains Mono Variable` everywhere. `Bricolage Grotesque Variable` imported but only used as the measurement font inside `AsciiNameBanner` (never rendered directly).
- **Colors**: `--color-bg: #0a0a0b` / `--color-text: #e4e4e7` / `--color-accent: #60a5fa` (blue) / `--color-prompt: #22c55e` (green `$`)
- **Layout**: left-flush, no `max-w` centering — only `px-6` left padding. Content sits at the viewport edge like a real terminal.
- **Section headers**: shell prompts (`leo@joseph:~$ cat about.md`) via `ShellPromptHeading` + `Typewriter`
- **Hero**: pretext ASCII name banner (`AsciiNameBanner`) with `RippleField` physics, cycling photo panel (greyscale + blue tint)
- **Projects**: split into `ls -la projects/research` and `ls -la projects/fun` via `category` field
- **Publications**: separate section (`cat publications.bib`) — only presented posters shown (no in-prep papers)
- **Key components**: `AsciiNameBanner`, `Typewriter`, `BlinkingCursor`, `ShellPromptHeading`, `ProjectLine`

## File structure

```
src/
  lib/
    ascii/             # rippleField.ts, asciiize.ts — shared by both branches
    assets/photos/     # Cycling photos (auto-discovered via import.meta.glob)
    components/
      terminal/        # AsciiNameBanner, Typewriter, BlinkingCursor, ShellPromptHeading (terminal branch)
      Nav, Footer, PhotoCarousel, ProjectCard, SocialLinks, ThemeToggle, etc.
    sections/          # Hero, Projects, Publications (terminal only), Skills, About, Contact
    data/              # profile.ts, projects.ts, skills.ts, about.ts, publications.ts (terminal only)
    server/            # email.ts (Resend wrapper)
  routes/
    +layout.svelte     # HTML shell, Nav, Footer
    +layout.ts         # prerender = true
    +page.svelte       # Composes all sections
    +page.server.ts    # Contact form action (?/send)
  hooks.server.ts      # Security headers
  app.html             # No-flash theme script, favicon
  app.css              # Tailwind directives + CSS vars (palette differs per branch)
static/
  leo_favicon.jpeg
```

## Contact form

Server-side form action at `+page.server.ts` — the `send` action. Security layers:

1. SvelteKit CSRF (built-in, same-origin check)
2. Honeypot field (`name="website"` — invisible, non-empty = drop)
3. In-memory rate limit: 3 messages per 10 minutes per IP
4. Server-side validation: name (1–100), email (RFC-ish regex), message (10–5000)
5. Resend SDK — API key loaded from `$env/dynamic/private` (not static — avoids build-time requirement)
6. CSP headers in `svelte.config.js`
7. Security headers (`X-Frame-Options`, etc.) in `hooks.server.ts`

Required env vars (set in Vercel project settings and `.env.local` locally):

```
RESEND_API_KEY=re_xxx        # mark as Sensitive in Vercel
CONTACT_TO_EMAIL=l1joseph@ucsd.edu
```

## Photos

Add images to `src/lib/assets/photos/` and they auto-appear. HEIC not supported by browsers — convert first:
```bash
sips -s format jpeg INPUT.HEIC --out OUTPUT.jpg
```

Per-photo `object-position` overrides live in `objectPosition()` in `Hero.svelte` (terminal branch) or `PhotoCarousel.svelte` (main branch).

## Content data files

All copy lives in `src/lib/data/`. Edit these to update without touching components:

- `profile.ts` — name, tagline, personal line, social links (includes `scholar` key on terminal branch)
- `projects.ts` — projects with `category: 'research' | 'fun'` (terminal branch); plain array (main branch)
- `skills.ts` — grouped skill lists
- `about.ts` — bio paragraphs, education, research/industry experience
- `publications.ts` — presented posters only; no in-prep papers (terminal branch only)

**Bio rule**: keep bio paragraphs lab-level (Knight Lab, Alexandrov Lab, Bansal Lab). No paper counts, conference years, or project names in bio — those belong in `projects.ts` / `publications.ts`.

**Publications rule**: only list actually presented work. In-prep papers belong in `projects.ts` descriptions, not `publications.ts`.

## ASCII name banner (`feat-terminal-redesign`)

`AsciiNameBanner.svelte` renders "LEO JOSEPH" as proportional ASCII art:

1. Draws text as white on black using `Bricolage Grotesque` at ~120px on an offscreen canvas
2. Area-averages down to `cols × rows` grid via `drawImage(src, 0, 0, cols, rows)`
3. Maps luminance using **inverted** ramp: `mapLuminanceToChar(1 - lum, ramp)` so bright text → dense chars
4. Skips pixels with `lum < 0.01` (background)
5. `RippleField` drives spring-physics displacement; pointer and touch events create ripples

`buildWidthMap` in `asciiize.ts` uses pretext (`prepareWithSegments`/`layoutWithLines`) to measure exact advance widths per character for proportional rendering.

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
