import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function CountdownTimer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, setTimeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft < 300 // 5 minutes

  return (
    <motion.div
      className={`text-lg font-bold px-4 py-2 rounded-lg ${
        isWarning ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
      }`}
      animate={isWarning ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: isWarning ? Infinity : 0, duration: 1 }}
    >
      ⏱️ {minutes}:{seconds.toString().padStart(2, '0')}
    </motion.div>
  )
}

export default CountdownTimer
