import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { VerdictBadge } from '../components/badges';
import { ScreenState, stateFromQuery } from '../components/state';
import { RiskVerdict } from '../lib/api/types';
import { useProfiles, useReviews } from '../lib/queries';

export function ReviewsPage() {
  const [profile, setProfile] = useState('');
  const [minVerdict, setMinVerdict] = useState<RiskVerdict | ''>('');
  const [tenant, setTenant] = useState('');
  const reviews = useReviews({ profile, min_verdict: minVerdict, tenant });
  const profiles = useProfiles();
  const rows = reviews.data?.data ?? [];
  const state = stateFromQuery({
    isLoading: reviews.isLoading || profiles.isLoading,
    isError: reviews.isError || profiles.isError,
    isEmpty: reviews.isSuccess && rows.length === 0,
  });

  return (
    <section className="evr-page">
      <div className="evr-page__header">
        <div>
          <h1>Review log</h1>
          <p>Browse the append-only evidence risk review history.</p>
        </div>
      </div>

      <div className="evr-filterbar">
        <label>
          Profile
          <select data-testid="evr-reviews-filter-profile" value={profile} onChange={(event) => setProfile(event.target.value)}>
            <option value="">All profiles</option>
            {(profiles.data ?? []).map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Verdict
          <select
            data-testid="evr-reviews-filter-min-verdict"
            value={minVerdict}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setMinVerdict(event.target.value as RiskVerdict | '')}
          >
            <option value="">Any verdict</option>
            <option value="soften">Soften+</option>
            <option value="flag_for_human_review">Human review+</option>
            <option value="remove">Remove</option>
          </select>
        </label>
        <label>
          Tenant
          <input data-testid="evr-reviews-filter-tenant" value={tenant} onChange={(event) => setTenant(event.target.value)} />
        </label>
        <button
          className="evr-button evr-button--ghost"
          type="button"
          data-testid="evr-reviews-filter-reset"
          onClick={() => {
            setProfile('');
            setMinVerdict('');
            setTenant('');
          }}
        >
          Reset
        </button>
      </div>

      <ScreenState testId="evr-reviews" state={state} error={reviews.error ?? profiles.error} empty="No review rows match these filters.">
        <table className="evr-table" data-testid="evr-reviews-table">
          <thead>
            <tr>
              <th>Review</th>
              <th>Artifact</th>
              <th>Profile</th>
              <th>Verdict</th>
              <th>Risk</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.review_id}>
                <td>
                  <Link to={`/reviews/${row.review_id}`} data-testid={`evr-reviews-row-${row.review_id}`}>
                    {row.review_id}
                  </Link>
                </td>
                <td>{row.artifact_id}</td>
                <td>{row.profile_key}</td>
                <td>
                  <VerdictBadge verdict={row.max_verdict} />
                </td>
                <td>{row.risk_score}</td>
                <td>{row.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScreenState>
    </section>
  );
}
