import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import ProductListings from '@/components/ProductListings'
import { getAllProductsInCollection } from '@/lib/shopify'

export default function ShopPage({ products }) {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`Shop All | ${process.env.siteTitle}`} />
      <PageTitle text="Shop All" />
      <p className="text-center text-gray-600">Explore the full collection. {products.length} products to discover.</p>
      <ProductListings products={products} />
    </div>
  )
}

export async function getStaticProps() {
  return { props: { products: await getAllProductsInCollection('') }, revalidate: 60 }
}
