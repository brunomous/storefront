import type { ChangeEvent } from 'react'
import type { Product as ProductType } from '../../types/Product'

import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import { useCartContext } from '../../context/CartContext'

import api from '../../api'

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

  const {
    cartItems,
    isItemOnCart,
    toggleCartItem,
  } = useCartContext()

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
      <h1>Products ({cartItems.length} products on cart)</h1>
      <Input placeholder='Search' value={search} onChange={handleSearch} />
      <ProductGrid>
        {filteredProducts.map((product, index: number) => (
          <ProductCard
            key={`product_${product.id}_${index}`}
            isItemOnCart={isItemOnCart(product.id)}
            handleButtonClick={() => toggleCartItem(product)}
            {...product}
          />
        ))}
      </ProductGrid>
    </Wrapper>
  )
}

export default Home
