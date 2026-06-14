import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EvidenceRiskReviewAdminApp } from '../../resources/js/App';
import { renderWithClient } from './support/render';

describe('EvidenceRiskReviewAdminApp', () => {
  it('renders the SPA foundation with runtime config', () => {
    renderWithClient(
      <EvidenceRiskReviewAdminApp
        embedded
        config={{ api_base: '/custom/api', mount_prefix: 'admin/custom', theme_default: 'light' }}
      />,
    );

    expect(screen.getByTestId('evr-app')).toHaveAttribute('data-state', 'ready');
    expect(screen.getByText('/custom/api')).toBeInTheDocument();
    expect(screen.getByText('admin/custom')).toBeInTheDocument();
  });
});
