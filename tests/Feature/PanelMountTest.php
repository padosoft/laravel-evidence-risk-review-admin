<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Feature;

use JsonException;
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

    public function test_runtime_config_normalizes_blank_and_wrapped_values(): void
    {
        config()->set('evidence-risk-review-admin.api_base', ' /custom/api/ ');
        config()->set('evidence-risk-review-admin.mount_prefix', '/admin/custom/');
        config()->set('evidence-risk-review-admin.theme_default', 'invalid');
        config()->set('evidence-risk-review-admin.asset_path', '/custom-assets/');

        $content = (string) $this->get('/admin/evidence-risk-review')->assertOk()->getContent();
        $runtimeConfig = $this->runtimeConfigFrom($content);

        self::assertSame('/custom/api', $runtimeConfig['api_base']);
        self::assertSame('admin/custom', $runtimeConfig['mount_prefix']);
        self::assertSame('dark', $runtimeConfig['theme_default']);
        self::assertSame('custom-assets', $runtimeConfig['asset_path']);
    }

    /**
     * @return array<string, string>
     *
     * @throws JsonException
     */
    private function runtimeConfigFrom(string $content): array
    {
        preg_match("/window\\.__EVIDENCE_RISK_REVIEW_ADMIN__ = JSON\\.parse\\('(.+)'\\);/", $content, $matches);

        if (! isset($matches[1])) {
            self::fail('Runtime config JSON.parse payload was not found in the panel shell.');
        }

        $json = json_decode('"'.$matches[1].'"', true, flags: JSON_THROW_ON_ERROR);

        self::assertIsString($json);

        return json_decode($json, true, flags: JSON_THROW_ON_ERROR);
    }
}
