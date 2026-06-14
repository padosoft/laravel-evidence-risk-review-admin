import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { EvidenceRiskReviewAdminAppProps, routeBase, runtimeConfig } from './config';

function Providers({
  children,
  config,
  embedded,
}: PropsWithChildren<Required<Pick<EvidenceRiskReviewAdminAppProps, 'embedded'>> & Pick<EvidenceRiskReviewAdminAppProps, 'config'>>) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 30_000,
          },
        },
      }),
    [],
  );

  const resolved = runtimeConfig(config);

  const content = <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  if (embedded) {
    return content;
  }

  return <BrowserRouter basename={routeBase(resolved)}>{content}</BrowserRouter>;
}

export function EvidenceRiskReviewAdminApp({ config, embedded = false }: EvidenceRiskReviewAdminAppProps) {
  const resolved = runtimeConfig(config);

  return (
    <Providers config={resolved} embedded={embedded}>
      <main className="evr-app-shell" data-testid="evr-app" data-state="ready" aria-busy="false">
        <section className="evr-app-shell__panel" data-testid="evr-spa-foundation">
          <h1>Evidence Risk Review Admin</h1>
          <p>SPA foundation loaded. Read screens are implemented in W3.</p>
          <dl>
            <dt>API base</dt>
            <dd>{resolved.api_base}</dd>
            <dt>Mount prefix</dt>
            <dd>{resolved.mount_prefix}</dd>
          </dl>
        </section>
      </main>
    </Providers>
  );
}
