import { TierBadge } from '../components/badges';
import { ScreenState, stateFromQuery } from '../components/state';
import { useTaxonomy } from '../lib/queries';

export function TaxonomyPage() {
  const taxonomy = useTaxonomy();
  const rows = [...(taxonomy.data ?? [])].sort((a, b) => b.rank - a.rank);
  const state = stateFromQuery({
    isLoading: taxonomy.isLoading,
    isError: taxonomy.isError,
    isEmpty: taxonomy.isSuccess && rows.length === 0,
  });

  return (
    <ScreenState testId="evr-taxonomy" state={state} error={taxonomy.error} empty="No evidence tiers are exposed by the core API.">
      <section className="evr-page">
        <div className="evr-page__header">
          <div>
            <h1>Evidence-tier taxonomy</h1>
            <p>Ordered by evidence strength from the configured core taxonomy.</p>
          </div>
        </div>
        <table className="evr-table" data-testid="evr-taxonomy-table">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Rank</th>
              <th>Origin</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tier) => (
              <tr key={tier.key} data-testid={`evr-taxonomy-row-${tier.key}`}>
                <td>
                  <TierBadge tier={tier} />
                </td>
                <td>{tier.rank}</td>
                <td>{tier.builtin ? 'Built in' : 'Custom'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </ScreenState>
  );
}
