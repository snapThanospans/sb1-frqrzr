import React, { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

// Dummy data for users
const dummyUsers = [
  { id: 1, username: 'john_doe', email: 'john@example.com', role: 'customer', lastLogin: '2023-05-01' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'customer', lastLogin: '2023-05-02' },
  { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'admin', lastLogin: '2023-05-03' },
  { id: 4, username: 'bob_johnson', email: 'bob@example.com', role: 'customer', lastLogin: '2023-05-04' },
  { id: 5, username: 'alice_brown', email: 'alice@example.com', role: 'customer', lastLogin: '2023-05-05' },
]

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState(dummyUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [editingUser, setEditingUser] = useState<number | null>(null)
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'customer' })

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

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedUsers = sortField
    ? [...filteredUsers].sort((a, b) => {
        if (a[sortField as keyof typeof a] < b[sortField as keyof typeof b]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField as keyof typeof a] > b[sortField as keyof typeof b]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    : filteredUsers

  const handleEdit = (id: number) => {
    setEditingUser(id)
  }

  const handleSave = (id: number, updatedUser: typeof users[0]) => {
    setUsers(users.map(user => user.id === id ? updatedUser : user))
    setEditingUser(null)
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const handleAddUser = () => {
    const id = Math.max(...users.map(user => user.id)) + 1
    setUsers([...users, { id, ...newUser, lastLogin: 'N/A' }])
    setNewUser({ username: '', email: '', role: 'customer' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
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
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('username')}>
                Username {sortField === 'username' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('email')}>
                Email {sortField === 'email' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('role')}>
                Role {sortField === 'role' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('lastLogin')}>
                Last Login {sortField === 'lastLogin' && (sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) => handleSave(user.id, { ...user, username: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => handleSave(user.id, { ...user, email: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingUser === user.id ? (
                    <select
                      value={user.role}
                      onChange={(e) => handleSave(user.id, { ...user, role: e.target.value })}
                      className="border rounded p-1 w-full"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-3 px-6 text-left">{user.lastLogin}</td>
                <td className="py-3 px-6 text-left">
                  {editingUser === user.id ? (
                    <button onClick={() => setEditingUser(null)} className="text-green-500 hover:text-green-700 mr-2">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(user.id)} className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  )}
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add New User</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border rounded p-2"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border rounded p-2"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add User
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers