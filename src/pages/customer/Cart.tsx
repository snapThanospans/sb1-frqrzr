import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p>Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Continue shopping</Link></p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p>Price: R {item.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p className="text-lg">R {(item.price * item.quantity).toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total: R {total.toFixed(2)}</p>
        <Link to="/checkout" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart