import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL: 'http://127.0.0.1:5173', channel: 'chrome' },
  webServer: {
    command: 'node scripts/serve.mjs --dist',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: false,
  },
});
