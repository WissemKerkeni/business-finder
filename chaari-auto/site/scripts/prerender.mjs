// Renders the React app to static HTML, once per language, so crawlers and AI engines get the full content without
// running JS: dist/index.html (French, /) and dist/en/index.html (English, /en/), each with its own head (title,
// description, canonical, hreflang, JSON-LD) and <html lang>.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import { loadEnv } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(dist, '.server')
const siteUrl = (loadEnv('production', root, '').SITE_URL || 'https://example.com').replace(/\/$/, '')

const { render, headTags } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
for (const mark of ['<!--app-html-->', '<!--app-head-->', '<html lang="fr">'])
  if (!template.includes(mark)) throw new Error(`index.html is missing ${mark}`)

for (const [lang, file] of [['fr', 'index.html'], ['en', 'en/index.html']]) {
  const html = template
    .replace('<html lang="fr">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', headTags(siteUrl, lang))
    .replace('<!--app-html-->', render(lang))
  await mkdir(path.dirname(path.join(dist, file)), { recursive: true })
  await writeFile(path.join(dist, file), html)
  console.log(`✓ prerendered dist/${file} (${siteUrl}${lang === 'fr' ? '/' : '/en/'})`)
}
await rm(serverDir, { recursive: true, force: true })
