import { useState } from 'react'
import { motion } from 'framer-motion'

function AnswerInput({ onSubmit }) {
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!answer.trim()) return

    setIsSubmitting(true)
    await onSubmit(answer)
    setAnswer('')
    setIsSubmitting(false)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer..."
          className="input-field flex-1"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !answer.trim()}
          className="btn-primary"
        >
          {isSubmitting ? '⏳' : '✓'}
        </button>
      </div>
    </motion.form>
  )
}

export default AnswerInput
