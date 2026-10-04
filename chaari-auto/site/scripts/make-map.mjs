// Builds the "Nos marchés" base map once (no map library ships to the browser):
//   public/map/markets.svg   land + market regions, filled in the site's blue steps (darker = smaller share)
//   src/data/map.json        viewBox size and the projected position of every city/marker used by the overlay
// Data: Natural Earth 1:110m via world-atlas. usage: node scripts/make-map.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const topo = JSON.parse(await readFile(new URL('../node_modules/world-atlas/countries-110m.json', import.meta.url), 'utf8'))
const countries = feature(topo, topo.objects.countries).features

// Extent: Canada (west) to the Gulf (east), the Arctic islands cut, Africa whole.
const [W0, E, S, N] = [-135, 62, -36, 72]
const rect = { type: 'Polygon', coordinates: [[[W0, S], [E, S], [E, N], [W0, N], [W0, S]].map(([x, y]) => [x, y])] }
// Densify the frame so its edges follow the projection's curves.
const ring = []
for (let x = W0; x <= E; x += 1) ring.push([x, S])
for (let y = S; y <= N; y += 1) ring.push([E, y])
for (let x = E; x >= W0; x -= 1) ring.push([x, N])
for (let y = N; y >= S; y -= 1) ring.push([W0, y])
rect.coordinates = [ring.reverse()] // d3 wants clockwise rings (else it is the complement)

const W = 1000
const proj = geoNaturalEarth1().rotate([-(W0 + E) / 2, 0]).fitWidth(W, rect)
const [[, y0], [, y1]] = geoPath(proj).bounds(rect)
const H = Math.ceil(y1 - y0)
proj.translate([proj.translate()[0], proj.translate()[1] - y0]).clipExtent([[0, 0], [W, H]])
const path = geoPath(proj).digits(0)

// ISO 3166-1 numeric codes.
const groups = {
  tunisia: ['788'],
  france: ['250'],
  canada: ['124'],
  gulf: ['682', '784', '634', '414', '048', '512'],
  africa: ['012', '024', '204', '072', '854', '108', '132', '120', '140', '148', '174', '178', '180', '262', '818', '226', '232', '748', '231', '266', '270', '288', '324', '624', '384', '404', '426', '430', '434', '450', '454', '466', '478', '480', '504', '508', '516', '562', '566', '646', '678', '686', '690', '694', '706', '710', '728', '729', '834', '768', '800', '894', '716', '732'],
}
const groupOf = (id) => (Object.values(groups).some((ids) => ids.includes(id)) ? 'market' : 'land')
// Every market region gets the same tone: the share is encoded by the overlay's bubble size, not by area (Africa would
// otherwise outweigh France). Fills are tuned for the dark surface (#151517).
const fill = { land: '#26262B', market: '#1C3D63' }
const d = Object.fromEntries(Object.keys(fill).map((g) => [g, '']))
for (const c of countries) {
  // France: metropolitan only (drop French Guiana, west of the Atlantic).
  const f = c.id === '250' ? { ...c, geometry: { type: 'MultiPolygon', coordinates: c.geometry.coordinates.filter((p) => p[0][0][0] > -10) } } : c
  d[groupOf(c.id)] += path(f) ?? ''
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${Object.entries(d).filter(([, v]) => v).map(([g, v]) => `<path fill="${fill[g]}" stroke="#151517" stroke-width="0.6" stroke-linejoin="round" d="${v}"/>`).join('\n')}
</svg>
`
await mkdir(new URL('../public/map/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/map/markets.svg', import.meta.url), svg)

const pt = (lng, lat) => proj([lng, lat]).map((v) => Math.round(v * 10) / 10)
const points = {
  stuttgart: pt(9.18, 48.78),
  genoa: pt(8.93, 44.41),
  france: pt(2.35, 48.86), // Paris
  tunisia: pt(10.18, 36.8), // Tunis
  canada: pt(-73.57, 45.5), // Montréal
  gulf: pt(55.27, 25.2), // Dubaï
  africa: pt(-1.5, 12.4), // West Africa (region marker, not a city)
}
await writeFile(new URL('../src/data/map.json', import.meta.url), JSON.stringify({ w: W, h: H, points }, null, 2) + '\n')
console.log(`✓ map ${W}×${H}, ${(svg.length / 1024).toFixed(0)} KB`, points)
