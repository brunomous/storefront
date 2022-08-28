import { useState } from 'react'
import { ArrowLeft } from 'react-feather'
import { loadStripe, StripeCardElement } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

import { useCartContext } from '../../context/CartContext'

import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import Button from '../../components/Button'

const stripeLib = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY ?? '')

function CheckoutForm(): JSX.Element {
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false)

  const { cartItems, clearCart } = useCartContext()

  const stripe = useStripe()
  const elements = useElements()

  const placeOrder = async () => {
    if (stripe !== null) {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: (elements?.getElement(CardElement) as StripeCardElement),
      })

      if (paymentMethod !== undefined) {
        setIsOrderPlaced(true)
        clearCart()
      }
    }
  }

  if (isOrderPlaced) {
    return (
      <div>
        <h2>Order placed! Go back to Products page to buy more!</h2>
        <Link to="/" replace>go back</Link>
      </div>
    )
  }

  return (
    <Wrapper>
      <Link to="/cart"><ArrowLeft /> Back</Link>
      <h1>Checkout</h1>
      {cartItems.map((product, index: number) => (
        <div key={`item_${product.id}_${index}`}>
          <h3>{product.title}</h3>
        </div>
      ))}
      <CardElement />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={placeOrder}>check out now</Button>
    </Wrapper>
  )
}

function Checkout(): JSX.Element {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout
