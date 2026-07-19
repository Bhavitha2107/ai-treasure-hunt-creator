import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function JoinHunt() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    hunt_id: '',
    participant_name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Validate hunt exists
      if (!formData.hunt_id) {
        toast.error('Please enter a hunt ID')
        return
      }
      
      // Store participant info and navigate to hunt
      localStorage.setItem('participantName', formData.participant_name)
      localStorage.setItem('participantEmail', formData.email)
      navigate(`/hunt/${formData.hunt_id}`)
      toast.success('Successfully joined the hunt!')
    } catch (error) {
      toast.error('Error joining hunt')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🔍 Join a Treasure Hunt</h1>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Hunt ID</label>
            <input
              type="text"
              name="hunt_id"
              value={formData.hunt_id}
              onChange={handleChange}
              placeholder="Enter hunt ID"
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Ask the hunt creator for the hunt ID</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="participant_name"
              value={formData.participant_name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Joining...' : 'Join Hunt'}
          </button>
        </form>

        <motion.div
          className="mt-8 card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4">How to Join</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Get the hunt ID from the hunt creator</li>
            <li>Enter your name and email</li>
            <li>Click "Join Hunt"</li>
            <li>Solve clues to win the treasure hunt!</li>
          </ol>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default JoinHunt
