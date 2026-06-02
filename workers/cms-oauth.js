/**
 * Cloudflare Worker — OAuth proxy for Sveltia/Decap CMS + GitHub
 *
 * ENV variables required (set in Worker Settings → Variables):
 *   GITHUB_CLIENT_ID      — from GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  — from GitHub OAuth App
 *
 * Endpoints:
 *   GET /auth             — redirects browser to GitHub OAuth
 *   GET /callback         — exchanges code → token, sends postMessage to CMS
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* ── /auth ─────────────────────────────────────── */
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id:    env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope:        'repo,user',
        state:        url.searchParams.get('state') ?? '',
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    /* ── /callback ─────────────────────────────────── */
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id:     env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();
      if (data.error) {
        return new Response(`GitHub OAuth error: ${data.error_description}`, { status: 400 });
      }

      const payload = JSON.stringify({ token: data.access_token, provider: 'github' });

      const html = `<!DOCTYPE html>
<html><head><title>Авторизация...</title></head>
<body><script>
(function () {
  var payload = ${JSON.stringify(payload)};
  function onMessage(e) {
    window.opener.postMessage('authorization:github:success:' + payload, e.origin);
  }
  window.addEventListener('message', onMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
    }

    return new Response('CMS OAuth proxy — OK', { status: 200 });
  },
};
