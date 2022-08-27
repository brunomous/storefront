import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api'

import { Product as ProductType } from '../../types/Product'

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
    <div>
      {products.map(({ id, title }, index: number) => (
        <Link key={`product_${id}_${index}`} to={`/product/${id}`}>
          {title}
        </Link>
      ))}
    </div>
  )
}

export default Home
