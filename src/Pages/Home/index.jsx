import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
       if (context.filteredItems?.length > 0){
      return(
       context.filteredItems?.map(item => (
            <Card key={item.id} data={item} />
        ))
      )
    } else{
      return(
          <div>we don't have anything:c</div>
       )
     }
  }

  return (
    <Layout>
      <div className='relative flex items-center justify-center mb-4 w-80'>
        <h1 className='text-xl font-medium'>Exclusive Products</h1>
      </div>
      <input
  type="text"
  placeholder='Search a product'
  className='w-11/12 max-w-sm p-4 mb-4 border border-black rounded-lg focus:outline-none'
  onChange={(event) => context.setSearchByTitle(event.target.value)} />
<div className='grid w-full max-w-screen-lg grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4'>
  {renderView()}
</div>
      <ProductDetail />
    </Layout>
  )
}

export default Home