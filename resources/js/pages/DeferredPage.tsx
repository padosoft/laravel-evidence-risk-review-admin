export function DeferredPage({ title, testId }: { title: string; testId: string }) {
  return (
    <section className="evr-page" data-testid={testId} data-state="ready" aria-busy="false">
      <div className="evr-page__header">
        <div>
          <h1>{title}</h1>
          <p>This screen is implemented in W4.</p>
        </div>
      </div>
    </section>
  );
}
