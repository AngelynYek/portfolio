# Angelyn Yek's portfolio

## Local development

Run `npm run dev`, then open http://127.0.0.1:5173. Save changes and refresh the browser.

## Build

Run `npm run build`. This replaces the generated `dist/` directory, so deleted assets are not carried into the next deployment. Keep original files outside `dist/`.

## Tests

Browser tests use an installed Google Chrome. Install the development tools once:

```sh
npm ci
```

Run `npm test` for all checks. `npm run test:unit` runs the fast asset, drawing, and clean-build checks; `npm run test:browser` builds the site and checks its interactions in headless Chrome, including downloading the resume. No separate test browser download is needed.

Stop the local development server before running browser tests: the tests start their own server on port 5173 to check the freshly built site.

Playwright is used only for testing. The published website has no JavaScript runtime dependencies.

