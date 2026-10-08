import Link from 'next/link'
import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'

export default function FaqPage() {
  return (
    <div className="pb-12 font-primary">
      <SEO title={`FAQ | ${process.env.siteTitle}`} />
      <PageTitle text="Frequently Asked Questions" />
      <p className="mt-4 mb-8 text-center text-lg text-gray-600">A little help before you check out.</p>
      <div className="divide-y divide-palette-lighter border-t border-b border-palette-lighter text-gray-600">
        <details className="py-5" open>
          <summary className="cursor-pointer text-xl font-semibold text-palette-dark">How do I place an order?</summary>
          <p className="pt-4 leading-relaxed">Open a product, select your variant and quantity, then choose Add To Cart. Review your cart and continue to checkout to enter your delivery and payment details.</p>
        </details>
        <details className="py-5">
          <summary className="cursor-pointer text-xl font-semibold text-palette-dark">Can I change my cart?</summary>
          <p className="pt-4 leading-relaxed">Yes. Open the cart to change quantities or remove items before you proceed to checkout.</p>
        </details>
        <details className="py-5">
          <summary className="cursor-pointer text-xl font-semibold text-palette-dark">Which payment methods can I use?</summary>
          <p className="pt-4 leading-relaxed">Available payment options are displayed at checkout. Review them before confirming your order.</p>
        </details>
        <details className="py-5">
          <summary className="cursor-pointer text-xl font-semibold text-palette-dark">How much does shipping cost?</summary>
          <p className="pt-4 leading-relaxed">Enter your delivery address at checkout to see available shipping options and costs before you pay. See our <Link href="/shipping" className="text-palette-primary underline">shipping and delivery information</Link> for more guidance.</p>
        </details>
        <details className="py-5">
          <summary className="cursor-pointer text-xl font-semibold text-palette-dark">How do I ask about a return or exchange?</summary>
          <p className="pt-4 leading-relaxed">Visit our <Link href="/returns" className="text-palette-primary underline">returns and exchanges page</Link> for contact details and the information to include with your request.</p>
        </details>
        <details className="py-5">
          <summary className="cursor-pointer text-xl font-semibold text-palette-dark">How can I get help with an order?</summary>
          <p className="pt-4 leading-relaxed">Keep your order confirmation and order number handy. Visit our <Link href="/contact" className="text-palette-primary underline">contact page</Link> for guidance on order enquiries.</p>
        </details>
      </div>
    </div>
  )
}
