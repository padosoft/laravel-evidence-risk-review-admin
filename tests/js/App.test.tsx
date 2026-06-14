import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EvidenceRiskReviewAdminApp } from '../../resources/js/App';

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
});
