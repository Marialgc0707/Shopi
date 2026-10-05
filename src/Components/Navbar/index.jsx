import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeStyle = 'underline underline-offset-4'
  const linkClass = ({ isActive }) => (isActive ? activeStyle : undefined)

  const categories = [
    { to: '/', label: 'All', category: undefined },
    { to: '/clothes', label: 'Clothes', category: 'clothes' },
    { to: '/electronics', label: 'Electronics', category: 'electronics' },
    { to: '/furnitures', label: 'Furnitures', category: 'furnitures' },
    { to: '/toys', label: 'Toys', category: 'toys' },
    { to: '/others', label: 'Others', category: 'others' },
  ]

  const handleCategory = (category) => {
    context.setSearchByCategory(category)
    setMenuOpen(false)
  }

  const cart = (
    <div className='flex items-center'>
      <ShoppingBagIcon className='w-6 h-6 text-black' />
      <span>{context.cartProducts.length}</span>
    </div>
  )

  return (
    <nav className='fixed top-0 z-20 w-full text-sm font-light bg-white'>
      <div className='flex flex-wrap items-center justify-between px-4 py-4 lg:flex-nowrap lg:px-8 lg:py-5'>
        <NavLink to='/' className='text-lg font-semibold'>Shopi</NavLink>

        {/* Solo se ve en móvil y tablet */}
        <div className='flex items-center gap-4 lg:hidden'>
          {cart}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label='Menu'>
            {menuOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
          </button>
        </div>

        {/* Menú: oculto en móvil hasta abrirlo; siempre visible desde lg */}
        <div className={`${menuOpen ? 'flex' : 'hidden'} flex-col w-full gap-4 pt-4 lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1 lg:w-auto lg:pt-0 lg:pl-3`}>
          <ul className='flex flex-col gap-3 lg:flex-row lg:items-center'>
            {categories.map(({ to, label, category }) => (
              <li key={to}>
                <NavLink to={to} onClick={() => handleCategory(category)} className={linkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className='flex flex-col gap-3 lg:flex-row lg:items-center'>
            <li className='break-all text-black/60 lg:hidden xl:block'>
              Shopi_gutierrez@gmail.com
            </li>
            <li>
              <NavLink to='/my-orders' onClick={() => setMenuOpen(false)} className={linkClass}>My Orders</NavLink>
            </li>
            <li>
              <NavLink to='/my-account' onClick={() => setMenuOpen(false)} className={linkClass}>My Account</NavLink>
            </li>
            <li>
              <NavLink to='/Signin' onClick={() => setMenuOpen(false)} className={linkClass}>Sign In</NavLink>
            </li>
            <li className='hidden lg:flex'>{cart}</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar