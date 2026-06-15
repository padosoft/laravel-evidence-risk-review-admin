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
export declare const DEFAULT_RUNTIME_CONFIG: EvidenceRiskReviewAdminRuntimeConfig;
export declare function runtimeConfig(overrides?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): EvidenceRiskReviewAdminRuntimeConfig;
export declare function routeBase(config: EvidenceRiskReviewAdminRuntimeConfig): string;
export declare function normalizeApiBase(value?: string): string;
