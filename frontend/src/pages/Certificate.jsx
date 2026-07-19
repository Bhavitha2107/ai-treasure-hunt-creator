import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CertificateDisplay from '../components/Certificate/CertificateDisplay'
import { certificateAPI } from '../services/api'
import toast from 'react-hot-toast'

function Certificate() {
  const { scoreId } = useParams()
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCertificate()
  }, [scoreId])

  const loadCertificate = async () => {
    try {
      const response = await certificateAPI.getByScore(scoreId)
      setCertificate(response.data)
      setLoading(false)
    } catch (error) {
      toast.error('Error loading certificate')
      console.error(error)
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await certificateAPI.download(scoreId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `certificate_${scoreId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      toast.success('Certificate downloaded!')
    } catch (error) {
      toast.error('Error downloading certificate')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading certificate...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">📜 Your Certificate</h1>

        {certificate && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CertificateDisplay certificate={certificate} />

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleDownload}
                className="btn-primary flex-1"
              >
                📥 Download PDF
              </button>
              <button
                onClick={() => {
                  // Share functionality
                  const text = `I just completed a treasure hunt! ${certificate.pdf_url}`
                  if (navigator.share) {
                    navigator.share({ title: 'My Certificate', text })
                  }
                }}
                className="btn-secondary flex-1"
              >
                🔗 Share
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Certificate
