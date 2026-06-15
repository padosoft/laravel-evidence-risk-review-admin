import { expect, test } from '@playwright/test';
import { routeCoreApi } from './fixtures';

test('review filters and detail drill-in work', async ({ page }) => {
  await routeCoreApi(page);
  await page.goto('/admin/evidence-risk-review/reviews');

  await expect(page.getByTestId('evr-reviews')).toHaveAttribute('data-state', 'ready');
  await expect(page.getByTestId('evr-reviews-row-rev_1')).toBeVisible();

  await page.getByTestId('evr-reviews-filter-profile').selectOption('empty');
  await expect(page.getByTestId('evr-reviews')).toHaveAttribute('data-state', 'empty');

  await page.getByTestId('evr-reviews-filter-reset').click();
  await expect(page.getByTestId('evr-reviews')).toHaveAttribute('data-state', 'ready');
  await page.getByTestId('evr-reviews-row-rev_1').click();
  await expect(page.getByTestId('evr-review-detail-header-rev_1')).toBeVisible();
  await expect(page.getByTestId('evr-review-detail-finding-0')).toContainText('overclaim');
});
