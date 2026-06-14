import { useMutation, useQuery } from '@tanstack/react-query';
import { endpoints } from './api/endpoints';
import { ReviewArtifactInput, ReviewLogFilters, SubmitReviewOptions } from './api/types';

export const queryKeys = {
  reviews: (filters: ReviewLogFilters = {}) => ['evr', 'reviews', filters] as const,
  review: (reviewId: string) => ['evr', 'reviews', reviewId] as const,
  profiles: () => ['evr', 'profiles'] as const,
  profile: (key: string) => ['evr', 'profiles', key] as const,
  taxonomy: () => ['evr', 'taxonomy'] as const,
};

export function useReviews(filters: ReviewLogFilters = {}) {
  return useQuery({
    queryKey: queryKeys.reviews(filters),
    queryFn: () => endpoints.listReviews(filters),
  });
}

export function useReview(reviewId: string) {
  return useQuery({
    queryKey: queryKeys.review(reviewId),
    queryFn: () => endpoints.getReview(reviewId),
    enabled: reviewId !== '',
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: queryKeys.profiles(),
    queryFn: () => endpoints.listProfiles(),
  });
}

export function useProfile(key: string) {
  return useQuery({
    queryKey: queryKeys.profile(key),
    queryFn: () => endpoints.getProfile(key),
    enabled: key !== '',
  });
}

export function useTaxonomy() {
  return useQuery({
    queryKey: queryKeys.taxonomy(),
    queryFn: () => endpoints.taxonomy(),
  });
}

export function useSubmitReview() {
  return useMutation({
    mutationFn: ({ input, options = {} }: { input: ReviewArtifactInput; options?: SubmitReviewOptions }) =>
      endpoints.submitReview(input, options),
  });
}
