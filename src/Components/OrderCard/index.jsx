import { XMarkIcon } from '@heroicons/react/24/outline'

const OrderCard = props => {
  const { id, title, imageUrl, price, handleDelete } = props

  return (
    <div className='flex items-center justify-between gap-3 py-4'>
      <div className='flex items-center min-w-0 gap-4'>
        <figure className='w-20 h-20 overflow-hidden shrink-0 rounded-xl bg-line'>
          <img className='object-cover w-full h-full' src={imageUrl} alt={title} />
        </figure>
        <p className='text-sm font-medium leading-snug line-clamp-2'>{title}</p>
      </div>
      <div className='flex items-center gap-1 shrink-0'>
        <p className='text-base font-bold font-display tabular-nums'>${price}</p>
        {handleDelete && (
          <button
            type='button'
            aria-label={`Remove ${title}`}
            onClick={() => handleDelete(id)}
            className='flex items-center justify-center w-8 h-8 transition-colors rounded-full text-muted hover:bg-paper hover:text-ink'>
            <XMarkIcon className='w-5 h-5' />
          </button>
        )}
      </div>
    </div>
  )
}

export default OrderCard