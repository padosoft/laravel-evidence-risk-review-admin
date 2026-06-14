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
  return {
    ...DEFAULT_RUNTIME_CONFIG,
    ...(typeof window !== 'undefined' ? window.__EVIDENCE_RISK_REVIEW_ADMIN__ : undefined),
    ...overrides,
  };
}

export function routeBase(config: EvidenceRiskReviewAdminRuntimeConfig): string {
  const base = config.mount_prefix.replace(/^\/+|\/+$/g, '');

  return base === '' ? '/' : `/${base}`;
}
