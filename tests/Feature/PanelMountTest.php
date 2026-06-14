<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Feature;

use Orchestra\Testbench\Attributes\WithConfig;
use Padosoft\EvidenceRiskReviewAdmin\Tests\TestCase;

#[WithConfig('evidence-risk-review-admin.middleware', ['web'], defer: false)]
final class PanelMountTest extends TestCase
{
    public function test_panel_mounts_at_default_prefix(): void
    {
        $response = $this->get('/admin/evidence-risk-review')
            ->assertOk()
            ->assertSee('evidence-risk-review-admin-root')
            ->assertSee('window.__EVIDENCE_RISK_REVIEW_ADMIN__', false);

        $content = (string) $response->getContent();

        self::assertStringContainsString('api_base', $content);
        self::assertStringContainsString('evidence-risk-review', $content);
    }

    public function test_panel_catch_all_supports_deep_links(): void
    {
        $this->get('/admin/evidence-risk-review/reviews/rev_demo_1')
            ->assertOk()
            ->assertSee('evidence-risk-review-admin-root')
            ->assertSee('evr-admin-assets-missing');
    }
}
