import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { EvidenceRiskReviewAdminApp } from '../../resources/js/App';
import { reviewLogFixture } from './support/fixtures';
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
});
