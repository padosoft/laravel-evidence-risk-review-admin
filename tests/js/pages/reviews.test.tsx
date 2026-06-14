import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ReviewsPage } from '../../../resources/js/pages/ReviewsPage';
import { renderWithClient } from '../support/render';

describe('ReviewsPage', () => {
  it('renders rows and supports profile filtering', async () => {
    const user = userEvent.setup();

    renderWithClient(
      <MemoryRouter>
        <ReviewsPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('evr-reviews')).toHaveAttribute('data-state', 'ready'));
    expect(screen.getByTestId('evr-reviews-row-rev_1')).toBeInTheDocument();

    await user.selectOptions(screen.getByTestId('evr-reviews-filter-profile'), 'empty');

    await waitFor(() => expect(screen.getByTestId('evr-reviews')).toHaveAttribute('data-state', 'empty'));
    expect(screen.getByTestId('evr-reviews-empty')).toBeInTheDocument();
  });
});
