import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CollectionListings from '@/components/CollectionListings'
import { getCollections } from '@/lib/shopify'

export default function CollectionsPage({ collections }) {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`Collections | ${process.env.siteTitle}`} />
      <PageTitle text="Explore Our Collections" />
      <p className="mb-10 text-center text-gray-600">Find your next favourite, one collection at a time.</p>
      <CollectionListings collections={collections} />
      {!collections.length && <p className="text-center text-gray-600">New collections are on the way. Browse Shop All to see our products.</p>}
    </div>
  )
}

export async function getStaticProps() {
  return { props: { collections: await getCollections() }, revalidate: 60 }
}
