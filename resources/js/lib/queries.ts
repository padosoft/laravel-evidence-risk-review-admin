import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, createElement, PropsWithChildren, useContext, useMemo } from 'react';
import { EvidenceRiskReviewAdminRuntimeConfig } from '../config';
import { createApiClient } from './api/client';
import { endpoints, evidenceRiskReviewEndpoints } from './api/endpoints';
import { ReviewArtifactInput, ReviewLogFilters, SubmitReviewOptions } from './api/types';

export const queryKeys = {
  reviews: (filters: ReviewLogFilters = {}) => ['evr', 'reviews', filters] as const,
  review: (reviewId: string) => ['evr', 'reviews', reviewId] as const,
  profiles: () => ['evr', 'profiles'] as const,
  profile: (key: string) => ['evr', 'profiles', key] as const,
  taxonomy: () => ['evr', 'taxonomy'] as const,
};

const ApiEndpointsContext = createContext(endpoints);

export function ApiEndpointsProvider({
  children,
  config,
}: PropsWithChildren<{ config: EvidenceRiskReviewAdminRuntimeConfig }>) {
  const configuredEndpoints = useMemo(() => evidenceRiskReviewEndpoints(createApiClient(config)), [config.api_base]);

  return createElement(ApiEndpointsContext.Provider, { value: configuredEndpoints }, children);
}

export function useEvidenceRiskReviewEndpoints() {
  return useContext(ApiEndpointsContext);
}

export function useReviews(filters: ReviewLogFilters = {}) {
  const api = useEvidenceRiskReviewEndpoints();

  return useQuery({
    queryKey: queryKeys.reviews(filters),
    queryFn: () => api.listReviews(filters),
  });
}

export function useReview(reviewId: string) {
  const api = useEvidenceRiskReviewEndpoints();

  return useQuery({
    queryKey: queryKeys.review(reviewId),
    queryFn: () => api.getReview(reviewId),
    enabled: reviewId !== '',
  });
}

export function useProfiles() {
  const api = useEvidenceRiskReviewEndpoints();

  return useQuery({
    queryKey: queryKeys.profiles(),
    queryFn: () => api.listProfiles(),
  });
}

export function useProfile(key: string) {
  const api = useEvidenceRiskReviewEndpoints();

  return useQuery({
    queryKey: queryKeys.profile(key),
    queryFn: () => api.getProfile(key),
    enabled: key !== '',
  });
}

export function useTaxonomy() {
  const api = useEvidenceRiskReviewEndpoints();

  return useQuery({
    queryKey: queryKeys.taxonomy(),
    queryFn: () => api.taxonomy(),
  });
}

export function useSubmitReview() {
  const api = useEvidenceRiskReviewEndpoints();

  return useMutation({
    mutationFn: ({ input, options = {} }: { input: ReviewArtifactInput; options?: SubmitReviewOptions }) =>
      api.submitReview(input, options),
  });
}
