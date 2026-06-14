import { AxiosInstance } from 'axios';
import { createApiClient } from './client';
import {
  EvidenceTier,
  Paginated,
  ProfileMetadata,
  ReviewArtifactInput,
  ReviewLogFilters,
  ReviewLogRow,
  ReviewResult,
  SubmitReviewOptions,
} from './types';

function params(filters: ReviewLogFilters): Record<string, string | number> {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ) as Record<string, string | number>;
}

export function evidenceRiskReviewEndpoints(client: AxiosInstance = createApiClient()) {
  return {
    async listReviews(filters: ReviewLogFilters = {}): Promise<Paginated<ReviewLogRow>> {
      const response = await client.get<Paginated<ReviewLogRow>>('/reviews', { params: params(filters) });

      return response.data;
    },

    async getReview(reviewId: string): Promise<ReviewResult> {
      const response = await client.get<ReviewResult>(`/reviews/${encodeURIComponent(reviewId)}`);

      return response.data;
    },

    async submitReview(input: ReviewArtifactInput, options: SubmitReviewOptions = {}): Promise<ReviewResult> {
      const response = await client.post<ReviewResult>('/reviews', input, {
        params: options.dry_run ? { dry_run: 1 } : undefined,
      });

      return response.data;
    },

    async listProfiles(): Promise<ProfileMetadata[]> {
      const response = await client.get<ProfileMetadata[]>('/profiles');

      return response.data;
    },

    async getProfile(key: string): Promise<ProfileMetadata> {
      const response = await client.get<ProfileMetadata>(`/profiles/${encodeURIComponent(key)}`);

      return response.data;
    },

    async taxonomy(): Promise<EvidenceTier[]> {
      const response = await client.get<EvidenceTier[]>('/taxonomy');

      return response.data;
    },
  };
}

export const endpoints = evidenceRiskReviewEndpoints();
