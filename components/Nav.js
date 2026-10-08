import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCartContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const links = [['/', 'Home'], ['/shop', 'Shop All'], ['/collections', 'Collections'], ['/about', 'About Us'], ['/contact', 'Contact']]

export default function Nav() {
  const router = useRouter()
  const cartItems = useCartContext()[0].reduce((total, item) => total + Number(item.variantQuantity), 0)

  return (
    <header className="sticky top-0 z-20 border-b border-palette-lighter bg-white font-primary">
      <div className="bg-palette-lighter px-6 py-2 text-center text-xs text-palette-dark">
        Need a hand? <a href="mailto:info@fridacai.io" className="underline">info@fridacai.io</a>
      </div>
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-palette-dark" aria-label="Fridacai home">
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-palette-primary text-xl font-bold text-white">F</span>
          <span className="text-2xl font-bold tracking-tight">{process.env.siteTitle}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {links.map(([href, label]) => <Link key={href} href={href} aria-current={router.pathname === href || (href === '/collections' && router.pathname.startsWith('/collections')) ? 'page' : undefined} className="text-palette-dark hover:text-palette-primary hover:underline">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-6">
          <details className="lg:hidden">
            <summary className="cursor-pointer rounded-md border border-palette-lighter px-3 py-2 text-sm text-palette-primary">Menu</summary>
            <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full flex flex-col border-b border-palette-lighter bg-white px-6 py-4 shadow-lg">
              {links.map(([href, label]) => <Link key={href} href={href} onClick={event => { event.currentTarget.closest('details').open = false }} className="rounded-md px-3 py-3 text-palette-dark hover:bg-palette-lighter">{label}</Link>)}
              <Link href="/faq" onClick={event => { event.currentTarget.closest('details').open = false }} className="rounded-md px-3 py-3 text-palette-dark hover:bg-palette-lighter">Help &amp; FAQ</Link>
            </nav>
          </details>
          <Link href="/cart" className="relative text-palette-primary" aria-label={`Shopping cart, ${cartItems} items`}>
            <FontAwesomeIcon className="w-5" icon={faShoppingCart} />
            {cartItems > 0 && <span className="absolute -top-3 -right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-palette-primary px-1 text-xs text-white">{cartItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}
