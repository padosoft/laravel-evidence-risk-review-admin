import { Link } from 'react-router-dom';
import { TierBadge, VerdictBadge } from '../components/badges';
import { ScreenState, stateFromQuery } from '../components/state';
import { useProfiles, useReviews, useTaxonomy } from '../lib/queries';

const verdictOrder = ['keep', 'soften', 'flag_for_human_review', 'remove'] as const;

export function DashboardPage() {
  const reviews = useReviews({ page: 1 });
  const profiles = useProfiles();
  const taxonomy = useTaxonomy();
  const rows = reviews.data?.data ?? [];
  const isEmpty = reviews.isSuccess && rows.length === 0;
  const state = stateFromQuery({
    isLoading: reviews.isLoading || profiles.isLoading || taxonomy.isLoading,
    isError: reviews.isError || profiles.isError || taxonomy.isError,
    isEmpty,
  });

  const counts = Object.fromEntries(verdictOrder.map((verdict) => [verdict, 0])) as Record<(typeof verdictOrder)[number], number>;
  rows.forEach((row) => {
    counts[row.max_verdict] += 1;
  });
  const meanRisk = rows.length === 0 ? 0 : Math.round(rows.reduce((sum, row) => sum + row.risk_score, 0) / rows.length);

  return (
    <ScreenState
      testId="evr-dashboard"
      state={state}
      error={reviews.error ?? profiles.error ?? taxonomy.error}
      empty="No reviews have been recorded yet."
    >
      <section className="evr-page">
        <div className="evr-page__header">
          <div>
            <h1>Dashboard</h1>
            <p>Recent review activity from the configured core API.</p>
          </div>
          <Link className="evr-button" to="/reviews" data-testid="evr-dashboard-open-reviews">
            Open log
          </Link>
        </div>

        <div className="evr-kpi-grid">
          <Metric testId="evr-dashboard-kpi-reviews" label="Last page reviews" value={rows.length} />
          <Metric testId="evr-dashboard-kpi-softened" label="Softened" value={counts.soften} />
          <Metric testId="evr-dashboard-kpi-flagged" label="Flagged" value={counts.flag_for_human_review} />
          <Metric testId="evr-dashboard-kpi-risk" label="Mean risk" value={meanRisk} />
        </div>

        <div className="evr-panel-grid">
          <section className="evr-panel" data-testid="evr-dashboard-verdict-dist">
            <h2>Verdict distribution</h2>
            <div className="evr-stack">
              {verdictOrder.map((verdict) => (
                <div key={verdict}>
                  <VerdictBadge verdict={verdict} />
                  <strong>{counts[verdict]}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="evr-panel" data-testid="evr-dashboard-tier-dist">
            <h2>Evidence tiers</h2>
            <div className="evr-tier-list">
              {[...(taxonomy.data ?? [])].sort((a, b) => b.rank - a.rank).map((tier) => (
                <TierBadge key={tier.key} tier={tier} />
              ))}
            </div>
          </section>
        </div>

        <section className="evr-panel" data-testid="evr-dashboard-profiles">
          <h2>Profiles</h2>
          <div className="evr-profile-row">
            {(profiles.data ?? []).map((profile) => (
              <Link key={profile.key} to={`/profiles/${profile.key}`} data-testid={`evr-dashboard-profile-${profile.key}`}>
                {profile.label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </ScreenState>
  );
}

function Metric({ testId, label, value }: { testId: string; label: string; value: number }) {
  return (
    <section className="evr-kpi" data-testid={testId}>
      <span>{label}</span>
      <strong>{value}</strong>
    </section>
  );
}
