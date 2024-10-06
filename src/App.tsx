import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import AdminHeader from './components/AdminHeader'
import Footer from './components/Footer'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminInventory from './pages/admin/AdminInventory'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAbout from './pages/admin/AdminAbout'
import OrderDetails from './pages/admin/OrderDetails'
import StoreFront from './pages/customer/StoreFront'
import ProductDetail from './pages/customer/ProductDetail'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import About from './pages/customer/About'
import Login from './pages/Login'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white text-black flex flex-col">
            <Routes>
              <Route path="/admin/*" element={<AdminHeader />} />
              <Route path="*" element={<Header />} />
            </Routes>
            <main className="flex-grow">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
                <Route path="/admin/orders/:id" element={<ProtectedRoute adminOnly><OrderDetails /></ProtectedRoute>} />
                <Route path="/admin/inventory" element={<ProtectedRoute adminOnly><AdminInventory /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
                <Route path="/admin/about" element={<ProtectedRoute adminOnly><AdminAbout /></ProtectedRoute>} />

                {/* Customer Routes */}
                <Route path="/" element={<StoreFront />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App