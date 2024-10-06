import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

// Dummy data for a single product
const dummyProduct = {
  id: '1',
  name: 'Lavender Dreams Bath Bomb',
  price: 79.99,
  description: 'Indulge in the soothing scent of lavender with our luxurious bath bomb. Perfect for relaxation and stress relief.',
  images: [
    'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1620733723572-11c53f73a416?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1608247679846-5d9a8e0f0865?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  ],
  category: 'Bath',
  inStock: 15,
  rating: 4.5,
  reviews: [
    { id: 1, user: 'John D.', rating: 5, comment: 'Absolutely love this bath bomb! The lavender scent is perfect.' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great product, but I wish it lasted a bit longer.' },
    { id: 3, user: 'Emily R.', rating: 5, comment: 'This is my go-to for a relaxing bath. Highly recommend!' },
  ],
}

// Dummy data for related products
const dummyRelatedProducts = [
  { id: '2', name: 'Eucalyptus Shower Steamer', price: 49.99, image: 'https://images.unsplash.com/photo-1608247679846-5d9a8e0f0865?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '3', name: 'Rose Petal Bath Salts', price: 39.99, image: 'https://images.unsplash.com/photo-1620733723572-11c53f73a416?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: '4', name: 'Citrus Burst Soap Bar', price: 29.99, image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
]

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setProduct(dummyProduct)
      setRelatedProducts(dummyRelatedProducts)
    }, 500)
  }, [id])

  if (!product) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  const handleAddToCart = () => {
    addToCart({ id: parseInt(product.id), name: product.name, price: product.price })
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
  }

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          <button onClick={handlePrevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">R {product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Quantity:</span>
            <select value={quantity} onChange={handleQuantityChange} className="border rounded p-2">
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button onClick={toggleWishlist} className={`mt-4 flex items-center ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`}>
            <Heart className="mr-2" fill={isInWishlist ? 'currentColor' : 'none'} /> {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.map((review: any) => (
          <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded">
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">{review.user}</span>
              <span>{review.rating}/5 stars</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="block">
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover mb-2 rounded" />
                <h3 className="font-semibold">{relatedProduct.name}</h3>
                <p>R {relatedProduct.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail