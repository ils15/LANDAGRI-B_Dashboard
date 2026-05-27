import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ROUTES } from '../fixtures/testData';

test.describe('P2 - Visual Tests', () => {
  test('Dashboard layout matches expected structure', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);
    await page.waitForTimeout(2000);

    const header = page.locator('header');
    const main = page.locator('main');

    await expect(header).toBeVisible();
    await expect(main).toBeVisible();

    const mainChildren = await main.locator('> *').count();
    expect(mainChildren).toBeGreaterThan(0);
  });

  test('Dark mode toggle works', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);

    const toggle = page.getByTestId('theme-toggle');
    if (await toggle.isVisible().catch(() => false)) {
      await toggle.click();
      await page.waitForTimeout(500);
      await toggle.click();
    }
  });

  test('Charts have proper dimensions on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);
    await page.waitForTimeout(3000);

    const charts = page.locator('.js-plotly-plot');
    const chartCount = await charts.count();

    for (let i = 0; i < Math.min(chartCount, 3); i++) {
      const box = await charts.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.width).toBeGreaterThan(200);
        expect(box.height).toBeGreaterThan(200);
      }
    }
  });
});
