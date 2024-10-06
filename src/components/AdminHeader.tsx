import React from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Package, Users, FileText } from 'lucide-react'

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/admin" className="flex items-center hover:text-gray-300">
                <LayoutDashboard className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="flex items-center hover:text-gray-300">
                <ShoppingBag className="mr-2" /> Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/inventory" className="flex items-center hover:text-gray-300">
                <Package className="mr-2" /> Inventory
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="flex items-center hover:text-gray-300">
                <Package className="mr-2" /> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="flex items-center hover:text-gray-300">
                <Users className="mr-2" /> Users
              </Link>
            </li>
            <li>
              <Link to="/admin/about" className="flex items-center hover:text-gray-300">
                <FileText className="mr-2" /> About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AdminHeader