// Renders the React app to static HTML so crawlers and AI engines get the full content without running JS.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(dist, '.server')

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('index.html is missing the <!--app-html--> placeholder')

await writeFile(path.join(dist, 'index.html'), template.replace('<!--app-html-->', render()))
await rm(serverDir, { recursive: true, force: true })
console.log('✓ prerendered dist/index.html')
