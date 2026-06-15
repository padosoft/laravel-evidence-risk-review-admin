<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Integration;

use Illuminate\Http\Request;
use Orchestra\Testbench\Attributes\WithConfig;
use Padosoft\EvidenceRiskReviewAdmin\Tests\TestCase;

#[WithConfig('evidence-risk-review-admin.middleware', ['web'], defer: false)]
#[WithConfig('evidence-risk-review-admin.api_base', '/evidence-risk-review/api', defer: false)]
final class HostBootIntegrationTest extends TestCase
{
    /**
     * @var list<array<string, mixed>>
     */
    private static array $reviews = [];

    protected function defineRoutes($router): void
    {
        $router->get('/evidence-risk-review/api/taxonomy', static fn () => response()->json([
            ['key' => 'official', 'rank' => 5, 'label' => 'Official guidance', 'builtin' => true],
            ['key' => 'unverified', 'rank' => 1, 'label' => 'Unverified', 'builtin' => true],
        ]));

        $router->get('/evidence-risk-review/api/reviews', static fn () => response()->json([
            'data' => self::$reviews,
            'current_page' => 1,
            'last_page' => 1,
            'per_page' => 15,
            'total' => count(self::$reviews),
        ]));

        $router->post('/evidence-risk-review/api/reviews', static function (Request $request) {
            $review = [
                'review_id' => 'rev_host_1',
                'artifact_id' => $request->input('artifact_id', 'artifact_host_1'),
                'profile_key' => $request->input('profile', 'clinical'),
                'max_verdict' => 'soften',
                'risk_score' => 42,
                'tenant_id' => $request->input('tenant_id'),
                'created_at' => '2026-06-15T00:00:00Z',
            ];

            self::$reviews = [$review];

            return response()->json([
                ...$review,
                'claim_verdicts' => ['claim_1' => 'soften'],
                'source_tiers' => [
                    'src_1' => ['key' => 'official', 'rank' => 5, 'label' => 'Official guidance', 'builtin' => true],
                ],
                'findings' => [],
                'budget' => ['llm_calls' => 0, 'tokens' => 0, 'heavy_checks' => 0, 'wall_seconds' => 0.01],
                'reviewed_at' => '2026-06-15T00:00:00Z',
                'meta' => [],
            ], 201);
        });
    }

    protected function setUp(): void
    {
        parent::setUp();

        self::$reviews = [];
    }

    public function test_admin_shell_and_core_http_api_can_boot_in_the_same_host(): void
    {
        $this->get('/admin/evidence-risk-review')
            ->assertOk()
            ->assertSee('evidence-risk-review-admin-root')
            ->assertSee('api_base')
            ->assertSee('evidence-risk-review');

        $this->getJson('/evidence-risk-review/api/taxonomy')
            ->assertOk()
            ->assertJsonPath('0.key', 'official');

        $this->postJson('/evidence-risk-review/api/reviews', [
            'artifact_id' => 'artifact_host_1',
            'answer_text' => 'A cautious answer.',
            'claims' => [],
            'sources' => [],
            'profile' => 'clinical',
        ])
            ->assertCreated()
            ->assertJsonPath('review_id', 'rev_host_1');

        $this->getJson('/evidence-risk-review/api/reviews')
            ->assertOk()
            ->assertJsonPath('data.0.review_id', 'rev_host_1');
    }

    public function test_admin_shell_still_renders_when_core_api_is_unavailable(): void
    {
        config()->set('evidence-risk-review-admin.api_base', '/missing-core/api');

        $this->get('/admin/evidence-risk-review/settings')
            ->assertOk()
            ->assertSee('evidence-risk-review-admin-root')
            ->assertSee('missing-core');
    }
}
