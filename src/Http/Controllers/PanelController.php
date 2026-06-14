<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Routing\Controller;

final class PanelController extends Controller
{
    public function __invoke(): View
    {
        return view('evidence-risk-review-admin::panel', [
            'runtimeConfig' => [
                'api_base' => (string) config('evidence-risk-review-admin.api_base', '/evidence-risk-review/api'),
                'mount_prefix' => trim((string) config('evidence-risk-review-admin.mount_prefix', 'admin/evidence-risk-review'), '/'),
                'theme_default' => (string) config('evidence-risk-review-admin.theme_default', 'dark'),
                'asset_path' => trim((string) config('evidence-risk-review-admin.asset_path', 'vendor/evidence-risk-review-admin'), '/'),
            ],
        ]);
    }
}
