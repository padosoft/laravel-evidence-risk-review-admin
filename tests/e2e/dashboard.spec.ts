import { expect, test } from '@playwright/test';
import { routeCoreApi, routeDashboardFailure } from './fixtures';

test('dashboard renders seeded metrics', async ({ page }) => {
  await routeCoreApi(page);
  await page.goto('/admin/evidence-risk-review');

  await expect(page.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'ready');
  await expect(page.getByTestId('evr-dashboard-kpi-reviews')).toContainText('1');
});

test('dashboard renders API failure state', async ({ page }) => {
  await routeDashboardFailure(page);
  await page.goto('/admin/evidence-risk-review');

  await expect(page.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'error');
  await expect(page.getByTestId('evr-dashboard-error')).toContainText('Core failed');
});
