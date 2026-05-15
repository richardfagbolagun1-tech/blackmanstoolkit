# The Black Man's Toolkit

An interactive online resource for Black men to manage their health and overall wellbeing across six dimensions: body, mind, money, spirit, brotherhood, and community.

**From Black Thrive Lambeth. Designed by The Office of Art and Technology.**

Live site: https://blackmanstoolkit.netlify.app/

---

## What this is

A static, multi-page website built with vanilla HTML, CSS, and JavaScript. No build step, no framework, no server. Every page is plain HTML that loads three shared assets and renders content from a single data file.

This is **production code, not a design mockup**. It runs as-is.

## Project structure

```
.
├── index.html            # Homepage with cinematic hero + 6-chapter directory
├── about.html            # Long-form introduction
├── quiz.html             # 5-question "where to start" quiz
├── resources.html        # Filterable UK resource finder (all 90+ orgs)
├── bookmarks.html        # User's saved-for-later list (localStorage)
├── chapters/
│   ├── body.html         # Chapter 01 — Physical health (Leon, 45)
│   ├── mind.html         # Chapter 02 — Mental/emotional (Darius, 36)
│   ├── money.html        # Chapter 03 — Financial health (Andre, 41)
│   ├── spirit.html       # Chapter 04 — Spiritual / self-knowledge (Marcus, 33)
│   ├── brotherhood.html  # Chapter 05 — Brotherhood (Kevin, 38)
│   ├── community.html    # Chapter 06 — Community leadership (Sean, 42)
│   └── _template.html    # Source template; do not deploy
└── assets/
    ├── data.js           # ALL chapter content (stories, questions, actions, resources)
    ├── style.css         # Global stylesheet (Afro-cultural palette, no framework)
    ├── app.js            # Shared app logic (progress, bookmarks, audio, share, palette)
    └── chapter.js        # Chapter page renderer (reads window.CHAPTER_SLUG)
```

Every chapter HTML file is identical except for one line:

```html
<script>window.CHAPTER_SLUG = "body";</script>
```

The page then calls `chapter.js`, which looks up that slug in `data.js` and renders the full chapter.

## How content lives

**All written content is in `assets/data.js`** — a single JavaScript object with:

- `meta` — title, tagline, credit line
- `chapters[]` — six entries, each with:
  - `slug`, `number`, `title`, `kicker`, `promise`
  - `character` (name, age, line)
  - `hero_image`, `portrait` (Unsplash URLs)
  - `story[]` — array of paragraphs
  - `pull_quote` — single sentence
  - `stats[]` — three big-number stats
  - `questions[]` — reflection prompts
  - `actions[]` — `{h, p}` headline + paragraph pairs
  - `resources[]` — `{name, note, link, black_led?}` UK organisations

To edit any chapter's text, edit `data.js`. Nothing else needs to change.

## Interactive features

All client-side, persisted in `localStorage`:

- **Progress tracking** — chapters mark themselves read after 8 seconds of viewing
- **Bookmarks** — "save for later" toggle on every resource
- **Journal** — type into any reflection question, saved per-question
- **Audio narration** — uses browser `speechSynthesis` to read each chapter aloud
- **Share** — Web Share API + WhatsApp deep-link + copy-link fallback
- **Palette tweaks** — floating button bottom-right, 3 curated palettes (Sankofa / Brixton / Mansa)
- **Quiz routing** — 5 questions tally per-chapter scores, recommends one to start with
- **Resource filter** — chapter filter + Black-led toggle + text search

## Deploy to Netlify via Git (your goal)

1. **Create a GitHub repo** (e.g. `black-mans-toolkit`).
2. **Push these files to the repo root.** No build step is needed — Netlify can serve them directly.
3. **In Netlify:** New site → Import from Git → pick the repo.
   - Build command: *(leave blank)*
   - Publish directory: `/` (root)
4. Connect the custom domain `blackmanstoolkit.netlify.app` (or your own) under Domain Settings.
5. Every push to `main` will auto-deploy.

The included `netlify.toml` already sets the publish dir and a clean-URL redirect.

## Common edit tasks

### Change a chapter's text
Edit `assets/data.js`. The data is plain JS object literals, no quotes-around-keys gymnastics needed.

### Add a new resource to a chapter
Add an entry to that chapter's `resources` array in `data.js`:
```js
{ name: "New org", note: "What they do, phone number", link: "https://...", black_led: true }
```

### Add a 7th chapter
1. Add a new entry to `chapters[]` in `data.js` (use existing chapters as a template)
2. Copy `chapters/_template.html` to `chapters/<new-slug>.html` and replace `__SLUG__` with the new slug
3. Add a link in the footer of every other HTML file
4. Add a card row variant in `index.html` (the `sizes` array decides the grid layout)

### Swap a photo
Find the chapter in `data.js` and replace `hero_image` and `portrait` with new Unsplash URLs (or self-hosted image paths). All photos must be of Black men.

### Change colours globally
Edit the `:root` CSS variables at the top of `assets/style.css`. The three palette themes are also defined there (under `[data-palette="..."]` blocks).

### Add Google Analytics / Plausible
Add the snippet to the `<head>` of every HTML file. Or, to do it once, add a tiny `<script>` that injects it on `DOMContentLoaded` in `assets/app.js`.

## Design system / brand

- **Font stack**: Bricolage Grotesque (display), Newsreader (serif italic), Manrope (sans). Loaded from Google Fonts.
- **Default palette (Sankofa)**: deep wine `#8a1a1a`, turmeric gold `#e8a93a`, cream paper `#f3e9d2`, ink `#1a0d07`.
- **No em dashes anywhere** — content rule. Use commas, colons, or full stops.
- **All people in photos must be Black men.** This is non-negotiable for the project.
- **No emoji.** No icon-as-decoration. Iconography only where functional (share, narrate, bookmark, etc.).

## What to tell Claude Code

> "Take the files in this folder, push them to a new GitHub repo, then walk me through connecting that repo to Netlify for auto-deploy. The site is plain static HTML — no build step. After deploy is working, I'll come back with content edits."

Claude Code can also help with:
- Setting up a custom domain
- Adding analytics
- Form handling (if you want a feedback / "share your story" form)
- Image hosting (moving off Unsplash to self-hosted CDN)
- Accessibility audit
- SEO meta tags + OpenGraph cards

## What to keep doing in the design tool (this conversation)

- Adding pages, content, sections
- Visual changes (colours, type, layout)
- New interactive features (in-browser only)
- Swapping photos
- Adding more chapters

Then redownload the folder and `git push` from Claude Code's side.

---

© 2026 Black Thrive Lambeth. Designed by The Office of Art and Technology.
