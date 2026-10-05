// Builds the logo assets from the owner's logo (../brand/logo-source.webp, white background). The site uses the car
// alone (owner's choice, 2026-10-04); the CHAARI AUTO wordmark beside it is live text (LogoLockup in ui.tsx).
//   public/logo/mark-{96,192,384}.webp   the car, trimmed, transparent around it → header, footer, hero, CTA (dark)
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

// The site is dark, so the marks have no white plate (owner's request, 2026-10-05): the white background around the car
// becomes transparent, the white body stays. Flood fill from the border through light pixels; the anti-aliased fringe
// of the black outline becomes black with partial alpha, so the edge stays clean on any dark colour.
const cut = async () => {
  const { data, info } = await carImg().ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const lum = (i) => (data[i * 4] * 299 + data[i * 4 + 1] * 587 + data[i * 4 + 2] * 114) / 1000
  const seen = new Uint8Array(w * h)
  const stack = []
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x)
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1)
  while (stack.length) {
    const i = stack.pop()
    if (seen[i] || lum(i) < 110) continue
    seen[i] = 1
    const x = i % w
    if (x > 0) stack.push(i - 1)
    if (x < w - 1) stack.push(i + 1)
    if (i >= w) stack.push(i - w)
    if (i < w * (h - 1)) stack.push(i + w)
  }
  for (let i = 0; i < w * h; i++) {
    if (!seen[i]) continue
    const a = Math.max(0, Math.min(255, Math.round(255 - lum(i) * 1.1)))
    data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = 0
    data[i * 4 + 3] = a
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer()
}
const carCut = await cut()
for (const h of [96, 192, 384]) await sharp(carCut).resize({ height: h }).webp({ quality: 90, alphaQuality: 100 }).toFile(out(`logo/mark-${h}.webp`))

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
