import type { ChangeEvent } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import api from '../../api'

import { Product as ProductType } from '../../types/Product'

import Wrapper from '../../components/Wrapper'
import Input from '../../components/Input'
import ProductGrid from '../../components/ProductGrid'
import ProductCard from '../../components/ProductCard'

function Home(): JSX.Element {
  const [search, setSearch] = useState<string>('')

  const { isLoading, data } = useQuery(
    ['products'],
    async () => await api.get('/products'),
  )

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [setSearch])

  const products: ProductType[] = useMemo(() => {
    return data?.data ?? []
  }, [data])

  const filteredProducts: ProductType[] = useMemo(() => {
    return products.filter(
      ({ title }) => title.toLowerCase().includes(
        search.toLowerCase(),
      ),
    )
  }, [products, search])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <h1>Products</h1>
      <Input placeholder='Search' value={search} onChange={handleSearch} />
      <ProductGrid>
        {filteredProducts.map((product, index: number) => (
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
