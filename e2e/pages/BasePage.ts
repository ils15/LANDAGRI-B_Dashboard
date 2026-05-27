import { Page, expect } from '@playwright/test';
import { TIMEOUTS } from '../fixtures/testData';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(route: string) {
    await this.page.goto(route, { waitUntil: 'networkidle', timeout: TIMEOUTS.pageLoad });
    await this.waitForPageReady();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.pageLoad });
    await this.page.waitForTimeout(TIMEOUTS.animation);
  }

  async waitForNavigationComplete() {
    await this.page.waitForTimeout(TIMEOUTS.transition);
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.pageLoad });
  }

  async getPageTitle() {
    return this.page.title();
  }

  async isElementVisible(testId: string) {
    return this.page.getByTestId(testId).first().isVisible();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async getMetricValue(metricTestId: string) {
    const metric = this.page.getByTestId(metricTestId);
    return metric.textContent();
  }

  async getConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    return errors;
  }

  getPlotlyCharts() {
    return this.page.locator('.js-plotly-plot');
  }

  async getPlotlyChartCount() {
    return (await this.getPlotlyCharts()).count();
  }

  async getPlotlyData(chartIndex: number = 0): Promise<any> {
    return this.page.evaluate((idx: number) => {
      const plots = document.querySelectorAll('.js-plotly-plot');
      if (plots[idx]) {
        const plot = plots[idx] as any;
        return plot._fullData ? { traces: plot._fullData.length, labels: plot._fullData[0]?.name } : null;
      }
      return null;
    }, chartIndex);
  }

  async getSidebar() {
    return this.page.locator('aside');
  }

  async isMobileView() {
    const viewport = this.page.viewportSize();
    return viewport ? viewport.width < 768 : false;
  }
}
