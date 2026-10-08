import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-palette-lighter bg-palette-lighter font-primary">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-palette-dark">{process.env.siteTitle}</Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">Discover new favourites. Explore our collections and find something that feels like you.</p>
          </div>
          <nav aria-label="Shopping links" className="flex flex-col items-start gap-3 text-sm text-gray-600">
            <h2 className="mb-1 text-base font-semibold text-palette-dark">Explore</h2>
            <Link href="/" className="hover:text-palette-primary hover:underline">Home</Link>
            <Link href="/shop" className="hover:text-palette-primary hover:underline">Shop All</Link>
            <Link href="/collections" className="hover:text-palette-primary hover:underline">All Collections</Link>
            <Link href="/about" className="hover:text-palette-primary hover:underline">Our Story</Link>
          </nav>
          <nav aria-label="Customer care" className="flex flex-col items-start gap-3 text-sm text-gray-600">
            <h2 className="mb-1 text-base font-semibold text-palette-dark">Customer Care</h2>
            <Link href="/faq" className="hover:text-palette-primary hover:underline">FAQ</Link>
            <Link href="/shipping" className="hover:text-palette-primary hover:underline">Shipping &amp; Delivery</Link>
            <Link href="/returns" className="hover:text-palette-primary hover:underline">Returns &amp; Exchanges</Link>
            <Link href="/contact" className="hover:text-palette-primary hover:underline">Contact Us</Link>
          </nav>
          <div className="text-sm text-gray-600">
            <h2 className="mb-4 text-base font-semibold text-palette-dark">Let's keep in touch</h2>
            <p className="mb-3 leading-relaxed">Questions about a product or an order? We'd love to hear from you.</p>
            <a href="mailto:info@fridacai.io" className="text-palette-primary underline">info@fridacai.io</a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-palette-light pt-6 text-xs text-gray-600">
          <p>© Fridacai. All rights reserved.</p>
          <Link href="/cart" className="hover:text-palette-primary hover:underline">View your cart →</Link>
        </div>
      </div>
    </footer>
  )
}
