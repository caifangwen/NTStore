import { createContext, useContext, useState, useEffect } from 'react'
import { createShopifyCheckout, updateShopifyCheckout, setLocalData, saveLocalData } from '@/utils/helpers'

const CartContext = createContext()
const AddToCartContext = createContext()
const UpdateCartQuantityContext = createContext()

export function useCartContext() {
  return useContext(CartContext)
}

export function useAddToCartContext() {
  return useContext(AddToCartContext)
}

export function useUpdateCartQuantityContext() {
  return useContext(UpdateCartQuantityContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    setLocalData(setCart, setCheckoutId, setCheckoutUrl)
  }, [])

  useEffect(() => {
    // do this to make sure multiple tabs are always in sync
    const onReceiveMessage = (e) => {
      console.log(e)
      setLocalData(setCart, setCheckoutId, setCheckoutUrl)
    }

    window.addEventListener("storage", onReceiveMessage);
    return () => {
      window.removeEventListener("storage", onReceiveMessage);
    }
  }, [])

  async function addToCart(newItem) {
    if (!Number.isSafeInteger(newItem.variantQuantity) || newItem.variantQuantity < 1) return
    setisLoading(true)
    try {
      const exists = cart.some(item => item.variantId === newItem.variantId)
      const newCart = exists
        ? cart.map(item => item.variantId === newItem.variantId
          ? { ...item, variantQuantity: item.variantQuantity + newItem.variantQuantity } : item)
        : [...cart, newItem]
      const response = cart.length === 0
        ? await createShopifyCheckout(newItem)
        : await updateShopifyCheckout(newCart, checkoutId)
      setCart(newCart)
      setCheckoutId(response.id)
      setCheckoutUrl(response.webUrl)
      saveLocalData(newCart, response.id, response.webUrl)
    } catch (error) {
      window.alert(error.message)
    } finally {
      setisLoading(false)
    }
  }

  async function updateCartItemQuantity(id, quantity) {
    if (quantity === '') return
    const newQuantity = Number(quantity)
    if (!Number.isSafeInteger(newQuantity) || newQuantity < 0) return
    setisLoading(true)
    try {
      const newCart = cart.map(item => item.variantId === id
        ? { ...item, variantQuantity: newQuantity } : item)
        .filter(item => item.variantQuantity !== 0)
      const response = await updateShopifyCheckout(newCart, checkoutId)
      setCart(newCart)
      setCheckoutUrl(response.webUrl)
      saveLocalData(newCart, response.id, response.webUrl)
    } catch (error) {
      window.alert(error.message)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <CartContext.Provider value={[cart, checkoutUrl, isLoading]}>
      <AddToCartContext.Provider value={addToCart}>
        <UpdateCartQuantityContext.Provider value={updateCartItemQuantity}>
          {children}
        </UpdateCartQuantityContext.Provider>
      </AddToCartContext.Provider>
    </CartContext.Provider>
  )
}
