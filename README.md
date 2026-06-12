# Support-to-Tech — Classroom Deck

An interactive big-screen presentation for a 42-session internal training
program taking customer support representatives into tech roles
(curriculum aligned to CompTIA Tech+, A+ and Network+ objectives).

373+ slides · 36 true stories from IT history · 17 diagrams (including
six technology-evolution timelines) · 10 live simulations · embedded
videos · presenter-only deep-background notes · a built-in editor for
adding your own photos, videos and text slides anywhere in any session.

## Host it on GitHub Pages (5 minutes)

1. Create a repository and upload everything in this folder
   (`index.html`, `slides-data.js`, `diagrams.js` must sit together in
   the repository root).
2. Repository **Settings → Pages → Source: Deploy from a branch →
   Branch: main / (root) → Save**.
3. Your deck is live at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two. Bookmark it on the classroom machine.

No build step, no dependencies — it's plain HTML/JS. (Opening
`index.html` by double-click also works, but YouTube embeds require a
hosted URL or a local server such as `python -m http.server`.)

> If your training content is internal, make the repository **private**
> and use GitHub Pages on a paid plan, or host the three files on any
> internal web server instead.

## Presenting — controls

| Key / action | Does |
|---|---|
| `→` `space` or click | advance (story lines reveal one by one; facts appear last) |
| `←` | back |
| `G` | session grid — jump anywhere (`Esc` closes) |
| `N` | presenter notes + **Deep Background** (210 research entries: dates, names, figures, mechanics — visible only on your screen) |
| `F` | fullscreen |
| `✎ Add media` (top-right) | insert a slide **right after the one you're viewing** |

Every session follows the same arc: true story → big question (let the
room argue 2 minutes) → explainers → diagrams/videos → comparison →
wow fact → lab handoff.

## Adding your own photos, videos and text

Click **✎ ADD MEDIA TO THIS SESSION** on any slide:

- **📷 Upload photo** — auto-resized, stored in the browser. Best source
  for component shots: photograph your own lab hardware.
- **🔗 Image URL** — any hosted image (Wikimedia Commons images are
  freely licensed — try "DDR4 SDRAM module", "Intel 4004", "IBM RAMAC").
- **▶ YouTube link** — becomes an embedded video slide.
- **📝 Text slide** — title + lines (`- ` prefix makes bullets) for your
  own data, policies or announcements.

The new slide appears immediately after the slide you were viewing.
Media lives per-browser: use **Export/Import media pack** (in the
editor) to move your curated set between machines or share with
co-trainers. The footer shows the build number (currently **v7**) — if
behavior seems off, confirm you're running the latest files.

## Editing the course content

All 42 sessions live in `slides-data.js` as plain objects: stories,
questions, explainer points, comparisons, wow facts, on-screen facts,
deep-background notes, diagram and video assignments. Edit, save,
refresh. Diagrams are SVG builders in `diagrams.js`.

A spare list of verified PowerCert video IDs sits in `slides-data.js`
(search "SPARE VERIFIED") — paste any into a session's `vid` field.

## PowerPoint edition

`powerpoint/` contains the same 42 sessions as three editable decks
(one per phase) with presenter notes on every slide. After editing
`slides-data.js`, regenerate them with:

```bash
npm i -g pptxgenjs && npm i sharp
node make-pptx.js
```
