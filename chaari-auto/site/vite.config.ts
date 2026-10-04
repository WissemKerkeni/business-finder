import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { headTags, llmsTxt, robotsTxt, sitemapXml } from './src/seo/seo.ts'
import { langFromPath } from './src/i18n.tsx'

/** Dev: injects the meta tags + JSON-LD of the requested page (/ or /en/) into index.html. Build: leaves <!--app-head-->
 *  for scripts/prerender.mjs, which writes one page per language. Emits robots.txt, sitemap.xml and llms.txt. */
function seo(siteUrl: string): Plugin {
  const files = () => ({
    'robots.txt': robotsTxt(siteUrl),
    'sitemap.xml': sitemapXml(siteUrl, new Date().toISOString().slice(0, 10)),
    'llms.txt': llmsTxt(siteUrl),
  })
  return {
    name: 'chaari-auto-seo',
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html
      const lang = langFromPath(ctx.originalUrl ?? '/')
      return html.replace('<!--app-head-->', headTags(siteUrl, lang)).replace('<html lang="fr">', `<html lang="${lang}">`)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const body = files()[req.url?.slice(1) as keyof ReturnType<typeof files>]
        if (!body) return next()
        res.setHeader('Content-Type', req.url!.endsWith('.xml') ? 'application/xml' : 'text/plain; charset=utf-8')
        res.end(body)
      })
    },
    generateBundle(options) {
      if (this.environment?.config.build.ssr || (options as { format?: string }).format === 'cjs') return
      for (const [fileName, source] of Object.entries(files())) this.emitFile({ type: 'asset', fileName, source })
    },
  }
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.SITE_URL || 'https://example.com').replace(/\/$/, '')
  if (!env.SITE_URL && mode === 'production' && !isSsrBuild) {
    console.warn('\n⚠  SITE_URL is not set: canonical, sitemap and JSON-LD URLs will use https://example.com. Set it in .env before deploying.\n')
  }
  return {
    plugins: [react(), tailwindcss(), seo(siteUrl)],
    build: { cssMinify: true },
  }
})
