import { expect, test } from '@playwright/test';
import { routeCoreApi } from './fixtures';

test('try screen validates and submits artifacts', async ({ page }) => {
  await routeCoreApi(page);
  await page.goto('/admin/evidence-risk-review/try');

  await page.getByTestId('evr-try-submit').click();
  await expect(page.getByTestId('evr-try-answer-error')).toContainText('required');

  await page.getByTestId('evr-try-answer').fill('A cautious answer.');
  await page.getByTestId('evr-try-dry-run').uncheck();
  await page.getByTestId('evr-try-submit').click();
  await expect(page.getByTestId('evr-try-result')).toBeVisible();
  await expect(page.getByTestId('evr-try-view-log')).toBeVisible();
});
