import type { ChangeEvent } from 'react'
import type { Product } from '../../types/Product'

import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import { useCartContext } from '../../context/CartContext'

import api from '../../api'

import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import Input from '../../components/Input'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import EmptyState from '../../components/EmptyState'

function Home(): JSX.Element {
  const [search, setSearch] = useState<string>('')

  const { isLoading, data } = useQuery(
    ['products'],
    async () => await api.get('/products'),
  )

  const {
    isItemOnCart,
    toggleCartItem,
  } = useCartContext()

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [setSearch])

  const products: Product[] = useMemo(() => {
    return data?.data ?? []
  }, [data])

  const filteredProducts: Product[] = useMemo(() => {
    return products.filter(
      ({ title }) => title.toLowerCase().includes(
        search.toLowerCase(),
      ),
    )
  }, [products, search])

  if (isLoading) {
    return <Loading>Loading products...</Loading>
  }

  return (
    <div>
      <Header />
      <Wrapper>
        <Input
          placeholder='Search products'
          value={search}
          onChange={handleSearch}
          hasTopMargin
        />
        {Boolean(search) && (filteredProducts.length === 0)
          ? (
          <EmptyState>
            No products were found with provided criteria.
          </EmptyState>
            )
          : (
          <Grid>
            {filteredProducts.map((product, index: number) => (
              <ProductCard
                key={`product_${product.id}_${index}`}
                isItemOnCart={isItemOnCart(product.id)}
                handleButtonClick={() => toggleCartItem(product)}
                {...product}
              />
            ))}
          </Grid>
            )}
      </Wrapper>
    </div>
  )
}

export default Home
