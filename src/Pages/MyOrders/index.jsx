import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import OrdersCard from '../../Components/OrdersCard'

function MyOrders() {
  const context = useContext(ShoppingCartContext)

  return (
    <Layout>
      <h1 className='mb-8 text-4xl font-extrabold tracking-tight font-display sm:text-5xl'>My orders</h1>
      <div className='flex flex-col max-w-xl gap-3'>
        {context.order.length === 0 ? (
          <div className='px-6 text-center bg-white border border-dashed rounded-2xl border-line py-14'>
            <p className='text-xl font-bold font-display'>No orders yet</p>
            <p className='mt-1 text-sm text-muted'>When you check out, your orders will show up here.</p>
            <Link to='/' className='mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark'>
              Start shopping
            </Link>
          </div>
        ) : (
          context.order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts} />
            </Link>
          ))
        )}
      </div>
    </Layout>
  )
}

export default MyOrders