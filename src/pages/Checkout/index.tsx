import { Link } from 'react-router-dom'

import { useCartContext } from '../../context/CartContext'

import Wrapper from '../../components/Wrapper'
import Button from '../../components/Button'

function Checkout(): JSX.Element {
  const { cartItems } = useCartContext()

  return (
    <Wrapper>
      <Link to="/cart">go back</Link>
      <h1>Checkout</h1>
      {cartItems.map((product, index: number) => (
        <div key={`item_${product.id}_${index}`}>
          <h3>{product.title}</h3>
        </div>
      ))}
      <Button>check out now</Button>
    </Wrapper>
  )
}

export default Checkout
