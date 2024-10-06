import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'

// Updated dummy data for orders with products
const dummyOrders = [
  { id: '12345', customerName: 'John Doe', status: 'PROCESSING', paymentDate: '2023-05-01', shippingAddress: '123 Main St, City, Country', total: 149.99, products: [
    { id: 1, name: 'Lavender Candle', quantity: 2, price: 39.99 },
    { id: 2, name: 'Rose Bath Bomb', quantity: 1, price: 70.01 }
  ]},
  { id: '12346', customerName: 'Jane Smith', status: 'SHIPPED', paymentDate: '2023-05-02', shippingAddress: '456 Elm St, Town, Country', total: 99.99, products: [
    { id: 3, name: 'Eucalyptus Shower Steamer', quantity: 1, price: 99.99 }
  ]},
  { id: '12347', customerName: 'Bob Johnson', status: 'DELIVERED', paymentDate: '2023-05-03', shippingAddress: '789 Oak St, Village, Country', total: 199.99, products: [
    { id: 4, name: 'Himalayan Salt Scrub', quantity: 1, price: 149.99 },
    { id: 5, name: 'Vanilla Soy Candle', quantity: 1, price: 50.00 }
  ]},
  { id: '12348', customerName: 'Alice Brown', status: 'PROCESSING', paymentDate: '2023-05-04', shippingAddress: '101 Pine St, Hamlet, Country', total: 79.99, products: [
    { id: 6, name: 'Citrus Essential Oil Blend', quantity: 1, price: 79.99 }
  ]},
  { id: '12349', customerName: 'Charlie Davis', status: 'PAID', paymentDate: '2023-05-05', shippingAddress: '202 Maple St, Borough, Country', total: 129.99, products: [
    { id: 7, name: 'Charcoal Face Mask', quantity: 2, price: 64.99 }
  ]},
]

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState(dummyOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const ordersPerPage = 5

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm)
  )

  const sortedOrders = sortField
    ? [...filteredOrders].sort((a, b) => {
        if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    : filteredOrders

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('id')}>
                Order ID {sortField === 'id' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('customerName')}>
                Customer Name {sortField === 'customerName' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('paymentDate')}>
                Payment Date {sortField === 'paymentDate' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left">Shipping Address</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('total')}>
                Total {sortField === 'total' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <Link to={`/admin/orders/${order.id}`} className="text-blue-500 hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">{order.customerName}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`bg-${order.status === 'PAID' ? 'green' : order.status === 'PROCESSING' ? 'yellow' : 'blue'}-200 text-${order.status === 'PAID' ? 'green' : order.status === 'PROCESSING' ? 'yellow' : 'blue'}-600 py-1 px-3 rounded-full text-xs`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{order.paymentDate}</td>
                <td className="py-3 px-6 text-left">{order.shippingAddress}</td>
                <td className="py-3 px-6 text-left">R {order.total.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="PAID">Paid</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(sortedOrders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminOrders