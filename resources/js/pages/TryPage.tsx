import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { VerdictBadge } from '../components/badges';
import { ApiError, ValidationError } from '../lib/api/errors';
import { ClaimAssertiveness, ClaimRef, SourceRef } from '../lib/api/types';
import { useProfiles, useSubmitReview } from '../lib/queries';

function newClaim(index: number): ClaimRef {
  return {
    id: `claim_${index + 1}`,
    text: '',
    assertiveness: 'likely',
    source_ids: ['src_1'],
  };
}

function newSource(index: number): SourceRef {
  return {
    id: `src_${index + 1}`,
    title: '',
    url: '',
    declared_tier: '',
    population: '',
  };
}

export function TryPage() {
  const profiles = useProfiles();
  const submit = useSubmitReview();
  const [question, setQuestion] = useState('What does the evidence support?');
  const [answerText, setAnswerText] = useState('');
  const [profile, setProfile] = useState('clinical');
  const [dryRun, setDryRun] = useState(true);
  const [labelViaLlm, setLabelViaLlm] = useState(false);
  const [claims, setClaims] = useState<ClaimRef[]>([newClaim(0)]);
  const [sources, setSources] = useState<SourceRef[]>([newSource(0)]);
  const validation = submit.error instanceof ValidationError ? submit.error : null;
  const apiError = submit.error instanceof ApiError ? submit.error : null;

  function updateClaim(index: number, patch: Partial<ClaimRef>) {
    setClaims((items) => items.map((item, current) => (current === index ? { ...item, ...patch } : item)));
  }

  function updateSource(index: number, patch: Partial<SourceRef>) {
    setSources((items) => items.map((item, current) => (current === index ? { ...item, ...patch } : item)));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit.mutate({
      input: {
        question,
        answer_text: answerText,
        profile,
        claims,
        sources,
        label_via_llm: labelViaLlm,
      },
      options: { dry_run: dryRun },
    });
  }

  return (
    <section className="evr-page" data-testid="evr-try" data-state={submit.isPending ? 'loading' : submit.data ? 'ready' : 'idle'} aria-busy={submit.isPending}>
      <div className="evr-page__header">
        <div>
          <h1>Submit for review</h1>
          <p>Build a review artifact and send it to the core API.</p>
        </div>
      </div>

      {apiError?.status === 503 ? (
        <div className="evr-callout evr-callout--error" data-testid="evr-try-llm-unavailable">
          {apiError.message}
        </div>
      ) : null}

      <form className="evr-form-grid" data-testid="evr-try-form" onSubmit={handleSubmit}>
        <section className="evr-panel">
          <h2>Artifact</h2>
          <label>
            Question
            <input data-testid="evr-try-question" value={question} onChange={(event) => setQuestion(event.target.value)} />
          </label>
          <label>
            Answer text
            <textarea data-testid="evr-try-answer" value={answerText} onChange={(event) => setAnswerText(event.target.value)} />
          </label>
          {validation?.fieldErrors.answer_text ? (
            <p className="evr-field-error" data-testid="evr-try-answer-error">
              {validation.fieldErrors.answer_text[0]}
            </p>
          ) : null}
        </section>

        <section className="evr-panel">
          <h2>Claims</h2>
          {claims.map((claim, index) => (
            <div className="evr-repeat-row" key={claim.id}>
              <label>
                Claim
                <input data-testid={`evr-try-claim-${index}-text`} value={claim.text} onChange={(event) => updateClaim(index, { text: event.target.value })} />
              </label>
              <label>
                Assertiveness
                <select
                  data-testid={`evr-try-claim-${index}-assertiveness`}
                  value={claim.assertiveness}
                  onChange={(event) => updateClaim(index, { assertiveness: event.target.value as ClaimAssertiveness })}
                >
                  <option value="definitive">Definitive</option>
                  <option value="likely">Likely</option>
                  <option value="tentative">Tentative</option>
                </select>
              </label>
              <button
                className="evr-button evr-button--ghost"
                type="button"
                data-testid={`evr-try-remove-claim-${index}`}
                onClick={() => setClaims((items) => items.filter((_, current) => current !== index))}
                disabled={claims.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="evr-button evr-button--ghost" type="button" data-testid="evr-try-add-claim" onClick={() => setClaims((items) => [...items, newClaim(items.length)])}>
            Add claim
          </button>
        </section>

        <section className="evr-panel">
          <h2>Sources</h2>
          {sources.map((source, index) => (
            <div className="evr-repeat-row" key={source.id}>
              <label>
                Source id
                <input data-testid={`evr-try-source-${index}-id`} value={source.id} onChange={(event) => updateSource(index, { id: event.target.value })} />
              </label>
              <label>
                Title
                <input data-testid={`evr-try-source-${index}-title`} value={source.title ?? ''} onChange={(event) => updateSource(index, { title: event.target.value })} />
              </label>
              <label>
                URL
                <input data-testid={`evr-try-source-${index}-url`} value={source.url ?? ''} onChange={(event) => updateSource(index, { url: event.target.value })} />
              </label>
              <button
                className="evr-button evr-button--ghost"
                type="button"
                data-testid={`evr-try-remove-source-${index}`}
                onClick={() => setSources((items) => items.filter((_, current) => current !== index))}
                disabled={sources.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="evr-button evr-button--ghost" type="button" data-testid="evr-try-add-source" onClick={() => setSources((items) => [...items, newSource(items.length)])}>
            Add source
          </button>
        </section>

        <aside className="evr-panel">
          <h2>Run config</h2>
          <label>
            Profile
            <select data-testid="evr-try-profile" value={profile} onChange={(event) => setProfile(event.target.value)}>
              {(profiles.data ?? []).map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="evr-checkbox">
            <input data-testid="evr-try-dry-run" type="checkbox" checked={dryRun} onChange={(event) => setDryRun(event.target.checked)} />
            Dry run
          </label>
          <label className="evr-checkbox">
            <input data-testid="evr-try-label-via-llm" type="checkbox" checked={labelViaLlm} onChange={(event) => setLabelViaLlm(event.target.checked)} />
            Label via LLM
          </label>
          <button className="evr-button" type="submit" data-testid="evr-try-submit" disabled={submit.isPending}>
            Submit
          </button>
        </aside>
      </form>

      {submit.data ? (
        <section className="evr-panel" data-testid="evr-try-result">
          <div className="evr-page__header">
            <div>
              <h2>{submit.data.review_id}</h2>
              <p>{submit.data.artifact_id}</p>
            </div>
            <VerdictBadge verdict={Object.values(submit.data.claim_verdicts)[0] ?? 'keep'} />
          </div>
          {!dryRun ? (
            <Link to={`/reviews/${submit.data.review_id}`} data-testid="evr-try-view-log">
              View in log
            </Link>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}
