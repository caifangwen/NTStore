import Link from 'next/link'
import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'

export default function ShippingPage() {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`Shipping & Delivery | ${process.env.siteTitle}`} />
      <PageTitle text="Shipping & Delivery" />
      <div className="mt-8 space-y-8 text-lg leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Delivery options and costs</h2>
          <p>Enter your delivery address at checkout to see the shipping options available for your order and any shipping charges. Review the order total before completing payment.</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Delivery availability and timing</h2>
          <p>If you need an item by a particular date, or want to check delivery to your location, email <a href="mailto:info@fridacai.io" className="text-palette-primary underline">info@fridacai.io</a> before ordering. Include your destination and the products you are interested in.</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Help with a delivery</h2>
          <p>For an existing order, include your order number and any tracking details in your message. Let us know if your delivery address needs correcting or if an item arrives damaged.</p>
        </section>
        <Link href="/contact" className="inline-block rounded-sm border border-palette-primary px-6 py-3 font-semibold text-palette-primary hover:bg-palette-lighter focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2">Contact us about shipping</Link>
      </div>
    </div>
  )
}
