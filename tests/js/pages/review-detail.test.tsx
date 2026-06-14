import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ReviewDetailPage } from '../../../resources/js/pages/ReviewDetailPage';
import { renderWithClient } from '../support/render';

function renderDetail(path: string) {
  return renderWithClient(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/reviews/:reviewId" element={<ReviewDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ReviewDetailPage', () => {
  it('renders review findings and source tiers', async () => {
    renderDetail('/reviews/rev_1');

    await waitFor(() => expect(screen.getByTestId('evr-review-detail')).toHaveAttribute('data-state', 'ready'));

    expect(screen.getByTestId('evr-review-detail-header-rev_1')).toBeInTheDocument();
    expect(screen.getByTestId('evr-review-detail-finding-0')).toHaveTextContent('overclaim');
    expect(screen.getByTestId('evr-review-detail-source-src_1')).toBeInTheDocument();
  });

  it('renders a notfound panel for missing reviews', async () => {
    renderDetail('/reviews/missing');

    await waitFor(() => expect(screen.getByTestId('evr-review-detail-notfound')).toBeInTheDocument());
  });
});
