import { useState, useEffect } from 'react'
import { huntAPI } from '../services/api'

function useHunt(huntId) {
  const [hunt, setHunt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadHunt = async () => {
      try {
        const response = await huntAPI.getById(huntId)
        setHunt(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    if (huntId) {
      loadHunt()
    }
  }, [huntId])

  return { hunt, loading, error }
}

export default useHunt
