import { useState, useEffect } from 'react'

function useTimer(initialTime) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const pause = () => setIsRunning(false)
  const resume = () => setIsRunning(true)
  const reset = () => {
    setTimeLeft(initialTime)
    setIsRunning(true)
  }

  return { timeLeft, isRunning, pause, resume, reset }
}

export default useTimer
