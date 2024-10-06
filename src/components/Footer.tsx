import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2024 Luxe Bath & Body. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="#" className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-gray-300">Terms of Service</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer