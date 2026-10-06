import { useContext } from 'react'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()
  const isOpen = context.isCheckoutSideMenuOpen
  const itemCount = context.cartProducts.length

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    if (itemCount === 0) return

    const orderToAdd = {
      date: '29.09.26',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.closeCheckoutSideMenu()
    navigate('/my-orders')
  }

  return (
    <>
      <div
        onClick={() => context.closeCheckoutSideMenu()}
        aria-hidden='true'
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />

      <aside
        aria-hidden={!isOpen}
        aria-label='My order'
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-drawer transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none sm:w-[26rem] sm:rounded-l-3xl ${isOpen ? 'translate-x-0' : 'invisible translate-x-full'}`}>
        <div className='flex items-center justify-between px-6 py-5 border-b border-line'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight font-display'><span>My order</span></h2>
            <p className='text-sm text-muted'>
              <span>{itemCount}</span> <span>{itemCount === 1 ? 'item' : 'items'}</span>
            </p>
          </div>
          <button
            type='button'
            aria-label='Close order'
            onClick={() => context.closeCheckoutSideMenu()}
            className='flex items-center justify-center w-10 h-10 transition-colors rounded-full hover:bg-paper'>
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>

        <div className='flex-1 min-h-0 px-6 overflow-y-auto'>
          {itemCount === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-center'>
              <ShoppingBagIcon className='w-10 h-10 mb-3 text-muted' />
              <p className='text-lg font-bold font-display'><span>Your cart is empty</span></p>
              <p className='mt-1 text-sm text-muted'><span>Add a product to see it here.</span></p>
            </div>
          ) : (
            <div className='divide-y divide-line'>
              {context.cartProducts.map(product => (
                <OrderCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imageUrl={product.images[0]}
                  price={product.price}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div className='px-6 py-5 bg-white border-t shrink-0 border-line'>
          <p className='flex items-center justify-between mb-4'>
            <span className='text-sm text-muted'>Total</span>
            <span className='text-3xl font-bold font-display tabular-nums'>{'$' + totalPrice(context.cartProducts)}</span>
          </p>
          <button
            type='button'
            onClick={handleCheckout}
            disabled={itemCount === 0}
            className='w-full rounded-full bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted'>
            <span>Verify order</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default CheckoutSideMenu