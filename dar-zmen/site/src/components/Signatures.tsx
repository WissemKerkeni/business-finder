import { Photo, SectionTitle } from './ui'
import { signatures } from '../data/restaurant'

export default function Signatures() {
  const [first, ...rest] = signatures
  const Fig = ({ s, n, aspect, className = '', sizes }: { s: (typeof signatures)[number]; n: number; aspect: string; className?: string; sizes: string }) => (
    <figure className={className}>
      <div className={`zoom overflow-hidden ${aspect}`}>
        <Photo id={s.photo} alt={s.alt} className="h-full w-full object-cover" sizes={sizes} />
      </div>
      <figcaption className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-xs text-cobalt">{String(n).padStart(2, '0')}</span>
        <span className="font-serif text-xl text-ink md:text-[22px]">{s.name}</span>
      </figcaption>
    </figure>
  )
  return (
    <section aria-labelledby="table-title" className="border-t border-line px-5 py-24 md:px-14 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="02 — On the table" id="table-title">Plates from the <i>old days</i></SectionTitle>
          <p className="eyebrow text-ink/60">Main dishes come with bread &amp; salad</p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Fig s={first} n={1} aspect="aspect-[4/5]" className="md:col-span-6" sizes="(min-width: 768px) 45vw, 100vw" />
          <div className="grid grid-cols-2 content-start gap-x-5 gap-y-10 md:col-span-6 md:gap-x-10">
            <Fig s={rest[0]} n={2} aspect="aspect-[3/4]" className="md:mt-24" sizes="(min-width: 768px) 22vw, 50vw" />
            <Fig s={rest[1]} n={3} aspect="aspect-[3/4]" sizes="(min-width: 768px) 22vw, 50vw" />
            <Fig s={rest[2]} n={4} aspect="aspect-[16/10]" className="col-span-2" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
