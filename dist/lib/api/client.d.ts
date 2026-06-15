import { AxiosInstance } from 'axios';
import { EvidenceRiskReviewAdminRuntimeConfig } from '../../config';
export declare function resolveApiBase(config?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): string;
export declare function createApiClient(config?: Partial<EvidenceRiskReviewAdminRuntimeConfig>): AxiosInstance;
export declare const apiClient: AxiosInstance;
