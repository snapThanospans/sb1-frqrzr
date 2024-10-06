import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

// Dummy data for products
const dummyProducts = [
  { id: 1, name: 'Himalayan Salt Scrub', price: 249.99, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Lavender Candle', price: 199.99, image: 'https://images.unsplash.com/photo-1602178856955-6ea8df001c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Rose Bath Bomb', price: 99.99, image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Eucalyptus Shower Steamer', price: 149.99, image: 'https://images.unsplash.com/photo-1608247679846-5d9a8e0f0865?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Vanilla Soy Candle', price: 179.99, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Dead Sea Mud Mask', price: 299.99, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 7, name: 'Coconut Body Butter', price: 179.99, image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 8, name: 'Citrus Essential Oil Blend', price: 129.99, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 9, name: 'Charcoal Face Mask', price: 159.99, image: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 10, name: 'Green Tea Body Scrub', price: 189.99, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
]

const StoreFront: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const { addToCart } = useCart()

  useEffect(() => {
    const filtered = dummyProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchTerm])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Zuhrah Bath & Body Products</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md relative group">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">R {product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
            <button 
              onClick={() => addToCart(product)}
              className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
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

export default StoreFront