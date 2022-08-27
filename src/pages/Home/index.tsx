import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import api from '../../api'

import { Product as ProductType } from '../../types/Product'

import Wrapper from '../../components/Wrapper'
import ProductGrid from '../../components/ProductGrid'
import ProductCard from '../../components/ProductCard'

function Home(): JSX.Element {
  const { isLoading, data } = useQuery(
    ['products'],
    async () => await api.get('/products'),
  )

  const products: ProductType[] = useMemo(() => {
    return data?.data ?? []
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <h1>Products</h1>
      <ProductGrid>
        {products.map((product, index: number) => (
          <ProductCard
            key={`product_${product.id}_${index}`}
            {...product}
          />
        ))}
      </ProductGrid>
    </Wrapper>
  )
}

export default Home
