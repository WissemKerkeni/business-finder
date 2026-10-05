// Adds the photos the owner sent on WhatsApp (2026-10-04) to public/photos/ and src/data/photos.json, without touching
// the existing photos (optimize_photos.py rebuilds everything from ../_scratch/kept/, which is not kept in the repo).
// Same output as optimize_photos.py: long side ≤ 1600, WebP q82 at 640/1024/1600 (never upscaled).
// Readable third-party plates in the background are pixelated first. The CHAARI AUTO plate holders are the business's
// sign; the rear plate holders are empty. Skipped: the Porsche cockpit with the driver's legs and the odometer, and two
// near-duplicates with a parked car's plate in the background.
// usage: node scripts/owner-photos.mjs "C:/Users/…/Downloads/ChaariAuto"
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'

const SRC = process.argv[2]
if (!SRC) throw new Error('usage: node scripts/owner-photos.mjs <folder with the WhatsApp images>')
const path = (f) => new URL(`../${f}`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const img = (t) => `${SRC}/WhatsApp Image 2026-10-04 at ${t}.jpeg`

// car id → its photos in order (the first one is the gallery card, so landscape). pix: [left, top, width, height] in source px.
const cars = {
  'mercedes-gle-coupe': ['18.32.05 (9)', '18.32.05 (8)', '18.32.05 (10)'],
  'porsche-cayenne-coupe': ['18.32.04 (5)', '18.32.04 (1)', '18.32.04', '18.32.04 (3)', '18.32.04 (2)'],
  'audi-rs-q3-sportback': ['18.32.05', { file: '18.32.04 (7)', pix: [[1530, 195, 100, 55], [1850, 195, 140, 60]] }],
  'jeep-wrangler-rubicon': ['18.32.05 (5)', '18.32.05 (6)', '18.32.05 (4)', '18.32.05 (7)'],
  'cupra-formentor': ['18.32.05 (3)', '18.32.05 (2)'],
  'audi-q5': ['18.32.02', '18.32.03', '18.32.03 (1)'],
}

const pixelate = async (buf, [left, top, width, height]) => {
  // Two passes: sharp keeps only the last resize() of a pipeline.
  const small = await sharp(buf).extract({ left, top, width, height }).resize(Math.max(1, Math.round(width / 14))).toBuffer()
  const block = await sharp(small).resize(width, height, { kernel: 'nearest', fit: 'fill' }).toBuffer()
  return sharp(buf).composite([{ input: block, left, top }]).toBuffer()
}

const meta = JSON.parse(await readFile(path('src/data/photos.json'), 'utf8'))
let bytes = 0
for (const [id, list] of Object.entries(cars)) {
  for (const [k, entry] of list.entries()) {
    const { file, pix = [] } = typeof entry === 'string' ? { file: entry } : entry
    let buf = await sharp(img(file)).rotate().toBuffer()
    for (const r of pix) buf = await pixelate(buf, r)
    buf = await sharp(buf).resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).toBuffer()
    const { width: w, height: h } = await sharp(buf).metadata()
    const widths = [640, 1024, 1600].filter((x) => x <= w)
    if (!widths.includes(w) && w < 1600) widths.push(w)
    const key = `${id}-${k + 1}`
    for (const x of widths) {
      const info = await sharp(buf).resize(x).webp({ quality: 82, effort: 6 }).toFile(path(`public/photos/${key}-${x}.webp`))
      bytes += info.size
    }
    meta[key] = { w, h, widths: widths.sort((a, b) => a - b) }
  }
}
await writeFile(path('src/data/photos.json'), JSON.stringify(meta, null, 1))
console.log(`✓ ${Object.values(cars).flat().length} photos, ${Math.round(bytes / 1024)} KB`)
