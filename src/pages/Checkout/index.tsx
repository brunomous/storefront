import { useState, useMemo } from 'react'
import { ArrowLeft } from 'react-feather'
import { loadStripe, StripeCardElement } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { BeatLoader } from 'react-spinners'

import { useCartContext } from '../../context/CartContext'

import { formatCurrency } from '../../utils/currency'

import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import Button from '../../components/Button'
import CardElementWrapper from '../../components/CardElementWrapper'
import OrderPlaced from '../../components/OrderPlaced'
import ErrorMessage from '../../components/ErrorMessage'

const stripeLib = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY ?? '')

function CheckoutForm(): JSX.Element {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState<boolean>(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { cartItems, clearCart } = useCartContext()

  const stripe = useStripe()
  const elements = useElements()

  const placeOrder = async () => {
    if (stripe !== null) {
      setIsLoadingCheckout(true)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: (elements?.getElement(CardElement) as StripeCardElement),
      })

      setIsLoadingCheckout(false)

      if (error !== undefined) {
        setErrorMessage('Payment error. Check your credit card info and try again.')
      }

      if (paymentMethod !== undefined) {
        setIsOrderPlaced(true)
        clearCart()
      }
    }
  }

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + item.price
    }, 0)
  }, [cartItems])

  if (isOrderPlaced) {
    return (
      <OrderPlaced>
        <h2>Order placed! Go back to Products page and buy more!</h2>
        <Link to="/" replace>Go back</Link>
      </OrderPlaced>
    )
  }

  return (
    <Wrapper>
      <Link to="/cart"><ArrowLeft /> Back</Link>
      <h1>Checkout</h1>
      <h2>{formatCurrency(totalPrice)}</h2>
      {Boolean(errorMessage) && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <CardElementWrapper>
        <CardElement />
      </CardElementWrapper>
      <Button onClick={placeOrder}>
        {isLoadingCheckout ? <BeatLoader color="white" /> : 'check out now'}
      </Button>
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
