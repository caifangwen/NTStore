import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function Layout({ children }) {
  
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Nav />

        <main className="flex-1 w-full max-w-6xl mx-auto px-6">
          {children}
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

export default Layout
