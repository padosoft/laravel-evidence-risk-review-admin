<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Feature;

use Illuminate\Routing\Router;
use Orchestra\Testbench\Attributes\WithConfig;
use Padosoft\EvidenceRiskReviewAdmin\Tests\TestCase;

#[WithConfig('evidence-risk-review-admin.middleware', ['web', 'auth', 'verified'], defer: false)]
final class MiddlewareAppliedTest extends TestCase
{
    public function test_configured_middleware_is_attached_to_panel_route(): void
    {
        self::assertNotNull($this->app);

        $router = $this->app->make(Router::class);
        $route = $router->getRoutes()->getByName('evidence-risk-review-admin.panel');

        self::assertNotNull($route);

        $middleware = $route->gatherMiddleware();

        self::assertContains('web', $middleware);
        self::assertContains('auth', $middleware);
        self::assertContains('verified', $middleware);
    }
}
