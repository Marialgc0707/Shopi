import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ShoppingCartContext } from '../../Context'

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)
  const isOpen = context.isProductDetailOpen
  const product = context.productToShow

  return (
    <>
      <div
        onClick={() => context.closeProductDetail()}
        aria-hidden='true'
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />

      <aside
        aria-hidden={!isOpen}
        aria-label='Product detail'
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-white shadow-drawer transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none sm:w-[26rem] sm:rounded-l-3xl ${isOpen ? 'translate-x-0' : 'invisible translate-x-full'}`}>
        <div className='flex items-center justify-between px-6 py-5'>
          <h2 className='text-2xl font-bold tracking-tight font-display'>Detail</h2>
          <button
            type='button'
            aria-label='Close detail'
            onClick={() => context.closeProductDetail()}
            className='flex items-center justify-center w-10 h-10 transition-colors rounded-full hover:bg-paper'>
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>

        <figure className='px-6'>
          <img
            className='object-cover w-full aspect-square rounded-2xl bg-line'
            src={product.images?.[0]}
            alt={product.title} />
        </figure>

        <div className='flex flex-col gap-2 p-6'>
          {product.category?.name && (
            <span className='w-fit rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent'>
              {product.category.name}
            </span>
          )}
          <span className='text-3xl font-bold font-display tabular-nums'>${product.price}</span>
          <span className='text-lg font-medium leading-snug'>{product.title}</span>
          <span className='text-sm leading-relaxed text-muted'>{product.description}</span>
        </div>
      </aside>
    </>
  )
}

export default ProductDetail