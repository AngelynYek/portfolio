# Angelyn Yek's pixel portfolio

A dependency-free, responsive portfolio built with native JavaScript, a pixel-art canvas island, and the six supplied animated GIFs. The canvas is decorative; every Pokémon is a keyboard-accessible HTML control. Sections share a native dialog with Escape, focus management, and a Back button.

## Run

- `npm run dev` — local preview on http://127.0.0.1:5173
- `npm test` — content and scene checks
- `npm run build` — static output in `dist/`

## Personalize

Edit `content.js` for the biography, skills, projects, learning topics, achievements, and contact details. Empty sections intentionally show “coming soon” rather than invented credentials. Talonflame opens the Achievements screen; add entries to `portfolio.achievements` using a title, description, and optional URL.

The About screen contains the resume download. To replace it, add your PDF under `assets/`, update `portfolio.resume.url`, and keep `isSample` set to `false`.

Sprite placement, section mappings, and transparent crop bounds are also in `content.js`. The original GIFs are unchanged. `scene.js` draws the island; `main.js` handles interactions; `styles.css` styles the page and shared Pokédex frame.

The supplied GIF sprites animate continuously. Reduced-motion preferences disable CSS hover movement and popup transitions. Hover labels also appear on keyboard focus; the Show labels button helps touch users.

## Assets and credits

Sprites and `assets/pokedex-frame.jpg` were supplied by the portfolio owner. Artist credits from the supplied filenames are displayed in the Credits screen and listed in `content.js`. Pokémon is owned by Nintendo, Game Freak, and Creatures; this is an independent portfolio.

The PKMN Western font is by nue-of-k: https://github.com/nue-of-k/pkmn (MIT license, included in `assets/fonts/LICENSE.txt`). The isometric café scene is code-drawn for this portfolio, using the supplied recording as a composition reference.
