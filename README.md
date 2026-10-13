# Angelyn Yek — Portfolio

A responsive, folder-inspired personal portfolio using HTML, CSS, and JavaScript, with no framework or runtime dependencies.

## Run locally

With Node.js 22 or later:

```sh
npm run dev
```

Open http://127.0.0.1:5173. No dependency installation is required. Refresh the browser after editing files.

```sh
npm test
npm run build
```

Deploy the generated `dist/` directory to any static host. Preview the build with `node scripts/serve.mjs --dist` instead of the development command.

## Personalize

- **Content:** Edit `content.js` for your bio, skills, projects, learning list, and contact links. Personal details and project concepts are explicitly labeled samples.
- **Resume:** Add `assets/resume.pdf`, set `portfolio.resume.url` to `./assets/resume.pdf`, and clear the sample note. The current download is a labeled text template, not a finished resume.
- **Contact:** Set `portfolio.contact.email`, `github`, and `linkedin`. Missing details never link to invented accounts.
- **Projects:** Replace concept descriptions and add real HTTPS URLs. Preview compositions are in `main.js`. Update sample labels in `index.html` once real content is supplied.
- **Portrait:** Replace the inline flower illustration in `index.html` with a photo and descriptive alt text if desired.
- **Appearance:** Shared colors and typography are in `styles.css`. The background is `#FAFAF7`, the four accents match the reference, and no gradients are used.

## Structure

`index.html` owns semantic sections, `content.js` owns editable data, `main.js` renders repeating components and opens native dialogs, and `styles.css` owns the shared visual system and responsive layouts. Navigation and downloads use native HTML. Project dialogs support Escape, keyboard focus containment, and focus return. Folder motion honors reduced-motion preferences.

The Node scripts serve and copy static files. The preview server binds to loopback and is only for local development. Tests check section targets, resume availability, project integrity, and palette/motion requirements. Google Fonts enhance the typography, with system fallbacks when unavailable.
