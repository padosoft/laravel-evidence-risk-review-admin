<?php

declare(strict_types=1);

namespace Padosoft\EvidenceRiskReviewAdmin\Tests\Architecture;

use PHPUnit\Framework\TestCase;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use SplFileInfo;

final class StandaloneAgnosticTest extends TestCase
{
    /**
     * @var list<string>
     */
    private const FORBIDDEN_NEEDLES = [
        'AskMyDocs',
        'lopadova/askmydocs',
        'padosoft/askmydocs',
        'KnowledgeDocument',
        'KbSearchService',
        'knowledge_documents',
        'knowledge_chunks',
        'kb_nodes',
        'kb_edges',
        'kb_canonical_audit',
    ];

    public function test_package_sources_do_not_reference_host_specific_symbols(): void
    {
        $root = dirname(__DIR__, 2);
        $paths = [
            $root.'/src',
            $root.'/config',
            $root.'/routes',
            $root.'/resources/views',
        ];

        foreach ($this->files($paths) as $file) {
            $contents = (string) file_get_contents($file);

            foreach (self::FORBIDDEN_NEEDLES as $needle) {
                self::assertStringNotContainsString($needle, $contents, sprintf('%s leaked into %s', $needle, $file));
            }
        }
    }

    public function test_composer_dependencies_do_not_reference_host_packages(): void
    {
        $composer = json_decode((string) file_get_contents(dirname(__DIR__, 2).'/composer.json'), true, flags: JSON_THROW_ON_ERROR);
        self::assertIsArray($composer);

        $dependencies = array_merge(
            $this->stringKeys($composer['require'] ?? []),
            $this->stringKeys($composer['require-dev'] ?? []),
            $this->stringKeys($composer['suggest'] ?? []),
        );

        foreach ($dependencies as $dependency) {
            foreach (self::FORBIDDEN_NEEDLES as $needle) {
                self::assertStringNotContainsString($needle, $dependency);
            }
        }
    }

    /**
     * @param  list<string>  $paths
     * @return list<string>
     */
    private function files(array $paths): array
    {
        $files = [];

        foreach ($paths as $path) {
            if (! is_dir($path)) {
                continue;
            }

            $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));

            foreach ($iterator as $file) {
                if (! $file instanceof SplFileInfo || ! $file->isFile()) {
                    continue;
                }

                $files[] = $file->getPathname();
            }
        }

        sort($files);

        return $files;
    }

    /**
     * @return list<string>
     */
    private function stringKeys(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return array_values(array_filter(array_keys($value), 'is_string'));
    }
}
