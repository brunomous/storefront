import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

import api from '../../api'

import { Product as ProductType } from '../../types/Product'

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
    <div>Product {id}: {product.title}</div>
  )
}

export default Product
