import { useState } from 'react';
import { runtimeConfig } from '../config';
import { useEvidenceRiskReviewEndpoints } from '../lib/queries';

type ProbeState = 'idle' | 'loading' | 'ready' | 'error';

export function SettingsPage() {
  const config = runtimeConfig();
  const endpoints = useEvidenceRiskReviewEndpoints();
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || config.theme_default || 'dark');
  const [probeState, setProbeState] = useState<ProbeState>('idle');
  const [probeMessage, setProbeMessage] = useState('');

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);

    if (typeof window.localStorage?.setItem === 'function') {
      window.localStorage.setItem('evr-theme', next);
    }
  }

  async function runProbe() {
    setProbeState('loading');
    setProbeMessage('');

    try {
      const rows = await endpoints.taxonomy();
      setProbeState('ready');
      setProbeMessage(`${rows.length} tiers reachable`);
    } catch (error) {
      setProbeState('error');
      setProbeMessage(error instanceof Error ? error.message : 'Connection failed');
    }
  }

  return (
    <section className="evr-page" data-testid="evr-settings" data-state="ready" aria-busy="false">
      <div className="evr-page__header">
        <div>
          <h1>Settings</h1>
          <p>Client-side configuration resolved from the Laravel Blade shell.</p>
        </div>
        <button className="evr-button" type="button" data-testid="evr-settings-theme" onClick={toggleTheme}>
          {theme === 'dark' ? 'Light' : 'Dark'} theme
        </button>
      </div>

      <section className="evr-panel" data-testid="evr-settings-config">
        <h2>Resolved config</h2>
        <dl className="evr-definition-grid">
          <dt>API base</dt>
          <dd>{config.api_base}</dd>
          <dt>Mount prefix</dt>
          <dd>{config.mount_prefix}</dd>
          <dt>Asset path</dt>
          <dd>{config.asset_path}</dd>
        </dl>
      </section>

      <section className="evr-panel" data-testid="evr-settings-probe" data-state={probeState} aria-busy={probeState === 'loading'}>
        <div className="evr-page__header">
          <div>
            <h2>Connection probe</h2>
            <p>{probeMessage || 'Calls the taxonomy endpoint on the configured core API.'}</p>
          </div>
          <button className="evr-button evr-button--ghost" type="button" onClick={runProbe}>
            Test connection
          </button>
        </div>
      </section>
    </section>
  );
}
