import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useProfiles, useReviews, useSubmitReview, useTaxonomy } from '../../../resources/js/lib/queries';
import { renderHookWithClient } from '../support/render';

describe('query hooks', () => {
  it('loads review log data', async () => {
    const { result } = renderHookWithClient(() => useReviews({ profile: 'clinical' }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.data[0]?.review_id).toBe('rev_1');
  });

  it('loads profiles and taxonomy', async () => {
    const profiles = renderHookWithClient(() => useProfiles());
    const taxonomy = renderHookWithClient(() => useTaxonomy());

    await waitFor(() => expect(profiles.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(taxonomy.result.current.isSuccess).toBe(true));

    expect(profiles.result.current.data?.[0]?.key).toBe('clinical');
    expect(taxonomy.result.current.data?.[0]?.key).toBe('official');
  });

  it('submits reviews through mutation hook', async () => {
    const { result } = renderHookWithClient(() => useSubmitReview());

    result.current.mutate({
      input: {
        answer_text: 'A cautious answer.',
        claims: [],
        sources: [],
        profile: 'clinical',
      },
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.review_id).toBe('rev_1');
  });
});
