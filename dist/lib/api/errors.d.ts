export interface ApiErrorPayload {
    error?: {
        code?: string;
        message?: string;
    };
    errors?: Record<string, string[]>;
    message?: string;
}
export declare class ApiError extends Error {
    readonly status: number | null;
    readonly code: string;
    readonly payload?: ApiErrorPayload | undefined;
    constructor(message: string, status: number | null, code: string, payload?: ApiErrorPayload | undefined);
}
export declare class ValidationError extends ApiError {
    constructor(status: number, code: string, message: string, payload: ApiErrorPayload);
    get fieldErrors(): Record<string, string[]>;
}
export declare class FeatureDisabledError extends ApiError {
    constructor(status: number, message: string, payload?: ApiErrorPayload);
}
export declare class AuthExpiredError extends ApiError {
    constructor(status: number, message: string, payload?: ApiErrorPayload);
}
export declare class NetworkError extends ApiError {
    constructor(message?: string);
}
export declare function normalizeApiError(error: unknown): ApiError;
