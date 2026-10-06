import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Card = (data) => {
  const context = useContext(ShoppingCartContext)

  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
  }

  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <span
          className='absolute flex items-center justify-center text-white bg-indigo-600 rounded-full shadow-lg bottom-3 right-3 h-11 w-11'
          aria-label='In your cart'>
          <CheckIcon className='w-6 h-6' />
        </span>
      )
    }

    return (
      <button
        type='button'
        aria-label={`Add ${data.data.title} to cart`}
        onClick={(event) => addProductsToCart(event, data.data)}
        className='absolute flex items-center justify-center text-white transition-colors bg-indigo-600 rounded-full shadow-lg bottom-3 right-3 h-11 w-11 hover:bg-indigo-700'>
        <PlusIcon className='w-6 h-6' />
      </button>
    )
  }

  return (
    <article
      className='cursor-pointer group'
      onClick={() => showProduct(data.data)}>
      <figure className='relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200'>
        <img
          className='object-cover w-full h-full'
          src={data.data.images[0]}
          alt={data.data.title}
          loading='lazy' />
        {renderIcon(data.data.id)}
      </figure>
      <div className='flex items-start justify-between gap-3 mt-3'>
        <h3 className='text-sm font-medium leading-snug text-gray-900 line-clamp-2'>{data.data.title}</h3>
        <span className='text-base font-bold font-display tabular-nums'>${data.data.price}</span>
      </div>
    </article>
  )
}

export default Card