import { ReactNode } from 'react';
import { ApiError } from '../lib/api/errors';
import { DataState, DataStateRegion } from '../lib/data-state';

export function stateFromQuery({
  isLoading,
  isError,
  isEmpty,
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
}): DataState {
  if (isLoading) {
    return 'loading';
  }

  if (isError) {
    return 'error';
  }

  if (isEmpty) {
    return 'empty';
  }

  return 'ready';
}

export function ScreenState({
  testId,
  state,
  error,
  empty,
  children,
}: {
  testId: string;
  state: DataState;
  error?: unknown;
  empty?: string;
  children: ReactNode;
}) {
  return (
    <DataStateRegion testId={testId} state={state}>
      {state === 'loading' ? <div className="evr-skeleton">Loading...</div> : null}
      {state === 'error' ? (
        <div className="evr-callout evr-callout--error" data-testid={`${testId}-error`}>
          {error instanceof ApiError ? error.message : 'Unable to load Evidence Risk Review data.'}
        </div>
      ) : null}
      {state === 'empty' ? (
        <div className="evr-empty" data-testid={`${testId}-empty`}>
          {empty ?? 'No data yet.'}
        </div>
      ) : null}
      {state === 'ready' ? children : null}
    </DataStateRegion>
  );
}
