import { useState, useEffect } from 'react'
import { auth } from '../services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return { user, loading, logout }
}

export default useAuth
