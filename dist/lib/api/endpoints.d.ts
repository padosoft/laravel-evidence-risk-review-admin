import { AxiosInstance } from 'axios';
import { EvidenceTier, Paginated, ProfileMetadata, ReviewArtifactInput, ReviewLogFilters, ReviewLogRow, ReviewResult, SubmitReviewOptions } from './types';
export declare function evidenceRiskReviewEndpoints(client?: AxiosInstance): {
    listReviews(filters?: ReviewLogFilters): Promise<Paginated<ReviewLogRow>>;
    getReview(reviewId: string): Promise<ReviewResult>;
    submitReview(input: ReviewArtifactInput, options?: SubmitReviewOptions): Promise<ReviewResult>;
    listProfiles(): Promise<ProfileMetadata[]>;
    getProfile(key: string): Promise<ProfileMetadata>;
    taxonomy(): Promise<EvidenceTier[]>;
};
export declare const endpoints: {
    listReviews(filters?: ReviewLogFilters): Promise<Paginated<ReviewLogRow>>;
    getReview(reviewId: string): Promise<ReviewResult>;
    submitReview(input: ReviewArtifactInput, options?: SubmitReviewOptions): Promise<ReviewResult>;
    listProfiles(): Promise<ProfileMetadata[]>;
    getProfile(key: string): Promise<ProfileMetadata>;
    taxonomy(): Promise<EvidenceTier[]>;
};
