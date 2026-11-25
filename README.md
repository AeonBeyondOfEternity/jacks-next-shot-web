# Jack's Next Shot — Official Website & Legal Portal

Public static website for **Jack's Next Shot** by **Braveris Inc.** (`com.braverisinc.jacksnextshot`), hosted on GitHub Pages.

## Pages

- **Homepage**: `/`
- **Privacy Policy**: `/privacy-policy/`
- **Terms of Service**: `/terms/`
- **Support**: `/support/`
- **Custom 404**: `/404.html`

Live project URL (GitHub Pages): `https://AeonBeyondOfEternity.github.io/jacks-next-shot-web/`

## Enabling GitHub Pages (GitHub Actions)

1. Open **Settings → Pages** in `AeonBeyondOfEternity/jacks-next-shot-web`.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Ensure **Enforce HTTPS** is enabled once the site certificate is provisioned.
4. Any push to `main` triggers `.github/workflows/deploy-pages.yml` automatically.

## Local Preview

Serve the repository root under a `/jacks-next-shot-web/` mount or directly via any static HTTP server (`npx serve .`). All page navigation uses relative paths and `/404.html` uses the `/jacks-next-shot-web/` project base path so links remain valid across subpaths.
