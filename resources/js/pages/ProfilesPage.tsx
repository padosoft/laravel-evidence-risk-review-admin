import { Link, useParams } from 'react-router-dom';
import { ScreenState, stateFromQuery } from '../components/state';
import { useProfile, useProfiles } from '../lib/queries';

export function ProfilesPage() {
  const profiles = useProfiles();
  const rows = profiles.data ?? [];
  const state = stateFromQuery({
    isLoading: profiles.isLoading,
    isError: profiles.isError,
    isEmpty: profiles.isSuccess && rows.length === 0,
  });

  return (
    <ScreenState testId="evr-profiles" state={state} error={profiles.error} empty="No profiles are exposed by the core API.">
      <section className="evr-page">
        <div className="evr-page__header">
          <div>
            <h1>Domain profiles</h1>
            <p data-testid="evr-profiles-readonly-note">Profiles are read-only in v1.0 and defined by core package config.</p>
          </div>
        </div>
        <div className="evr-card-list" data-testid="evr-profiles-list">
          {rows.map((profile) => (
            <Link className="evr-card-row" key={profile.key} to={`/profiles/${profile.key}`} data-testid={`evr-profiles-row-${profile.key}`}>
              <strong>{profile.label}</strong>
              <span>{profile.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </ScreenState>
  );
}

export function ProfileDetailPage() {
  const { key = '' } = useParams();
  const profile = useProfile(key);
  const state = stateFromQuery({ isLoading: profile.isLoading, isError: profile.isError });

  return (
    <ScreenState testId="evr-profile-detail" state={state} error={profile.error}>
      {profile.data ? (
        <section className="evr-page" data-testid={`evr-profile-detail-${profile.data.key}`}>
          <div className="evr-page__header">
            <div>
              <h1>{profile.data.label}</h1>
              <p>{profile.data.description}</p>
            </div>
          </div>
          <section className="evr-panel">
            <h2>Enabled checks</h2>
            <div className="evr-chip-row">
              {profile.data.enabled_checks.map((check) => (
                <span key={check} className="evr-chip">
                  {check}
                </span>
              ))}
            </div>
          </section>
          <section className="evr-panel">
            <h2>Minimum tier policy</h2>
            <dl className="evr-definition-grid">
              {Object.entries(profile.data.min_tier).map(([assertiveness, rank]) => (
                <div key={assertiveness}>
                  <dt>{assertiveness}</dt>
                  <dd>{rank}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      ) : null}
    </ScreenState>
  );
}
