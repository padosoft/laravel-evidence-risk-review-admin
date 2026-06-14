<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Padosoft\EvidenceRiskReviewAdmin\Http\Controllers\PanelController;

$prefix = trim((string) config('evidence-risk-review-admin.mount_prefix', 'admin/evidence-risk-review'), '/');
$middleware = config('evidence-risk-review-admin.middleware', ['web']);
$middleware = is_array($middleware) && $middleware !== [] ? array_values($middleware) : ['web'];

Route::middleware($middleware)
    ->prefix($prefix)
    ->group(static function (): void {
        Route::get('/{any?}', PanelController::class)
            ->where('any', '.*')
            ->name('evidence-risk-review-admin.panel');
    });
