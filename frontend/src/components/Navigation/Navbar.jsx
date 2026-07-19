import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          🎯 Treasure Hunt
        </Link>
        <div className="flex gap-4">
          <Link to="/create" className="btn-primary text-sm">
            Create Hunt
          </Link>
          <Link to="/join" className="btn-secondary text-sm">
            Join Hunt
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
