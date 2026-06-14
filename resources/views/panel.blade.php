<!doctype html>
<html lang="en" data-theme="{{ $runtimeConfig['theme_default'] ?? 'dark' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Evidence Risk Review Admin</title>
    <script>
        window.__EVIDENCE_RISK_REVIEW_ADMIN__ = {{ Illuminate\Support\Js::from($runtimeConfig) }};
        try {
            var theme = localStorage.getItem('evr-theme') || window.__EVIDENCE_RISK_REVIEW_ADMIN__.theme_default || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
        } catch (error) {
            document.documentElement.setAttribute('data-theme', window.__EVIDENCE_RISK_REVIEW_ADMIN__.theme_default || 'dark');
        }
    </script>
    @php
        $assetPath = trim((string) ($runtimeConfig['asset_path'] ?? 'vendor/evidence-risk-review-admin'), '/');
        $manifestPath = public_path($assetPath.'/.vite/manifest.json');
        $manifest = is_file($manifestPath) ? json_decode((string) file_get_contents($manifestPath), true) : null;
        $entry = is_array($manifest) && isset($manifest['resources/js/main.tsx']) && is_array($manifest['resources/js/main.tsx'])
            ? $manifest['resources/js/main.tsx']
            : null;
    @endphp
    @if (is_array($entry) && isset($entry['css']) && is_array($entry['css']))
        @foreach ($entry['css'] as $css)
            <link rel="stylesheet" href="{{ asset($assetPath.'/'.$css) }}">
        @endforeach
    @endif
</head>
<body>
    <div id="evidence-risk-review-admin-root" data-testid="evr-admin-root">
        @unless (is_array($entry) && isset($entry['file']))
            <main data-testid="evr-admin-assets-missing" data-state="empty" aria-busy="false" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 720px; margin: 64px auto; padding: 24px; line-height: 1.5;">
                <h1 style="font-size: 24px; margin: 0 0 12px;">Evidence Risk Review Admin</h1>
                <p style="margin: 0 0 16px;">The admin bundle has not been built or published yet.</p>
                <code>npm install &amp;&amp; npm run build</code>
            </main>
        @endunless
    </div>
    @if (is_array($entry) && isset($entry['file']))
        <script type="module" src="{{ asset($assetPath.'/'.$entry['file']) }}"></script>
    @endif
</body>
</html>
