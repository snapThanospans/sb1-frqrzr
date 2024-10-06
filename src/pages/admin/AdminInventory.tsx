import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

// Dummy data for inventory
const dummyInventory = [
  { id: 1, name: 'Himalayan Salt Scrub', quantity: 50, price: 249.99, category: 'Salt' },
  { id: 2, name: 'Lavender Candle', quantity: 30, price: 199.99, category: 'Candle' },
  { id: 3, name: 'Rose Bath Bomb', quantity: 75, price: 99.99, category: 'Bath' },
  { id: 4, name: 'Eucalyptus Shower Steamer', quantity: 40, price: 149.99, category: 'Bath' },
  { id: 5, name: 'Vanilla Soy Candle', quantity: 25, price: 179.99, category: 'Candle' },
]

const AdminInventory: React.FC = () => {
  const [inventory, setInventory] = useState(dummyInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, category: '' })

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

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedInventory = sortField
    ? [...filteredInventory].sort((a, b) => {
        if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    : filteredInventory

  const handleEdit = (id: number) => {
    setEditingItem(id)
  }

  const handleSave = (id: number, updatedItem: typeof inventory[0]) => {
    setInventory(inventory.map(item => item.id === id ? updatedItem : item))
    setEditingItem(null)
  }

  const handleDelete = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id))
  }

  const handleAddItem = () => {
    const id = Math.max(...inventory.map(item => item.id)) + 1
    setInventory([...inventory, { id, ...newItem }])
    setNewItem({ name: '', quantity: 0, price: 0, category: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inventory..."
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
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('quantity')}>
                Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('price')}>
                Price {sortField === 'price' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('category')}>
                Category {sortField === 'category' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sortedInventory.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleSave(item.id, { ...item, name: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingItem === item.id ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleSave(item.id, { ...item, quantity: parseInt(e.target.value) })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingItem === item.id ? (
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleSave(item.id, { ...item, price: parseFloat(e.target.value) })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    `R ${item.price.toFixed(2)}`
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleSave(item.id, { ...item, category: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingItem === item.id ? (
                    <button onClick={() => setEditingItem(null)} className="text-green-500 hover:text-green-700 mr-2">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(item.id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add New Item</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border rounded p-2"
          />
          <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminInventory