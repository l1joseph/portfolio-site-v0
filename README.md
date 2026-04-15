# leojjoseph.com

Personal portfolio site. Built with SvelteKit, Tailwind CSS, and Resend.

## Stack

- **Framework**: SvelteKit 2 + Svelte 5 + TypeScript
- **Styling**: Tailwind CSS v3 + CSS custom properties (automotive dark theme)
- **Fonts**: Inter Variable + JetBrains Mono Variable (self-hosted)
- **Contact**: Resend via SvelteKit server action
- **Deploy**: Vercel (auto-deploys on push to `main`)

## Development

```bash
npm install
npm run dev        # http://localhost:5173
```

Create `.env.local` for the contact form:

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=l1joseph@ucsd.edu
```

## Adding photos to the carousel

Drop images into `src/lib/assets/photos/`. They auto-appear on next build. HEIC files must be converted first:

```bash
sips -s format jpeg input.HEIC --out output.jpg
```

## Updating content

Edit the files in `src/lib/data/`:

| File | Content |
|---|---|
| `profile.ts` | Name, tagline, social links |
| `projects.ts` | Project cards |
| `skills.ts` | Skill groups |
| `about.ts` | Bio, education, experience |

## Build

```bash
npm run build
npm run preview    # preview production build locally
```

Type check:

```bash
npm run check
```
