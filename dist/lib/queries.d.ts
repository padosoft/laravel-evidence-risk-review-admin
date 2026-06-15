import { ReviewArtifactInput, ReviewLogFilters, SubmitReviewOptions } from './api/types';
export declare const queryKeys: {
    reviews: (filters?: ReviewLogFilters) => readonly ["evr", "reviews", ReviewLogFilters];
    review: (reviewId: string) => readonly ["evr", "reviews", string];
    profiles: () => readonly ["evr", "profiles"];
    profile: (key: string) => readonly ["evr", "profiles", string];
    taxonomy: () => readonly ["evr", "taxonomy"];
};
export declare function useReviews(filters?: ReviewLogFilters): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types").Paginated<import("./api/types").ReviewLogRow>>, Error>;
export declare function useReview(reviewId: string): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types").ReviewResult>, Error>;
export declare function useProfiles(): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types").ProfileMetadata[]>, Error>;
export declare function useProfile(key: string): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types").ProfileMetadata>, Error>;
export declare function useTaxonomy(): import("@tanstack/react-query").UseQueryResult<NoInfer<import("./api/types").EvidenceTier[]>, Error>;
export declare function useSubmitReview(): import("@tanstack/react-query").UseMutationResult<import("./api/types").ReviewResult, Error, {
    input: ReviewArtifactInput;
    options?: SubmitReviewOptions;
}, unknown>;
