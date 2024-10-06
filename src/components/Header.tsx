import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Header: React.FC = () => {
  const { cart } = useCart()

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Zuhrah Bath & Body</Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li>
              <Link to="/cart" className="hover:text-gray-300 relative">
                <ShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
            <li><Link to="/admin" className="hover:text-gray-300"><User /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header