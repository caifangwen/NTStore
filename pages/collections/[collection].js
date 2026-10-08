import Link from 'next/link'
import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import ProductListings from '@/components/ProductListings'
import { getCollections, getAllProductsInCollection } from '@/lib/shopify'

export default function CollectionPage({ collection, products }) {
  return (
    <div className="pb-12 font-primary">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-gray-600">
        <Link href="/collections" className="text-palette-primary hover:underline">Collections</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page">{collection.title}</span>
      </nav>
      <SEO title={`${collection.title} | ${process.env.siteTitle}`} />
      <PageTitle text={collection.title} />
      {collection.description && <p className="text-center leading-relaxed text-gray-600">{collection.description}</p>}
      <p className="mt-4 text-center text-sm text-gray-500">{products.length} products</p>
      <ProductListings products={products} />
      {!products.length && <p className="text-center text-gray-600">This collection is currently empty. <Link href="/shop" className="text-palette-primary underline">Explore all products</Link>.</p>}
    </div>
  )
}

export async function getStaticPaths() {
  const collections = await getCollections()
  return { paths: collections.map(item => ({ params: { collection: item.handle } })), fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const collection = (await getCollections()).find(item => item.handle === params.collection)
  if (!collection) return { notFound: true, revalidate: 60 }
  return { props: { collection, products: await getAllProductsInCollection(params.collection) }, revalidate: 60 }
}
