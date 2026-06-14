import axios, { AxiosInstance } from 'axios';
import { EvidenceRiskReviewAdminRuntimeConfig, runtimeConfig } from '../../config';
import { normalizeApiError } from './errors';

export function resolveApiBase(config?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): string {
  const envBase = import.meta.env.VITE_API_BASE as string | undefined;
  const resolved = envBase || runtimeConfig(config).api_base;

  return resolved.replace(/\/+$/g, '');
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
