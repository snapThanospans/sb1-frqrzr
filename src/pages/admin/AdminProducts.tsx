import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react'

// Dummy data for products
const dummyProducts = [
  { id: 1, name: 'Himalayan Salt Scrub', price: 249.99, category: 'Body Care', stock: 50, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Lavender Candle', price: 199.99, category: 'Home Fragrance', stock: 30, image: 'https://images.unsplash.com/photo-1602178856955-6ea8df001c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Rose Bath Bomb', price: 99.99, category: 'Bath', stock: 75, image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Eucalyptus Shower Steamer', price: 149.99, category: 'Bath', stock: 40, image: 'https://images.unsplash.com/photo-1608247679846-5d9a8e0f0865?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Vanilla Soy Candle', price: 179.99, category: 'Home Fragrance', stock: 25, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
]

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState(dummyProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: '', stock: 0, image: '' })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = sortField
    ? [...filteredProducts].sort((a, b) => {
        if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    : filteredProducts

  const handleEdit = (id: number) => {
    setEditingProduct(id)
  }

  const handleSave = (id: number, updatedProduct: typeof products[0]) => {
    setProducts(products.map(product => product.id === id ? updatedProduct : product))
    setEditingProduct(null)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleAddProduct = () => {
    const id = Math.max(...products.map(product => product.id)) + 1
    setProducts([...products, { id, ...newProduct }])
    setNewProduct({ name: '', price: 0, category: '', stock: 0, image: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
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
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('price')}>
                Price {sortField === 'price' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('category')}>
                Category {sortField === 'category' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('stock')}>
                Stock {sortField === 'stock' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleSave(product.id, { ...product, name: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingProduct === product.id ? (
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handleSave(product.id, { ...product, price: parseFloat(e.target.value) })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    `R ${product.price.toFixed(2)}`
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      value={product.category}
                      onChange={(e) => handleSave(product.id, { ...product, category: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingProduct === product.id ? (
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => handleSave(product.id, { ...product, stock: parseInt(e.target.value) })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      value={product.image}
                      onChange={(e) => handleSave(product.id, { ...product, image: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingProduct === product.id ? (
                    <button onClick={() => setEditingProduct(null)} className="text-green-500 hover:text-green-700 mr-2">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(product.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <Edit size={16} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border rounded p-2"
          />
          <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts