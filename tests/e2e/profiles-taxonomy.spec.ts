import { expect, test } from '@playwright/test';
import { routeCoreApi } from './fixtures';

test('profiles and taxonomy screens render seeded data', async ({ page }) => {
  await routeCoreApi(page);
  await page.goto('/admin/evidence-risk-review/profiles');

  await expect(page.getByTestId('evr-profiles')).toHaveAttribute('data-state', 'ready');
  await page.getByTestId('evr-profiles-row-clinical').click();
  await expect(page.getByTestId('evr-profile-detail-clinical')).toContainText('tier_floor');

  await page.goto('/admin/evidence-risk-review/taxonomy');
  await expect(page.getByTestId('evr-taxonomy')).toHaveAttribute('data-state', 'ready');
  await expect(page.getByTestId('evr-taxonomy-row-official')).toContainText('Official guidance');
});
