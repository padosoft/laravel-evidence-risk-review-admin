import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/panel.css';
import { EvidenceRiskReviewAdminApp } from './App';
import { runtimeConfig } from './config';

const root = document.getElementById('evidence-risk-review-admin-root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <EvidenceRiskReviewAdminApp config={runtimeConfig()} />
    </React.StrictMode>,
  );
}

export { EvidenceRiskReviewAdminApp };
export type { EvidenceRiskReviewAdminAppProps, EvidenceRiskReviewAdminRuntimeConfig } from './config';
