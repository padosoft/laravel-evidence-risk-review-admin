import { expect, test } from '@playwright/test';
import { routeCoreApi } from './fixtures';

test('shell mounts and navigates', async ({ page }) => {
  await routeCoreApi(page);
  await page.goto('/admin/evidence-risk-review');

  await expect(page.getByTestId('evr-shell')).toBeVisible();
  await expect(page.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'ready');

  await page.getByTestId('evr-nav-settings').click();
  await expect(page.getByTestId('evr-settings')).toHaveAttribute('data-state', 'ready');
});
