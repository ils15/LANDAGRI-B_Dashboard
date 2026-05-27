import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ROUTES, NAV_MENU_ITEMS, TIMEOUTS } from '../fixtures/testData';

test.describe('P0 - Smoke Tests (Critical Path)', () => {
  test('App loads with no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        errors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => errors.push(err.message));

    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);

    expect(errors).toHaveLength(0);
  });

  test('Overview page loads and shows content', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);

    await expect(page.locator('main')).toBeVisible({ timeout: TIMEOUTS.pageLoad });
    await expect(page).toHaveURL(ROUTES.overview);
  });

  for (const item of NAV_MENU_ITEMS) {
    test(`Navigation to ${item.route} works`, async ({ page }) => {
      const bp = new BasePage(page);
      await bp.navigate(ROUTES.overview);

      const navLink = page.getByTestId(`nav-link-${item.route.replace(/[^a-zA-Z0-9]/g, '-')}`);
      if (await navLink.isVisible()) {
        await navLink.click();
      } else {
        await page.getByText(item.label).first().click();
      }

      await bp.waitForNavigationComplete();
      await expect(page).toHaveURL(item.route);
    });
  }

  test('Sidebar navigation is visible', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);

    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible({ timeout: TIMEOUTS.pageLoad });
  });

  test('No broken routes', async ({ page }) => {
    const bp = new BasePage(page);
    const routes = Object.values(ROUTES);

    for (const route of routes) {
      await page.goto(route, { waitUntil: 'networkidle', timeout: TIMEOUTS.pageLoad });
      await expect(page).toHaveURL(route);
      await expect(page.locator('main')).toBeVisible({ timeout: TIMEOUTS.pageLoad });
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.includes('404')).toBeFalsy();
    }
  });

  test('Plotly charts render on overview page', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);
    await page.waitForTimeout(3000);

    const chartCount = await bp.getPlotlyChartCount();
    expect(chartCount).toBeGreaterThan(0);
  });

  test('Page has a title', async ({ page }) => {
    const bp = new BasePage(page);
    await bp.navigate(ROUTES.overview);

    const title = await bp.getPageTitle();
    expect(title.length).toBeGreaterThan(0);
  });
});
