import Link from 'next/link'

export default function CollectionListings({ collections }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map(collection => (
        <Link key={collection.id} href={`/collections/${collection.handle}`} className="group overflow-hidden rounded-2xl border border-palette-lighter bg-white focus:outline-none focus:ring-2 focus:ring-palette-primary">
          <div className="h-64 overflow-hidden bg-gray-50">
            <img src={collection.image.url} alt={collection.image.altText || collection.title} className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" loading="lazy" width="640" height="640" />
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <h3 className="text-xl font-semibold text-palette-dark">{collection.title}</h3>
            <span aria-hidden="true" className="text-2xl text-palette-primary">→</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
