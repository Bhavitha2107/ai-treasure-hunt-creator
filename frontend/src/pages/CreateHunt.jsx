import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { huntAPI } from '../services/api'

function CreateHunt() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    theme: 'fun',
    age_group: 'teens',
    academic: false,
    location_type: 'outdoor',
    num_clues: 5,
    difficulty: 'medium',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await huntAPI.create(formData)
      navigate(`/hunt/${response.data.hunt_id}`)
    } catch (error) {
      console.error('Error creating hunt:', error)
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
        <h1 className="text-4xl font-bold mb-8 text-center">Create a New Hunt</h1>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Hunt Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Campus Treasure Hunt"
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your hunt..."
              className="input-field h-24 resize-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="input-field"
              >
                <option value="fun">Fun</option>
                <option value="academic">Academic</option>
                <option value="comic">Comic</option>
                <option value="rhyme">Rhyme</option>
                <option value="riddle">Riddle</option>
                <option value="cryptic">Cryptic</option>
                <option value="emoji">Emoji</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Age Group</label>
              <select
                name="age_group"
                value={formData.age_group}
                onChange={handleChange}
                className="input-field"
              >
                <option value="kids">Kids (5-12)</option>
                <option value="teens">Teens (13-17)</option>
                <option value="adults">Adults (18+)</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Location Type</label>
              <select
                name="location_type"
                value={formData.location_type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Clues (Max 8)</label>
              <input
                type="number"
                name="num_clues"
                value={formData.num_clues}
                onChange={handleChange}
                min="1"
                max="8"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="input-field"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="academic"
                  checked={formData.academic}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4"
                />
                <span className="text-sm font-medium">Academic Content</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating...' : 'Create Hunt'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default CreateHunt
