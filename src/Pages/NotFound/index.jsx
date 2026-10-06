import { Link } from 'react-router-dom'
import Layout from "../../Components/Layout"

function NotFound() {
  return (
    <Layout>
      <h1 className='text-4xl font-extrabold tracking-tight font-display sm:text-5xl'>Page not found</h1>
      <p className='mt-3 text-muted'>The page you're looking for doesn't exist or has moved.</p>
      <Link to='/' className='mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark'>
        Back to shop
      </Link>
    </Layout>
  )
}

export default NotFound