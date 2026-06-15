import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { EvidenceRiskReviewAdminApp } from '../../resources/js/App';
import { runtimeConfig } from '../../resources/js/config';
import { ApiEndpointsProvider } from '../../resources/js/lib/queries';
import { SettingsPage } from '../../resources/js/pages/SettingsPage';
import { reviewLogFixture, taxonomyFixture } from './support/fixtures';
import { createTestQueryClient } from './support/render';
import { server } from './support/server';

describe('EvidenceRiskReviewAdminApp', () => {
  it('renders the dashboard route with runtime config', async () => {
    render(
      <EvidenceRiskReviewAdminApp
        embedded
        config={{ api_base: '/custom/api', mount_prefix: 'admin/custom', theme_default: 'light' }}
      />,
    );

    expect(screen.getByTestId('evr-app')).toHaveAttribute('data-state', 'ready');
    expect(screen.getByTestId('evr-app')).toHaveAttribute('data-api-base', '/custom/api');

    await waitFor(() => expect(screen.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'ready'));
  });

  it('uses embedded runtime config for API requests', async () => {
    const paths: string[] = [];
    server.use(
      http.get('*/reviews', ({ request }) => {
        paths.push(new URL(request.url).pathname);

        return HttpResponse.json(reviewLogFixture);
      }),
    );

    render(<EvidenceRiskReviewAdminApp embedded config={{ api_base: '/custom/api', mount_prefix: '/' }} />);

    await waitFor(() => expect(screen.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'ready'));

    expect(paths).toContain('/custom/api/reviews');
  });

  it('uses embedded runtime config for settings probe requests', async () => {
    const paths: string[] = [];
    const user = userEvent.setup();
    const config = runtimeConfig({ api_base: '/custom/api', mount_prefix: '/' });

    server.use(
      http.get('*/taxonomy', ({ request }) => {
        paths.push(new URL(request.url).pathname);

        return HttpResponse.json(taxonomyFixture);
      }),
    );

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ApiEndpointsProvider config={config}>
          <SettingsPage />
        </ApiEndpointsProvider>
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Test connection' }));
    await waitFor(() => expect(screen.getByTestId('evr-settings-probe')).toHaveAttribute('data-state', 'ready'));

    expect(paths).toContain('/custom/api/taxonomy');
    expect(paths).not.toContain('/evidence-risk-review/api/taxonomy');
  });
});
