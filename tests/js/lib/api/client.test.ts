import { describe, expect, it } from 'vitest';
import { createApiClient, resolveApiBase } from '../../../../resources/js/lib/api/client';
import { FeatureDisabledError, NetworkError, normalizeApiError, ValidationError } from '../../../../resources/js/lib/api/errors';

describe('API client', () => {
  it('resolves the runtime API base without trailing slash', () => {
    expect(resolveApiBase({ api_base: '/custom/api/' })).toBe('/custom/api');
  });

  it('creates an axios client with credentials enabled', () => {
    const client = createApiClient({ api_base: '/custom/api' });

    expect(client.defaults.baseURL).toBe('/custom/api');
    expect(client.defaults.withCredentials).toBe(true);
  });
});

describe('API errors', () => {
  it('normalizes network errors', () => {
    const normalized = normalizeApiError({
      isAxiosError: true,
      message: 'socket closed',
    });

    expect(normalized).toBeInstanceOf(NetworkError);
  });

  it('normalizes validation and disabled errors from axios responses', () => {
    const validation = normalizeApiError({
      isAxiosError: true,
      message: 'Request failed',
      response: {
        status: 422,
        data: {
          message: 'Invalid',
          errors: { answer_text: ['Required'] },
        },
      },
    });

    const disabled = normalizeApiError({
      isAxiosError: true,
      message: 'Request failed',
      response: {
        status: 404,
        data: { error: { code: 'not_found', message: 'Not found' } },
      },
    });

    expect(validation).toBeInstanceOf(ValidationError);
    expect((validation as ValidationError).fieldErrors.answer_text).toEqual(['Required']);
    expect(disabled).toBeInstanceOf(FeatureDisabledError);
  });
});
