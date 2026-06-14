import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { profilesFixture, reviewLogFixture, reviewResultFixture, taxonomyFixture } from './fixtures';

export const server = setupServer(
  http.get('*/reviews', ({ request }) => {
    const url = new URL(request.url);

    if (url.searchParams.get('profile') === 'empty') {
      return HttpResponse.json({ ...reviewLogFixture, data: [], total: 0 });
    }

    return HttpResponse.json(reviewLogFixture);
  }),

  http.get('*/reviews/:reviewId', ({ params }) => {
    if (params.reviewId === 'missing') {
      return HttpResponse.json({ error: { code: 'not_found', message: 'Review not found' } }, { status: 404 });
    }

    return HttpResponse.json(reviewResultFixture);
  }),

  http.post('*/reviews', async ({ request }) => {
    const body = (await request.json()) as { answer_text?: string };

    if (!body.answer_text) {
      return HttpResponse.json(
        {
          message: 'The answer text field is required.',
          errors: { answer_text: ['The answer text field is required.'] },
        },
        { status: 422 },
      );
    }

    return HttpResponse.json(reviewResultFixture, { status: 201 });
  }),

  http.get('*/profiles', () => HttpResponse.json(profilesFixture)),
  http.get('*/profiles/:key', () => HttpResponse.json(profilesFixture[0])),
  http.get('*/taxonomy', () => HttpResponse.json(taxonomyFixture)),
);
