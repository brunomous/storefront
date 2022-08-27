import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'

import { CartContextProvider } from './context/CartContext'

import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/product/:id"
            element={<Product />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
          />
        </Routes>
      </CartContextProvider>
    </QueryClientProvider>
  )
}

export default App
