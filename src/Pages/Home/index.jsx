import { useContext } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCartContext)
  const isLoading = context.items === null && !context.error
  const total = context.filteredItems?.length ?? 0

  const renderView = () => {
    if (context.error) {
      return (
        <div className='flex flex-col items-center py-20 text-center col-span-full'>
          <p className='text-xl font-bold font-display'>We couldn't load the products</p>
          <p className='mt-1 text-sm text-muted'>Check your connection and try again.</p>
          <button
            type='button'
            onClick={() => context.retry()}
            className='mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark'>
            Try again
          </button>
        </div>
      )
    }
    
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className='animate-pulse motion-reduce:animate-none'>
          <div className='aspect-[4/5] rounded-2xl bg-line' />
          <div className='w-3/4 h-4 mt-3 rounded bg-line' />
        </div>
      ))
    }

    if (total > 0) {
      return context.filteredItems.map(item => (
        <Card key={item.id} data={item} />
      ))
    }

    return (
      <div className='flex flex-col items-center py-20 text-center col-span-full'>
        <MagnifyingGlassIcon className='w-10 h-10 mb-4 text-muted' />
        <p className='text-xl font-bold font-display'>No products found</p>
        <p className='mt-1 text-sm text-muted'>Try a different search or pick another category.</p>
      </div>
    )
  }

  return (
    <Layout>
      <section className='flex flex-col gap-6 mb-10 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <h1 className='font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl'>
            Exclusive products
          </h1>
          <p className='max-w-md mt-3 text-base text-muted'>
            {isLoading
              ? 'Loading the catalog…'
              : `Browse ${total} ${total === 1 ? 'item' : 'items'} across clothes, electronics, furniture and toys.`}
          </p>
        </div>
        <div className='relative w-full lg:max-w-sm'>
          <MagnifyingGlassIcon className='absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-muted' />
          <input
            type='search'
            aria-label='Search a product'
            placeholder='Search a product'
            className='w-full rounded-full border border-line bg-white py-3.5 pl-12 pr-5 text-sm shadow-sm transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15'
            onChange={(event) => context.setSearchByTitle(event.target.value)} />
        </div>
      </section>

      <div className='grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home