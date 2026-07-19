import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { leaderboardAPI } from '../services/api'
import LeaderboardTable from '../components/Leaderboard/LeaderboardTable'
import toast from 'react-hot-toast'

function Leaderboard() {
  const { huntId } = useParams()
  const [leaderboard, setLeaderboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
    const interval = setInterval(loadLeaderboard, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [huntId])

  const loadLeaderboard = async () => {
    try {
      const response = await leaderboardAPI.getByHunt(huntId)
      setLeaderboard(response.data)
      setLoading(false)
    } catch (error) {
      toast.error('Error loading leaderboard')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading leaderboard...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🏆 Leaderboard</h1>
        
        {leaderboard && leaderboard.standings.length > 0 ? (
          <LeaderboardTable standings={leaderboard.standings} />
        ) : (
          <div className="text-center py-12 card">
            <p>No scores yet. Be the first to complete the hunt!</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Leaderboard
