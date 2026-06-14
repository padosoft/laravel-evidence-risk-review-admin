<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin;

use Illuminate\Support\ServiceProvider;

final class EvidenceRiskReviewAdminServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/evidence-risk-review-admin.php', 'evidence-risk-review-admin');
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'evidence-risk-review-admin');
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->publishes([
            __DIR__.'/../config/evidence-risk-review-admin.php' => config_path('evidence-risk-review-admin.php'),
        ], 'evidence-risk-review-admin-config');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/evidence-risk-review-admin'),
        ], 'evidence-risk-review-admin-views');

        $builtAssets = __DIR__.'/../public/vendor/evidence-risk-review-admin';

        if (is_dir($builtAssets)) {
            $this->publishes([
                $builtAssets => public_path((string) config('evidence-risk-review-admin.asset_path', 'vendor/evidence-risk-review-admin')),
            ], 'evidence-risk-review-admin-assets');
        }
    }
}
