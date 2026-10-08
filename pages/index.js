import StoreHeading from '@/components/StoreHeading'
import ProductListings from '@/components/ProductListings'
import CollectionListings from '@/components/CollectionListings'
import Link from 'next/link'
import { getAllProductsInCollection, getCollections } from '@/lib/shopify'

function IndexPage({ products, collections }) {

  return (
    <div className="pb-12 font-primary">
      <StoreHeading image={products[0]?.node.images.edges[0].node || { originalSrc: '/images/product-placeholder.svg', altText: 'Fridacai' }} />
      <section className="py-10" aria-labelledby="collections-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">Discover your edit</p>
            <h2 id="collections-heading" className="text-3xl font-semibold text-palette-dark">Shop by collection</h2>
          </div>
          <Link href="/collections" className="text-palette-primary underline">View all collections →</Link>
        </div>
        <CollectionListings collections={collections.slice(0, 6)} />
      </section>
      <section className="pt-8" aria-labelledby="featured-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">A little inspiration</p>
            <h2 id="featured-heading" className="text-3xl font-semibold text-palette-dark">Explore the collection</h2>
          </div>
          <Link href="/shop" className="text-palette-primary underline">Shop all products →</Link>
        </div>
        <ProductListings products={products.slice(0, 6)} />
      </section>
      <section className="grid gap-6 rounded-2xl border border-palette-lighter p-6 sm:p-8 md:grid-cols-3">
        <div><h2 className="mb-2 text-xl font-semibold text-palette-dark">Discover your style</h2><p className="text-gray-600">Browse individual collections or explore the whole store.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-palette-dark">Shop with confidence</h2><p className="text-gray-600">Review your cart and delivery options before completing checkout.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-palette-dark">A little help?</h2><p className="text-gray-600">Questions about a product? <Link href="/contact" className="text-palette-primary underline">Get in touch</Link>.</p></div>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const [products, collections] = await Promise.all([getAllProductsInCollection(), getCollections()])

  return {
    props: {
      products,
      collections,
    },
    revalidate: 60,
  }
}

export default IndexPage
