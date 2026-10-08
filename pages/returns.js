import Link from 'next/link'
import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'

export default function ReturnsPage() {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`Returns & Exchanges | ${process.env.siteTitle}`} />
      <PageTitle text="Returns & Exchanges" />
      <div className="mt-8 space-y-8 text-lg leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Ask about a return or exchange</h2>
          <p>Email <a href="mailto:info@fridacai.io" className="text-palette-primary underline">info@fridacai.io</a> with your order number, the item you want to return or exchange, and the reason for your request.</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Before sending an item back</h2>
          <p>Contact us for return instructions and the appropriate return address. Ask us to confirm the applicable return conditions, any shipping costs, and the next steps for your order before posting an item.</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Damaged or incorrect items</h2>
          <p>If an item arrives damaged or does not match your order, include a description and photos of the item and packaging in your email so the issue can be reviewed.</p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-palette-dark">Questions before you buy</h2>
          <p>Return eligibility, deadlines, return shipping costs, and refund timing need to be confirmed for your order. Contact us before purchasing if these details affect your decision.</p>
        </section>
        <Link href="/contact" className="inline-block rounded-sm border border-palette-primary px-6 py-3 font-semibold text-palette-primary hover:bg-palette-lighter focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2">Contact us about a return</Link>
      </div>
    </div>
  )
}
