import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { portfolio, pokemon } from '../../content.js';

test('all sections, editable contact text, navigation, labels, and resume download work', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // Override the served content, without editing the user's file, to catch hardcoded descriptions.
  const description = 'Contact description supplied by the browser test.';
  await page.route('**/content.js', async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: `${await response.text()}\nportfolio.contact.description = ${JSON.stringify(description)};` });
  });
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  for (const entry of pokemon) {
    const opener = page.getByRole('button', { name: `${entry.label} — ${entry.name}`, exact: true });
    await opener.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(entry.label);
    await expect(page.locator('#entry-content')).not.toBeEmpty();
    if (entry.id === 'contact') await expect(page.locator('#entry-content')).toContainText(description);
    if (entry.id === 'about') {
      const link = dialog.getByRole('link', { name: /DOWNLOAD.*RESUME/ });
      await expect(link).toHaveAttribute('href', portfolio.resume.url);
      const downloadEvent = page.waitForEvent('download');
      await link.click();
      const download = await downloadEvent;
      expect(await download.failure()).toBeNull();
      const downloaded = await readFile(await download.path());
      const original = await readFile(new URL(`../../${portfolio.resume.url}`, import.meta.url));
      expect(downloaded.equals(original)).toBe(true);
    }
    await dialog.getByRole('button', { name: '< BACK', exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
  }
  const labels = page.locator('#labels-toggle');
  await labels.click();
  await expect(labels).toHaveAttribute('aria-pressed', 'true');
  for (const tooltip of await page.locator('.tooltip').all()) await expect(tooltip).toHaveCSS('opacity', '1');
  await labels.click();
  await expect(labels).toHaveAttribute('aria-pressed', 'false');
  const credits = page.getByRole('button', { name: 'CREDITS', exact: true });
  await credits.click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(credits).toBeFocused();
  expect(errors).toEqual([]);
});
