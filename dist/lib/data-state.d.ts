import { ReactNode } from 'react';
export type DataState = 'idle' | 'loading' | 'ready' | 'error' | 'empty';
export declare function DataStateRegion({ state, testId, children, }: {
    state: DataState;
    testId: string;
    children: ReactNode;
}): import("react").JSX.Element;
