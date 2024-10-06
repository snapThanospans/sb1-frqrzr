import React, { useState } from 'react'
import { useCart } from '../../contexts/CartContext'

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { cart, formData })
    clearCart()
    alert('Thank you for your order!')
    // Redirect to a thank you page or back to the store
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block mb-1">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block mb-1">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Place Order
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>R {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>R {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout