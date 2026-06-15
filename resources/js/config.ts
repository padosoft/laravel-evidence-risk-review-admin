export interface EvidenceRiskReviewAdminRuntimeConfig {
  api_base: string;
  mount_prefix: string;
  theme_default: 'dark' | 'light' | string;
  asset_path: string;
}

export interface EvidenceRiskReviewAdminAppProps {
  config?: Partial<EvidenceRiskReviewAdminRuntimeConfig>;
  embedded?: boolean;
}

declare global {
  interface Window {
    __EVIDENCE_RISK_REVIEW_ADMIN__?: Partial<EvidenceRiskReviewAdminRuntimeConfig>;
  }
}

export const DEFAULT_RUNTIME_CONFIG: EvidenceRiskReviewAdminRuntimeConfig = {
  api_base: '/evidence-risk-review/api',
  mount_prefix: 'admin/evidence-risk-review',
  theme_default: 'dark',
  asset_path: 'vendor/evidence-risk-review-admin',
};

export function runtimeConfig(overrides?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): EvidenceRiskReviewAdminRuntimeConfig {
  const merged = {
    ...DEFAULT_RUNTIME_CONFIG,
    ...(typeof window !== 'undefined' ? window.__EVIDENCE_RISK_REVIEW_ADMIN__ : undefined),
    ...overrides,
  };

  return {
    api_base: normalizeApiBase(merged.api_base),
    mount_prefix: normalizeMountPrefix(merged.mount_prefix),
    theme_default: normalizeTheme(merged.theme_default),
    asset_path: normalizePath(merged.asset_path, DEFAULT_RUNTIME_CONFIG.asset_path),
  };
}

export function routeBase(config: EvidenceRiskReviewAdminRuntimeConfig): string {
  const base = normalizeMountPrefix(config.mount_prefix);

  return base === '' ? '/' : `/${base}`;
}

export function normalizeApiBase(value?: string): string {
  const base = (value ?? DEFAULT_RUNTIME_CONFIG.api_base).trim().replace(/\/+$/g, '');

  return base === '' ? DEFAULT_RUNTIME_CONFIG.api_base : base;
}

function normalizePath(value: string | undefined, fallback: string): string {
  const path = (value ?? fallback).trim().replace(/^\/+|\/+$/g, '');

  return path === '' ? fallback : path;
}

function normalizeMountPrefix(value: string | undefined): string {
  return (value ?? DEFAULT_RUNTIME_CONFIG.mount_prefix).trim().replace(/^\/+|\/+$/g, '');
}

function normalizeTheme(value: string | undefined): 'dark' | 'light' {
  return value === 'light' ? 'light' : 'dark';
}
