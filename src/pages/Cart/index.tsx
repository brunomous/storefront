import { useMemo } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

import { formatCurrency } from '../../utils/currency'

import { useCartContext } from '../../context/CartContext'

import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import EmptyState from '../../components/EmptyState'

function Cart(): JSX.Element {
  const {
    cartItems,
    toggleCartItem,
  } = useCartContext()

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + item.price
    }, 0)
  }, [cartItems])

  return (
    <Wrapper>
      <Link to="/"><ArrowLeft /> Back</Link>
      <h1>Cart</h1>
      {cartItems.length === 0
        ? (
        <EmptyState>
          No products in the cart.
        </EmptyState>
          )
        : (
        <>
          <Grid>
            {cartItems.map((product, index: number) => (
              <ProductCard
                key={`item_${product.id}_${index}`}
                isItemOnCart
                handleButtonClick={() => toggleCartItem(product)}
                {...product}
              />
            ))}
          </Grid>
          <h2><>Total: {formatCurrency(totalPrice)}</></h2>
          <Link to="/checkout" underline bold>
            <h3>Begin checkout</h3>
            <ArrowRight />
          </Link>
        </>
          )}
    </Wrapper>
  )
}

export default Cart
