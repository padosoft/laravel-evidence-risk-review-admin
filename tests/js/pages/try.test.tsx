import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TryPage } from '../../../resources/js/pages/TryPage';
import { renderWithClient } from '../support/render';
import { server } from '../support/server';

describe('TryPage', () => {
  it('surfaces field validation errors after a real submit', async () => {
    const user = userEvent.setup();

    renderWithClient(
      <MemoryRouter>
        <TryPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId('evr-try-submit'));

    await waitFor(() => expect(screen.getByTestId('evr-try-answer-error')).toHaveTextContent('required'));
  });

  it('submits a valid dry-run and hides the log link', async () => {
    const user = userEvent.setup();

    renderWithClient(
      <MemoryRouter>
        <TryPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByTestId('evr-try-answer'), 'A cautious answer.');
    await user.click(screen.getByTestId('evr-try-submit'));

    await waitFor(() => expect(screen.getByTestId('evr-try-result')).toBeInTheDocument());
    expect(screen.queryByTestId('evr-try-view-log')).not.toBeInTheDocument();
  });

  it('shows the persisted log link when dry-run is disabled', async () => {
    const user = userEvent.setup();

    renderWithClient(
      <MemoryRouter>
        <TryPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId('evr-try-dry-run'));
    await user.type(screen.getByTestId('evr-try-answer'), 'A persisted answer.');
    await user.click(screen.getByTestId('evr-try-submit'));

    await waitFor(() => expect(screen.getByTestId('evr-try-view-log')).toBeInTheDocument());
  });

  it('shows the LLM unavailable banner for 503 responses', async () => {
    const user = userEvent.setup();

    server.use(
      http.post('*/reviews', () =>
        HttpResponse.json({ error: { code: 'llm_unavailable', message: 'LLM reviewer is not bound.' } }, { status: 503 }),
      ),
    );

    renderWithClient(
      <MemoryRouter>
        <TryPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByTestId('evr-try-answer'), 'A cautious answer.');
    await user.click(screen.getByTestId('evr-try-submit'));

    await waitFor(() => expect(screen.getByTestId('evr-try-llm-unavailable')).toHaveTextContent('LLM reviewer'));
  });
});
