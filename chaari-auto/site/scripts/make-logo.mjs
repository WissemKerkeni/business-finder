// Builds the logo assets from the owner's logo (../brand/logo-source.webp, white background). The site uses the car
// alone (owner's choice, 2026-10-04); the CHAARI AUTO wordmark beside it is live text (LogoLockup in ui.tsx).
//   public/logo/mark-{96,192,384}.webp   the car, trimmed                       → header, footer, hero, CTA
//   public/logo/logo.png                  the car centred on a white square     → JSON-LD logo
//   public/favicon.ico (16/32/48), favicon-{32,48,96,192,512}.png, apple-touch-icon.png → icons
// usage: node scripts/make-logo.mjs
import sharp from 'sharp'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const SRC = new URL('../../brand/logo-source.webp', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const white = { r: 255, g: 255, b: 255, alpha: 1 }
await rm(out('logo'), { recursive: true, force: true })
await mkdir(out('logo'), { recursive: true })

// Measured on the source (1416×1111): the car spans 258..1193 × 150..784; the wordmark below it starts at y=831.
const car = { left: 258, top: 140, width: 936, height: 660 }

// Two passes: sharp would run trim() before extract() in a single pipeline.
const carBuf = await sharp(SRC).extract(car).toBuffer()
const carImg = () => sharp(carBuf).trim({ background: '#ffffff', threshold: 20 })
for (const h of [96, 192, 384]) await carImg().resize({ height: h }).webp({ quality: 90 }).toFile(out(`logo/mark-${h}.webp`))

// Square images: the car centred on white with a small margin.
const square = async (size, file) => {
  const inner = Math.round(size * 0.86)
  const buf = await carImg().resize(inner, inner, { fit: 'contain', background: white }).toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: white } }).composite([{ input: buf, gravity: 'center' }]).png({ palette: true, compressionLevel: 9 }).toFile(out(file))
}
await square(600, 'logo/logo.png')
// Google Search shows a favicon only if it is square and a multiple of 48 px (48, 96, 192…); it also asks for /favicon.ico.
for (const s of [32, 48, 96, 192, 512]) await square(s, `favicon-${s}.png`)
await square(180, 'apple-touch-icon.png')

// favicon.ico with 16, 32 and 48 px images, stored as PNG inside the ICO container (supported everywhere since Vista).
const icoSizes = [16, 32, 48]
const pngs = []
for (const s of icoSizes) {
  const inner = Math.round(s * 0.92)
  const buf = await carImg().resize(inner, inner, { fit: 'contain', background: white }).toBuffer()
  pngs.push(await sharp({ create: { width: s, height: s, channels: 4, background: white } }).composite([{ input: buf, gravity: 'center' }]).png().toBuffer())
}
const header = Buffer.alloc(6 + 16 * pngs.length)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(pngs.length, 4)
let offset = header.length
pngs.forEach((png, i) => {
  const e = 6 + 16 * i
  header.writeUInt8(icoSizes[i], e) // width
  header.writeUInt8(icoSizes[i], e + 1) // height
  header.writeUInt16LE(1, e + 4) // colour planes
  header.writeUInt16LE(32, e + 6) // bits per pixel
  header.writeUInt32LE(png.length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += png.length
})
await writeFile(out('favicon.ico'), Buffer.concat([header, ...pngs]))
console.log('✓ logo assets')
