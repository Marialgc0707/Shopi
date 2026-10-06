import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard'

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1
  const products = context.order?.[index]?.products

  return (
    <Layout>
      <div className='mb-8 flex items-center gap-4'>
        <Link
          to='/my-orders'
          aria-label='Back to my orders'
          className='flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-ink'>
          <ChevronLeftIcon className='h-5 w-5' />
        </Link>
        <h1 className='font-display text-4xl font-extrabold tracking-tight sm:text-5xl'>My order</h1>
      </div>
      <div className='max-w-xl divide-y divide-line rounded-2xl border border-line bg-white px-5'>
        {products?.length > 0 ? (
          products.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.images?.[0]}
              price={product.price}
            />
          ))
        ) : (
          <p className='py-10 text-center text-sm text-muted'>This order has no products.</p>
        )}
      </div>
    </Layout>
  )
}

export default MyOrder