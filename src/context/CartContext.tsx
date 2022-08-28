import type { ReactNode } from 'react'
import type { Product } from '../types/Product'

import { createContext, useState, useContext, useCallback } from 'react'

interface ContextInterface {
  cartItems: Product[]
  isItemOnCart: (itemId: Product['id']) => boolean
  toggleCartItem: (item: Product) => void
  clearCart: () => void
}

interface ContextProviderProps {
  children: ReactNode
}

const CartContext = createContext<ContextInterface>({} as ContextInterface)

function CartContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const isItemOnCart = useCallback((itemId: Product['id']) => {
    return cartItems.some(({ id }) => id === itemId)
  }, [cartItems])

  const toggleCartItem = useCallback((item: Product) => {
    setCartItems(
      isItemOnCart(item.id)
        ? cartItems.filter(({ id }) => id !== item.id)
        : [...cartItems, item],
    )
  }, [isItemOnCart, setCartItems, cartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isItemOnCart,
        toggleCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCartContext = () => useContext(CartContext)

export { CartContextProvider, useCartContext }
