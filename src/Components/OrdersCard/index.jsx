import { ChevronRightIcon } from '@heroicons/react/24/outline'

const OrdersCard = props => {
  const { totalPrice, totalProducts } = props

  return (
    <div className='flex items-center justify-between p-5 transition-colors bg-white border rounded-2xl border-line hover:border-ink'>
      <p className='flex flex-col'>
        <span className='font-medium'>30.09.26</span>
        <span className='text-sm text-muted'>{totalProducts} {totalProducts === 1 ? 'article' : 'articles'}</span>
      </p>
      <div className='flex items-center gap-2'>
        <span className='text-2xl font-bold font-display tabular-nums'>{'$' + totalPrice}</span>
        <ChevronRightIcon className='w-5 h-5 text-muted' />
      </div>
    </div>
  )
}

export default OrdersCard