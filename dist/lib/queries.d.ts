import { PropsWithChildren } from 'react';
import { EvidenceRiskReviewAdminRuntimeConfig } from '../config.js';
import { ReviewArtifactInput, ReviewLogFilters, SubmitReviewOptions } from './api/types.js';
export declare const queryKeys: {
    reviews: (filters?: ReviewLogFilters) => readonly ["evr", "reviews", ReviewLogFilters];
    review: (reviewId: string) => readonly ["evr", "reviews", string];
    profiles: () => readonly ["evr", "profiles"];
    profile: (key: string) => readonly ["evr", "profiles", string];
    taxonomy: () => readonly ["evr", "taxonomy"];
};
export declare function ApiEndpointsProvider({ children, config, }: PropsWithChildren<{
    config: EvidenceRiskReviewAdminRuntimeConfig;
}>): import("react").FunctionComponentElement<import("react").ProviderProps<{
    listReviews(filters?: ReviewLogFilters): Promise<import("./api/types.js").Paginated<import("./api/types.js").ReviewLogRow>>;
    getReview(reviewId: string): Promise<import("./api/types.js").ReviewResult>;
    submitReview(input: ReviewArtifactInput, options?: SubmitReviewOptions): Promise<import("./api/types.js").ReviewResult>;
    listProfiles(): Promise<import("./api/types.js").ProfileMetadata[]>;
    getProfile(key: string): Promise<import("./api/types.js").ProfileMetadata>;
    taxonomy(): Promise<import("./api/types.js").EvidenceTier[]>;
}>>;
export declare function useEvidenceRiskReviewEndpoints(): {
    listReviews(filters?: ReviewLogFilters): Promise<import("./api/types.js").Paginated<import("./api/types.js").ReviewLogRow>>;
    getReview(reviewId: string): Promise<import("./api/types.js").ReviewResult>;
    submitReview(input: ReviewArtifactInput, options?: SubmitReviewOptions): Promise<import("./api/types.js").ReviewResult>;
    listProfiles(): Promise<import("./api/types.js").ProfileMetadata[]>;
    getProfile(key: string): Promise<import("./api/types.js").ProfileMetadata>;
    taxonomy(): Promise<import("./api/types.js").EvidenceTier[]>;
};
export declare function useReviews(filters?: ReviewLogFilters): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types.js").Paginated<import("./api/types.js").ReviewLogRow>>, Error>;
export declare function useReview(reviewId: string): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types.js").ReviewResult>, Error>;
export declare function useProfiles(): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types.js").ProfileMetadata[]>, Error>;
export declare function useProfile(key: string): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types.js").ProfileMetadata>, Error>;
export declare function useTaxonomy(): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types.js").EvidenceTier[]>, Error>;
export declare function useSubmitReview(): import("@tanstack/react-query").UseMutationResult<import("./api/types.js").ReviewResult, Error, {
    input: ReviewArtifactInput;
    options?: SubmitReviewOptions;
}, unknown>;
