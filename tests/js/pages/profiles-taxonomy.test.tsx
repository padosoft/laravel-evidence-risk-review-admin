import { screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProfileDetailPage, ProfilesPage } from '../../../resources/js/pages/ProfilesPage';
import { TaxonomyPage } from '../../../resources/js/pages/TaxonomyPage';
import { renderWithClient } from '../support/render';

describe('Profiles and taxonomy pages', () => {
  it('renders profile list and read-only note', async () => {
    renderWithClient(
      <MemoryRouter>
        <ProfilesPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-profiles')).toHaveAttribute('data-state', 'ready'));

    expect(screen.getByTestId('evr-profiles-readonly-note')).toBeInTheDocument();
    expect(screen.getByTestId('evr-profiles-row-clinical')).toBeInTheDocument();
  });

  it('renders profile detail', async () => {
    renderWithClient(
      <MemoryRouter initialEntries={['/profiles/clinical']}>
        <Routes>
          <Route path="/profiles/:key" element={<ProfileDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-profile-detail')).toHaveAttribute('data-state', 'ready'));

    expect(screen.getByTestId('evr-profile-detail-clinical')).toHaveTextContent('tier_floor');
  });

  it('renders taxonomy rows ordered by rank descending', async () => {
    renderWithClient(
      <MemoryRouter>
        <TaxonomyPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-taxonomy')).toHaveAttribute('data-state', 'ready'));

    const rows = within(screen.getByTestId('evr-taxonomy-table')).getAllByRole('row').slice(1);

    expect(rows[0]).toHaveTextContent('Official guidance');
    expect(rows[1]).toHaveTextContent('Unverified');
  });
});
