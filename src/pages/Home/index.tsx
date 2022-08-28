import type { ChangeEvent } from 'react'
import type { Product } from '../../types/Product'

import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useCartContext } from '../../context/CartContext'

import api from '../../api'

import Wrapper from '../../components/Wrapper'
import Input from '../../components/Input'
import Grid from '../../components/Grid'
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
    return <div>Loading...</div>
  }

  return (
    <Wrapper>
      <h1>
        Products ({cartItems.length} products on cart){' '}
        <Link to={'/cart'}>view cart</Link>
      </h1>
      <Input placeholder='Search' value={search} onChange={handleSearch} />
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
    </Wrapper>
  )
}

export default Home
