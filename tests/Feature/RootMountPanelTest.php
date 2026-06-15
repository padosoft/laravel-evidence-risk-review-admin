<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Feature;

use Orchestra\Testbench\Attributes\WithConfig;
use Padosoft\EvidenceRiskReviewAdmin\Tests\TestCase;

#[WithConfig('evidence-risk-review-admin.middleware', ['web'], defer: false)]
#[WithConfig('evidence-risk-review-admin.mount_prefix', '/', defer: false)]
final class RootMountPanelTest extends TestCase
{
    public function test_panel_mounts_at_site_root_when_prefix_is_root(): void
    {
        $response = $this->get('/')
            ->assertOk()
            ->assertSee('evidence-risk-review-admin-root')
            ->assertSee('\u0022mount_prefix\u0022:\u0022\u0022', false);

        self::assertStringContainsString('window.__EVIDENCE_RISK_REVIEW_ADMIN__', (string) $response->getContent());
    }
}
