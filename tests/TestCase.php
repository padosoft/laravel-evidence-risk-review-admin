<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests;

use Orchestra\Testbench\TestCase as Orchestra;
use Padosoft\EvidenceRiskReviewAdmin\EvidenceRiskReviewAdminServiceProvider;

abstract class TestCase extends Orchestra
{
    /**
     * @return list<class-string>
     */
    protected function getPackageProviders($app): array
    {
        return [
            EvidenceRiskReviewAdminServiceProvider::class,
        ];
    }

    protected function defineEnvironment($app): void
    {
        $app['config']->set('app.key', 'base64:YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWE=');
        $app['config']->set('app.cipher', 'AES-256-CBC');
    }
}
