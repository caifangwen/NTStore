import Link from 'next/link'
import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'

export default function ContactPage() {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`Contact Us | ${process.env.siteTitle}`} />
      <PageTitle text="Contact Us" />
      <div className="mt-8 space-y-8 text-lg leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Email us</h2>
          <p>For product questions or help with an order, email <a href="mailto:info@fridacai.io" className="text-palette-primary underline">info@fridacai.io</a>.</p>
        </section>
        <section className="rounded-sm border border-palette-lighter bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Questions about an order?</h2>
          <p>Include your order number and a short description of your question in your email so your order can be identified.</p>
          <p className="mt-4">For a delivery question, include any tracking information you received. For an item issue, describe the problem and include a photo if possible.</p>
          <p className="mt-4 text-base">Please keep payment card details and passwords out of your message.</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Before you order</h2>
          <p>Browse our <Link href="/faq" className="text-palette-primary underline">frequently asked questions</Link>, <Link href="/shipping" className="text-palette-primary underline">shipping information</Link>, and <Link href="/returns" className="text-palette-primary underline">returns and exchanges guidance</Link> before ordering.</p>
        </section>
        <Link href="/" className="inline-block rounded-sm border border-palette-primary px-6 py-3 font-semibold text-palette-primary hover:bg-palette-lighter focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2">Continue shopping</Link>
      </div>
    </div>
  )
}
