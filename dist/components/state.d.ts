import { ReactNode } from 'react';
import { DataState } from '../lib/data-state.js';
export declare function stateFromQuery({ isLoading, isError, isEmpty, }: {
    isLoading: boolean;
    isError: boolean;
    isEmpty?: boolean;
}): DataState;
export declare function ScreenState({ testId, state, error, empty, children, }: {
    testId: string;
    state: DataState;
    error?: unknown;
    empty?: string;
    children: ReactNode;
}): import("react").JSX.Element;
