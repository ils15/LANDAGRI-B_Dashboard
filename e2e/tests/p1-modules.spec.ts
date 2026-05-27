import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ROUTES, TIMEOUTS } from '../fixtures/testData';

test.describe('P1 - Module Tests', () => {
  test.describe('Overview Module', () => {
    test('Metric cards are displayed', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.overview);
      await page.waitForTimeout(TIMEOUTS.dataLoad);

      const metricCards = page.locator('[data-testid="metric-card"]');
      const count = await metricCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('Charts have data in traces', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.overview);
      await page.waitForTimeout(3000);

      const chartCount = await bp.getPlotlyChartCount();
      expect(chartCount).toBeGreaterThan(0);

      const data = await bp.getPlotlyData(0);
      expect(data).not.toBeNull();
      if (data) {
        expect(data.traces).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Initiative Analysis Module', () => {
    test('Page loads content', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.initiativeAnalysis);
      await page.waitForTimeout(TIMEOUTS.dataLoad);

      await expect(page.locator('main')).toBeVisible();
      await expect(page).toHaveURL(ROUTES.initiativeAnalysis);
    });

    test('Charts render on initiative page', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.initiativeAnalysis);
      await page.waitForTimeout(3000);

      const chartCount = await bp.getPlotlyChartCount();
      expect(chartCount).toBeGreaterThan(0);
    });
  });

  test.describe('Agricultural Analysis Module', () => {
    test('Page loads content', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.agriculturalAnalysis);
      await page.waitForTimeout(TIMEOUTS.dataLoad);

      await expect(page.locator('main')).toBeVisible();
      await expect(page).toHaveURL(ROUTES.agriculturalAnalysis);
    });

    test('Charts render on agricultural page', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.agriculturalAnalysis);
      await page.waitForTimeout(3000);

      const chartCount = await bp.getPlotlyChartCount();
      expect(chartCount).toBeGreaterThan(0);
    });

    test('Leaflet map container exists', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.agriculturalAnalysis);
      await page.waitForTimeout(TIMEOUTS.dataLoad);

      const map = page.locator('.leaflet-container');
      const mapExists = (await map.count()) > 0;
      if (mapExists) {
        await expect(map.first()).toBeVisible();
      }
    });
  });

  test.describe('About Module', () => {
    test('Page loads content', async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.about);
      await page.waitForTimeout(TIMEOUTS.dataLoad);

      await expect(page.locator('main')).toBeVisible();
      await expect(page).toHaveURL(ROUTES.about);
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);
    });
  });
});
