import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { SettingsPage } from '../../../resources/js/pages/SettingsPage';
import { renderWithClient } from '../support/render';
import { server } from '../support/server';

describe('SettingsPage', () => {
  it('toggles and persists theme', async () => {
    const user = userEvent.setup();

    document.documentElement.setAttribute('data-theme', 'dark');
    renderWithClient(<SettingsPage />);

    await user.click(screen.getByTestId('evr-settings-theme'));

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem('evr-theme')).toBe('light');
  });

  it('probes taxonomy connectivity', async () => {
    const user = userEvent.setup();

    renderWithClient(<SettingsPage />);

    await user.click(screen.getByRole('button', { name: /test connection/i }));

    await waitFor(() => expect(screen.getByTestId('evr-settings-probe')).toHaveAttribute('data-state', 'ready'));
    expect(screen.getByTestId('evr-settings-probe')).toHaveTextContent('tiers reachable');
  });

  it('shows probe errors', async () => {
    const user = userEvent.setup();

    server.use(http.get('*/taxonomy', () => HttpResponse.json({ error: { message: 'Core unavailable' } }, { status: 500 })));
    renderWithClient(<SettingsPage />);

    await user.click(screen.getByRole('button', { name: /test connection/i }));

    await waitFor(() => expect(screen.getByTestId('evr-settings-probe')).toHaveAttribute('data-state', 'error'));
    expect(screen.getByTestId('evr-settings-probe')).toHaveTextContent('Core unavailable');
  });
});
