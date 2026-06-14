import { CostClass, EvidenceTier, RiskVerdict } from '../lib/api/types';

const verdictLabels: Record<RiskVerdict, string> = {
  keep: 'Keep',
  soften: 'Soften',
  flag_for_human_review: 'Human review',
  remove: 'Remove',
};

export function VerdictBadge({ verdict }: { verdict: RiskVerdict }) {
  return (
    <span className={`evr-badge evr-badge--${verdict}`} data-testid={`evr-verdict-${verdict}`}>
      {verdictLabels[verdict]}
    </span>
  );
}

export function CostBadge({ cost }: { cost: CostClass }) {
  return <span className="evr-badge evr-badge--muted">{cost.replaceAll('_', ' ')}</span>;
}

export function TierBadge({ tier }: { tier: EvidenceTier }) {
  return (
    <span className="evr-tier-badge">
      <span>{tier.label}</span>
      <strong>{tier.rank}</strong>
    </span>
  );
}
