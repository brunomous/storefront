import { useMemo } from 'react'
import { ArrowLeft } from 'react-feather'

import { formatCurrency } from '../../utils/currency'

import { useCartContext } from '../../context/CartContext'

import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import ProductCard from '../../components/ProductCard'

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
      {cartItems.map((product, index: number) => (
        <ProductCard
          key={`item_${product.id}_${index}`}
          isItemOnCart
          handleButtonClick={() => toggleCartItem(product)}
          {...product}
        />
      ))}
      <h3><>Total: {formatCurrency(totalPrice)}</></h3>
      <Link to="/checkout">
        Begin checkout
      </Link>
    </Wrapper>
  )
}

export default Cart
