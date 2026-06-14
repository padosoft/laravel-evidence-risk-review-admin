import { EvidenceTier, Paginated, ProfileMetadata, ReviewLogRow, ReviewResult } from '../../../resources/js/lib/api/types';

export const taxonomyFixture: EvidenceTier[] = [
  { key: 'official', rank: 5, label: 'Official guidance', builtin: true },
  { key: 'unverified', rank: 1, label: 'Unverified', builtin: true },
];

export const profilesFixture: ProfileMetadata[] = [
  {
    key: 'clinical',
    label: 'Clinical',
    description: 'Clinical evidence review profile',
    enabled_checks: ['tier_floor', 'overclaim'],
    min_tier: { definitive: 5, likely: 3, tentative: 1 },
    verdict_policy: { never_auto_remove: true },
  },
];

export const reviewLogFixture: Paginated<ReviewLogRow> = {
  data: [
    {
      review_id: 'rev_1',
      artifact_id: 'artifact_1',
      profile_key: 'clinical',
      max_verdict: 'soften',
      risk_score: 42,
      tenant_id: 'tenant_a',
      created_at: '2026-06-15T00:00:00Z',
    },
  ],
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 1,
};

export const reviewResultFixture: ReviewResult = {
  review_id: 'rev_1',
  artifact_id: 'artifact_1',
  profile_key: 'clinical',
  risk_score: 42,
  claim_verdicts: { claim_1: 'soften' },
  source_tiers: { src_1: taxonomyFixture[0] },
  findings: [
    {
      check_kind: 'overclaim',
      claim_id: 'claim_1',
      verdict: 'soften',
      reason: 'Claim is stronger than the evidence supports.',
      suggested_rewrite: 'Evidence may support a narrower claim.',
      confidence: 0.8,
      cost_class: 'cheap',
      evidence: ['src_1'],
    },
  ],
  budget: { llm_calls: 0, tokens: 0, heavy_checks: 0, wall_seconds: 0.02 },
  reviewed_at: '2026-06-15T00:00:00Z',
  meta: {},
};
