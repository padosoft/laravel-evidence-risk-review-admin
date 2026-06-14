<?php

declare(strict_types=1);

$middleware = array_values(array_filter(
    array_map('trim', explode(',', (string) env('EVR_ADMIN_MIDDLEWARE', 'web,auth'))),
    static fn (string $name): bool => $name !== ''
));

return [
    'mount_prefix' => env('EVR_ADMIN_PREFIX', 'admin/evidence-risk-review'),
    'middleware' => $middleware !== [] ? $middleware : ['web'],
    'api_base' => env('EVR_ADMIN_API_BASE', '/evidence-risk-review/api'),
    'theme_default' => env('EVR_ADMIN_THEME', 'dark'),
    'asset_path' => env('EVR_ADMIN_ASSET_PATH', 'vendor/evidence-risk-review-admin'),
];
