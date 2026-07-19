import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ClueDisplay from '../components/ClueCard/ClueDisplay'
import QRCodeDisplay from '../components/ClueCard/QRCodeDisplay'
import AnswerInput from '../components/ClueCard/AnswerInput'
import CountdownTimer from '../components/Timer/CountdownTimer'
import { huntAPI, clueAPI, scoreAPI } from '../services/api'
import toast from 'react-hot-toast'

function HuntPlay() {
  const { huntId } = useParams()
  const navigate = useNavigate()
  const [hunt, setHunt] = useState(null)
  const [currentClueIndex, setCurrentClueIndex] = useState(0)
  const [solvedClues, setSolvedClues] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour
  const [qrRevealPercentage, setQrRevealPercentage] = useState(0)

  useEffect(() => {
    loadHunt()
  }, [huntId])

  const loadHunt = async () => {
    try {
      const response = await huntAPI.getById(huntId)
      setHunt(response.data)
      setLoading(false)
    } catch (error) {
      toast.error('Error loading hunt')
      console.error(error)
      setLoading(false)
    }
  }

  const handleAnswerSubmit = async (answer) => {
    try {
      const currentClue = hunt.clues[currentClueIndex]
      const isCorrect = answer.toLowerCase() === currentClue.answer.toLowerCase()

      if (isCorrect) {
        setSolvedClues([...solvedClues, currentClueIndex])
        setQrRevealPercentage(100)
        toast.success('🎉 Correct answer!')

        // If all clues solved, go to results
        if (solvedClues.length + 1 === hunt.clues.length) {
          setTimeout(() => {
            submitScore()
          }, 2000)
        } else {
          // Move to next clue
          setTimeout(() => {
            setCurrentClueIndex(currentClueIndex + 1)
            setQrRevealPercentage(0)
          }, 2000)
        }
      } else {
        toast.error('❌ Incorrect answer, try again!')
      }
    } catch (error) {
      toast.error('Error submitting answer')
      console.error(error)
    }
  }

  const submitScore = async () => {
    try {
      const participantName = localStorage.getItem('participantName')
      const scoreData = {
        hunt_id: huntId,
        user_id: 'user_' + Date.now(),
        clues_solved: solvedClues,
        total_score: solvedClues.length * 100,
        time_taken: 3600 - timeLeft,
      }

      const response = await scoreAPI.submit(scoreData)
      navigate(`/results/${huntId}`, {
        state: { scoreId: response.data.score_id, participantName }
      })
    } catch (error) {
      toast.error('Error submitting score')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Loading hunt...</p>
        </div>
      </div>
    )
  }

  if (!hunt || hunt.clues.length === 0) {
    return <div className="text-center py-12">Hunt not found or has no clues</div>
  }

  const currentClue = hunt.clues[currentClueIndex]
  const progress = ((solvedClues.length) / hunt.clues.length) * 100

  return (
    <motion.div
      className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{hunt.title}</h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Clue {currentClueIndex + 1} of {hunt.clues.length}</span>
            <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Clue Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ClueDisplay clue={currentClue} />
            <AnswerInput onSubmit={handleAnswerSubmit} />
          </motion.div>

          {/* QR Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <QRCodeDisplay
              clueId={currentClue.clue_id}
              revealPercentage={qrRevealPercentage}
            />
          </motion.div>
        </div>

        {/* Solved Clues */}
        <motion.div className="mt-8 card p-6">
          <h3 className="font-bold mb-4">Solved Clues: {solvedClues.length}/{hunt.clues.length}</h3>
          <div className="flex flex-wrap gap-2">
            {hunt.clues.map((clue, idx) => (
              <motion.div
                key={idx}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  solvedClues.includes(idx)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                Clue {idx + 1}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HuntPlay
