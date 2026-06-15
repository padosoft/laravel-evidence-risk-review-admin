import { CostClass, EvidenceTier, RiskVerdict } from '../lib/api/types';
export declare function VerdictBadge({ verdict }: {
    verdict: RiskVerdict;
}): import("react").JSX.Element;
export declare function CostBadge({ cost }: {
    cost: CostClass;
}): import("react").JSX.Element;
export declare function TierBadge({ tier }: {
    tier: EvidenceTier;
}): import("react").JSX.Element;
