import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

import api from '../../api'

import { Product as ProductType } from '../../types/Product'

import Wrapper from '../../components/Wrapper'
import ProductDetails from '../../components/ProductDetails'

function Product(): JSX.Element {
  const { id } = useParams()

  const { isLoading, data } = useQuery(
    ['product'],
    async () => await api.get(`/products/${id}`),
  )

  const product: ProductType = useMemo(() => {
    return data?.data
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <h1>{product.title}</h1>
      <ProductDetails {...product} />
    </Wrapper>
  )
}

export default Product
