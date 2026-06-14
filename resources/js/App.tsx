import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useMemo } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { EvidenceRiskReviewAdminAppProps, routeBase, runtimeConfig } from './config';
import { DashboardPage } from './pages/DashboardPage';
import { DeferredPage } from './pages/DeferredPage';
import { ProfileDetailPage, ProfilesPage } from './pages/ProfilesPage';
import { ReviewDetailPage } from './pages/ReviewDetailPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { TaxonomyPage } from './pages/TaxonomyPage';
import { Shell } from './shell/Shell';

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
    return <MemoryRouter>{content}</MemoryRouter>;
  }

  return <BrowserRouter basename={routeBase(resolved)}>{content}</BrowserRouter>;
}

export function EvidenceRiskReviewAdminApp({ config, embedded = false }: EvidenceRiskReviewAdminAppProps) {
  const resolved = runtimeConfig(config);

  return (
    <Providers config={resolved} embedded={embedded}>
      <div data-testid="evr-app" data-state="ready" aria-busy="false" data-api-base={resolved.api_base}>
        <Routes>
          <Route element={<Shell embedded={embedded} />}>
            <Route index element={<DashboardPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/reviews/:reviewId" element={<ReviewDetailPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/profiles/:key" element={<ProfileDetailPage />} />
            <Route path="/taxonomy" element={<TaxonomyPage />} />
            <Route path="/try" element={<DeferredPage title="Submit for review" testId="evr-try" />} />
            <Route path="/settings" element={<DeferredPage title="Settings" testId="evr-settings" />} />
          </Route>
        </Routes>
      </div>
    </Providers>
  );
}
