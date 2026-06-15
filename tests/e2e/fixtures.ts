import { Page } from '@playwright/test';

const taxonomy = [
  { key: 'official', rank: 5, label: 'Official guidance', builtin: true },
  { key: 'unverified', rank: 1, label: 'Unverified', builtin: true },
];

const profiles = [
  {
    key: 'clinical',
    label: 'Clinical',
    description: 'Clinical evidence review profile',
    enabled_checks: ['tier_floor', 'overclaim'],
    min_tier: { definitive: 5, likely: 3, tentative: 1 },
  },
  {
    key: 'empty',
    label: 'Empty',
    description: 'Profile used to exercise empty states',
    enabled_checks: ['tier_floor'],
    min_tier: { definitive: 5, likely: 3, tentative: 1 },
  },
];

const reviewLog = {
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

const reviewResult = {
  review_id: 'rev_1',
  artifact_id: 'artifact_1',
  profile_key: 'clinical',
  risk_score: 42,
  claim_verdicts: { claim_1: 'soften' },
  source_tiers: { src_1: taxonomy[0] },
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

export async function routeCoreApi(page: Page) {
  await page.route('**/evidence-risk-review/api/reviews**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());

    if (request.method() === 'POST') {
      const body = request.postDataJSON() as { answer_text?: string };

      if (!body.answer_text) {
        await route.fulfill({
          status: 422,
          json: { message: 'The answer text field is required.', errors: { answer_text: ['The answer text field is required.'] } },
        });
        return;
      }

      await route.fulfill({ status: 201, json: reviewResult });
      return;
    }

    if (url.pathname.endsWith('/reviews/rev_1')) {
      await route.fulfill({ json: reviewResult });
      return;
    }

    if (url.searchParams.get('profile') === 'empty') {
      await route.fulfill({ json: { ...reviewLog, data: [], total: 0 } });
      return;
    }

    await route.fulfill({ json: reviewLog });
  });

  await page.route('**/evidence-risk-review/api/profiles**', async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname.endsWith('/profiles/clinical')) {
      await route.fulfill({ json: profiles[0] });
      return;
    }

    await route.fulfill({ json: profiles });
  });

  await page.route('**/evidence-risk-review/api/taxonomy', async (route) => {
    await route.fulfill({ json: taxonomy });
  });
}

export async function routeDashboardFailure(page: Page) {
  await routeCoreApi(page);
  await page.route('**/evidence-risk-review/api/reviews**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ status: 500, json: { error: { message: 'Core failed' } } });
      return;
    }

    await route.fallback();
  });
}
