import Link from 'next/link'

function StoreHeading({ image }) {
  return (
    <section className="my-8 grid overflow-hidden rounded-2xl bg-palette-lighter md:grid-cols-2">
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-palette-primary">The Fridacai edit</p>
        <h1 className="text-4xl font-bold leading-tight text-palette-dark sm:text-5xl">Find your next favourite.</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">Explore our collections, discover something new, and make it yours.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/shop" className="rounded-md bg-palette-primary px-6 py-3 font-semibold text-white hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2">Shop all products</Link>
          <Link href="/collections" className="rounded-md border border-palette-primary px-6 py-3 font-semibold text-palette-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2">Explore collections</Link>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white p-8">
        <img src={image.originalSrc} alt={image.altText || 'Discover the Fridacai collection'} width="640" height="640" className="h-72 w-full object-contain md:h-96" fetchPriority="high" />
      </div>
    </section>
  )
}

export default StoreHeading
