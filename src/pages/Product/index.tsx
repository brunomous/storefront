import type { Product as ProductInterface } from '../../types/Product'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { ArrowLeft } from 'react-feather'

import { useCartContext } from '../../context/CartContext'

import api from '../../api'

import Wrapper from '../../components/Wrapper'
import Link from '../../components/Link'
import ProductDetails from '../../components/ProductDetails'

function Product(): JSX.Element {
  const { id } = useParams()

  const { isLoading, data } = useQuery(
    ['product'],
    async () => await api.get(`/products/${id}`),
  )

  const {
    isItemOnCart,
    toggleCartItem,
  } = useCartContext()

  const product: ProductInterface = useMemo(() => {
    return data?.data
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <Link to="/"><ArrowLeft /> Back</Link>
      <h1>{product.title}</h1>
      <ProductDetails
        {...product}
        isItemOnCart={isItemOnCart(product.id)}
        handleButtonClick={() => toggleCartItem(product)}
      />
    </Wrapper>
  )
}

export default Product
