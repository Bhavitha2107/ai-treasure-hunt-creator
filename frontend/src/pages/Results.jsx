import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const scoreId = location.state?.scoreId
  const participantName = localStorage.getItem('participantName')

  const handleDownloadCertificate = () => {
    // Navigate to certificate page
    if (scoreId) {
      navigate(`/certificate/${scoreId}`)
    } else {
      toast.error('Certificate not found')
    }
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4 bg-gradient-to-br from-green-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl mb-6">🎉</div>
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
        <p className="text-xl text-gray-600 mb-8">
          {participantName}, you've completed the treasure hunt!
        </p>

        <motion.div
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Your Achievement</p>
            <p className="text-4xl font-bold text-primary-600">🏅</p>
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="btn-primary w-full mb-4"
          >
            Download Certificate
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-outline w-full"
          >
            Create Another Hunt
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Results
