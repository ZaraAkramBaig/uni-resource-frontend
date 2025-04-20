import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Resource Allocator</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</Link>
        </div>
      </nav>
  )
}
