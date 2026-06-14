import { ReactNode } from 'react';

export type DataState = 'idle' | 'loading' | 'ready' | 'error' | 'empty';

export function DataStateRegion({
  state,
  testId,
  children,
}: {
  state: DataState;
  testId: string;
  children: ReactNode;
}) {
  return (
    <section data-testid={testId} data-state={state} aria-busy={state === 'loading'}>
      {children}
    </section>
  );
}
