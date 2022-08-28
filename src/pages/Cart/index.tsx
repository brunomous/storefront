import { Link } from 'react-router-dom'
import { useMemo } from 'react'

import { formatCurrency } from '../../utils/currency'

import { useCartContext } from '../../context/CartContext'

import Wrapper from '../../components/Wrapper'
import Button from '../../components/Button'

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
      <Link to="/">go back</Link>
      <h1>Cart</h1>
      {cartItems.map((product, index: number) => (
        <div key={`item_${product.id}_${index}`}>
          <h3>{product.title}</h3>
          <Button onClick={() => toggleCartItem(product)}>
            remove from cart
          </Button>
        </div>
      ))}
      <h3><>Total: {formatCurrency(totalPrice)}</></h3>
      <Link to="/checkout">begin checkout</Link>
    </Wrapper>
  )
}

export default Cart
