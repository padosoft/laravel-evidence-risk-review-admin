import { Link, useParams } from 'react-router-dom';
import { CostBadge, TierBadge, VerdictBadge } from '../components/badges';
import { ScreenState, stateFromQuery } from '../components/state';
import { ApiError } from '../lib/api/errors';
import { useReview } from '../lib/queries';

export function ReviewDetailPage() {
  const { reviewId = '' } = useParams();
  const review = useReview(reviewId);
  const notFound = review.error instanceof ApiError && review.error.status === 404;
  const state = stateFromQuery({
    isLoading: review.isLoading,
    isError: review.isError && !notFound,
  });

  if (notFound) {
    return (
      <section className="evr-page" data-testid="evr-review-detail-notfound" data-state="error" aria-busy="false">
        <h1>Review not found</h1>
        <p>The configured core API did not return this review.</p>
        <Link to="/reviews">Back to log</Link>
      </section>
    );
  }

  return (
    <ScreenState testId="evr-review-detail" state={state} error={review.error}>
      {review.data ? (
        <section className="evr-page">
          <div className="evr-page__header" data-testid={`evr-review-detail-header-${review.data.review_id}`}>
            <div>
              <h1>{review.data.review_id}</h1>
              <p>{review.data.artifact_id}</p>
            </div>
            <strong className="evr-risk">{review.data.risk_score}</strong>
          </div>

          <div className="evr-panel-grid">
            <section className="evr-panel">
              <h2>Claim verdicts</h2>
              {Object.entries(review.data.claim_verdicts).map(([claimId, verdict]) => (
                <div className="evr-row" key={claimId} data-testid={`evr-review-detail-claim-${claimId}`}>
                  <span>{claimId}</span>
                  <VerdictBadge verdict={verdict} />
                </div>
              ))}
            </section>
            <section className="evr-panel">
              <h2>Budget</h2>
              <dl className="evr-definition-grid">
                <dt>LLM calls</dt>
                <dd>{review.data.budget.llm_calls}</dd>
                <dt>Tokens</dt>
                <dd>{review.data.budget.tokens}</dd>
                <dt>Heavy checks</dt>
                <dd>{review.data.budget.heavy_checks}</dd>
              </dl>
            </section>
          </div>

          <section className="evr-panel">
            <h2>Findings</h2>
            <div className="evr-finding-list">
              {review.data.findings.map((finding, index) => (
                <article key={`${finding.check_kind}-${index}`} className="evr-finding" data-testid={`evr-review-detail-finding-${index}`}>
                  <div>
                    <strong>{finding.check_kind}</strong>
                    <VerdictBadge verdict={finding.verdict} />
                    <CostBadge cost={finding.cost_class} />
                  </div>
                  <p>{finding.reason}</p>
                  {finding.suggested_rewrite ? <blockquote>{finding.suggested_rewrite}</blockquote> : null}
                </article>
              ))}
            </div>
          </section>

          <section className="evr-panel">
            <h2>Source tiers</h2>
            <div className="evr-tier-list">
              {Object.entries(review.data.source_tiers).map(([sourceId, tier]) => (
                <div key={sourceId} data-testid={`evr-review-detail-source-${sourceId}`}>
                  <span>{sourceId}</span>
                  <TierBadge tier={tier} />
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : null}
    </ScreenState>
  );
}
