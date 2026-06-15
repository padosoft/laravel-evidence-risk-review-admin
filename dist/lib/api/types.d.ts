export type RiskVerdict = 'keep' | 'soften' | 'flag_for_human_review' | 'remove';
export type ClaimAssertiveness = 'definitive' | 'likely' | 'tentative';
export type CostClass = 'cheap' | 'heavy' | 'skipped_over_budget';
export interface EvidenceTier {
    key: string;
    rank: number;
    label: string;
    builtin: boolean;
}
export interface ClaimRef {
    id: string;
    text: string;
    assertiveness: ClaimAssertiveness;
    source_ids?: string[];
}
export interface SourceRef {
    id: string;
    title?: string;
    url?: string;
    declared_tier?: string;
    population?: string;
}
export interface ReviewArtifactInput {
    artifact_id?: string;
    question?: string;
    answer_text: string;
    claims: ClaimRef[];
    sources: SourceRef[];
    profile?: string;
    tenant_id?: string;
    budget?: {
        max_llm_calls?: number;
        max_tokens?: number;
        max_heavy_checks?: number;
    };
    label_via_llm?: boolean;
}
export interface ReviewFinding {
    check_kind: string;
    claim_id: string | null;
    verdict: RiskVerdict;
    reason: string;
    suggested_rewrite?: string | null;
    confidence: number;
    cost_class: CostClass;
    evidence: string[];
}
export interface BudgetConsumption {
    llm_calls: number;
    tokens: number;
    heavy_checks: number;
    wall_seconds: number;
}
export interface ReviewResult {
    review_id: string;
    artifact_id: string;
    profile_key: string;
    risk_score: number;
    claim_verdicts: Record<string, RiskVerdict>;
    source_tiers: Record<string, EvidenceTier>;
    findings: ReviewFinding[];
    budget: BudgetConsumption;
    reviewed_at: string;
    meta: Record<string, unknown>;
}
export interface ReviewLogRow {
    review_id: string;
    artifact_id: string;
    profile_key: string;
    max_verdict: RiskVerdict;
    risk_score: number;
    tenant_id: string | null;
    created_at: string;
}
export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
export interface ProfileMetadata {
    key: string;
    label: string;
    description: string;
    enabled_checks: string[];
    min_tier: Record<ClaimAssertiveness, number>;
    verdict_policy?: {
        never_auto_remove?: boolean;
    };
}
export interface ReviewLogFilters {
    page?: number;
    tenant?: string;
    profile?: string;
    min_verdict?: RiskVerdict | '';
}
export interface SubmitReviewOptions {
    dry_run?: boolean;
}
