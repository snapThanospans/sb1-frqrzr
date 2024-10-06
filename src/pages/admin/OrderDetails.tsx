import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

// Dummy data for orders (you should replace this with actual data fetching logic)
const dummyOrders = [
  { id: '12345', customerName: 'John Doe', status: 'PROCESSING', paymentDate: '2023-05-01', shippingAddress: '123 Main St, City, Country', total: 149.99, products: [
    { id: 1, name: 'Lavender Candle', quantity: 2, price: 39.99 },
    { id: 2, name: 'Rose Bath Bomb', quantity: 1, price: 70.01 }
  ]},
  { id: '12346', customerName: 'Jane Smith', status: 'SHIPPED', paymentDate: '2023-05-02', shippingAddress: '456 Elm St, Town, Country', total: 99.99, products: [
    { id: 3, name: 'Eucalyptus Shower Steamer', quantity: 1, price: 99.99 }
  ]},
  // ... other orders ...
]

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const order = dummyOrders.find(o => o.id === id)

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/admin/orders" className="flex items-center text-blue-500 hover:underline mb-4">
        <ChevronLeft size={20} />
        <span>Back to Orders</span>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Order Details: {order.id}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Customer Information
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Customer name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.customerName}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.status}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Payment date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.paymentDate}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingAddress}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">R {order.total.toFixed(2)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Order Items</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R {product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R {(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderDetails