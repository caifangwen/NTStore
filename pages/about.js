import Link from 'next/link'
import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'

export default function AboutPage() {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`About Us | ${process.env.siteTitle}`} />
      <PageTitle text="About Us" />
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-600">
        <p className="text-2xl font-semibold text-palette-dark">Welcome to {process.env.siteTitle}.</p>
        <p>Explore our collection, compare your options, and find something you love. Each product page brings together its description, images, and available variants so you can choose with confidence.</p>
        <p>Keep your favourites in your cart while you browse, then review your order before completing checkout.</p>
        <p>Have a question before you buy? Visit our <Link href="/faq" className="text-palette-primary underline">frequently asked questions</Link> or <Link href="/contact" className="text-palette-primary underline">contact us</Link>.</p>
        <Link href="/" className="inline-block rounded-sm bg-palette-primary px-6 py-3 font-semibold text-white hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2">Explore the collection</Link>
      </div>
    </div>
  )
}
