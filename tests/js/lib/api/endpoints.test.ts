import { describe, expect, it } from 'vitest';
import { createApiClient } from '../../../../resources/js/lib/api/client';
import { evidenceRiskReviewEndpoints } from '../../../../resources/js/lib/api/endpoints';
import { ValidationError } from '../../../../resources/js/lib/api/errors';

const api = evidenceRiskReviewEndpoints(createApiClient({ api_base: 'http://127.0.0.1/evidence-risk-review/api' }));

describe('Evidence Risk Review endpoints', () => {
  it('lists reviews with filters', async () => {
    const reviews = await api.listReviews({ profile: 'clinical', page: 1 });

    expect(reviews.total).toBe(1);
    expect(reviews.data[0]?.review_id).toBe('rev_1');
  });

  it('fetches profiles and taxonomy', async () => {
    await expect(api.listProfiles()).resolves.toHaveLength(1);
    await expect(api.getProfile('clinical')).resolves.toMatchObject({ key: 'clinical' });
    await expect(api.taxonomy()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ key: 'official', rank: 5 })]),
    );
  });

  it('submits a review and surfaces validation failures', async () => {
    await expect(
      api.submitReview({
        answer_text: 'A cautious answer.',
        claims: [],
        sources: [],
        profile: 'clinical',
      }),
    ).resolves.toMatchObject({ review_id: 'rev_1' });

    await expect(api.submitReview({ answer_text: '', claims: [], sources: [] })).rejects.toBeInstanceOf(ValidationError);
  });
});
