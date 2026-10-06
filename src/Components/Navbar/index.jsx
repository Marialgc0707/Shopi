import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ShoppingCartContext } from '../../Context'

const categories = [
  { to: '/', label: 'All', category: undefined },
  { to: '/clothes', label: 'Clothes', category: 'clothes' },
  { to: '/electronics', label: 'Electronics', category: 'electronics' },
  { to: '/furnitures', label: 'Furnitures', category: 'furnitures' },
  { to: '/toys', label: 'Toys', category: 'toys' },
  { to: '/others', label: 'Others', category: 'others' },
]

const pillClass = ({ isActive }) =>
  `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-ink text-white' : 'text-muted hover:bg-paper hover:text-ink'
  }`

const textLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = context.cartProducts.length

  const handleCategory = (category) => {
    context.setSearchByCategory(category)
    setMenuOpen(false)
  }

  const cartButton = (
    <button
      type='button'
      onClick={() => {
        setMenuOpen(false)
        context.openCheckoutSideMenu()
      }}
      aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
      className='flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors rounded-full bg-accent hover:bg-accent-dark'>
      <ShoppingBagIcon className='w-5 h-5' />
      <span className='tabular-nums'>{cartCount}</span>
    </button>
  )

  return (
    <header className='fixed inset-x-0 top-0 z-30 px-3 pt-3 sm:px-6'>
      <nav className='max-w-screen-xl mx-auto border rounded-2xl border-line bg-white/85 shadow-nav backdrop-blur-md'>
        <div className='flex items-center justify-between gap-4 px-4 py-2.5 lg:px-5'>
          <NavLink to='/' onClick={() => handleCategory(undefined)} className='flex items-center gap-1.5 font-display text-xl font-extrabold tracking-tight'>
            Shopi
            <span className='w-2 h-2 rounded-full bg-accent' aria-hidden='true' />
          </NavLink>

          {/* Categorías: solo desktop */}
          <ul className='items-center hidden gap-1 lg:flex'>
            {categories.map(({ to, label, category }) => (
              <li key={to}>
                <NavLink to={to} onClick={() => handleCategory(category)} className={pillClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Cuenta y carrito: solo desktop */}
          <ul className='items-center hidden gap-5 lg:flex'>
            <li><NavLink to='/my-orders' className={textLinkClass}>My Orders</NavLink></li>
            <li><NavLink to='/my-account' className={textLinkClass}>My Account</NavLink></li>
            <li><NavLink to='/sign-in' className={textLinkClass}>Sign In</NavLink></li>
            <li>{cartButton}</li>
          </ul>

          {/* Móvil y tablet */}
          <div className='flex items-center gap-2 lg:hidden'>
            {cartButton}
            <button
              type='button'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className='flex items-center justify-center w-10 h-10 transition-colors rounded-full hover:bg-paper'>
              {menuOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
            </button>
          </div>
        </div>

        {/* Menú desplegable móvil */}
        {menuOpen && (
          <div className='px-4 pt-4 pb-5 border-t border-line lg:hidden'>
            <ul className='flex flex-wrap gap-2'>
              {categories.map(({ to, label, category }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => handleCategory(category)}
                    className={({ isActive }) =>
                      `block rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink'
                      }`
                    }>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className='flex flex-col mt-5 border-t divide-y divide-line border-line'>
              {[
                { to: '/my-orders', label: 'My Orders' },
                { to: '/my-account', label: 'My Account' },
                { to: '/sign-in', label: 'Sign In' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `block py-3 text-sm font-medium ${isActive ? 'text-accent' : 'text-ink'}`}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <p className='mt-3 text-xs break-all text-muted'>Shopi_gutierrez@gmail.com</p>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar