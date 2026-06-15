import axios, { AxiosInstance } from 'axios';
import { EvidenceRiskReviewAdminRuntimeConfig, normalizeApiBase, runtimeConfig } from '../../config';
import { normalizeApiError } from './errors';

export function resolveApiBase(config?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): string {
  const envBase = import.meta.env.VITE_API_BASE as string | undefined;

  return normalizeApiBase(envBase || runtimeConfig(config).api_base);
}

export function createApiClient(config?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): AxiosInstance {
  const client = axios.create({
    baseURL: resolveApiBase(config),
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  );

  return client;
}

export const apiClient = createApiClient();
