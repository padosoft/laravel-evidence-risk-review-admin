<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Unit;

use PHPUnit\Framework\TestCase;

final class ConfigDefaultsTest extends TestCase
{
    public function test_default_config_values_are_stable(): void
    {
        $config = require __DIR__.'/../../config/evidence-risk-review-admin.php';

        self::assertSame('admin/evidence-risk-review', $config['mount_prefix']);
        self::assertSame(['web', 'auth'], $config['middleware']);
        self::assertSame('/evidence-risk-review/api', $config['api_base']);
        self::assertSame('dark', $config['theme_default']);
        self::assertSame('vendor/evidence-risk-review-admin', $config['asset_path']);
    }
}
