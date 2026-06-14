import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from '../../../resources/js/pages/DashboardPage';
import { renderWithClient } from '../support/render';
import { reviewLogFixture } from '../support/fixtures';
import { server } from '../support/server';

describe('DashboardPage', () => {
  it('renders KPIs and distributions from API data', async () => {
    renderWithClient(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'ready'));

    expect(screen.getByTestId('evr-dashboard-kpi-reviews')).toHaveTextContent('1');
    expect(screen.getByTestId('evr-dashboard-verdict-dist')).toBeInTheDocument();
    expect(screen.getByTestId('evr-dashboard-tier-dist')).toBeInTheDocument();
  });

  it('renders an empty state when the review log is empty', async () => {
    server.use(http.get('*/reviews', () => HttpResponse.json({ ...reviewLogFixture, data: [], total: 0 })));

    renderWithClient(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'empty'));
    expect(screen.getByTestId('evr-dashboard-empty')).toBeInTheDocument();
  });

  it('renders an error state when the core API fails', async () => {
    server.use(http.get('*/reviews', () => HttpResponse.json({ error: { message: 'Core failed' } }, { status: 500 })));

    renderWithClient(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-dashboard')).toHaveAttribute('data-state', 'error'));
    expect(screen.getByTestId('evr-dashboard-error')).toHaveTextContent('Core failed');
  });
});
