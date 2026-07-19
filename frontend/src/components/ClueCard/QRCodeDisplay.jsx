import { motion } from 'framer-motion'
import { generateQRCode } from '../../services/qrGenerator'
import { useEffect, useState } from 'react'

function QRCodeDisplay({ clueId, revealPercentage }) {
  const [qrCode, setQrCode] = useState(null)

  useEffect(() => {
    generateQR()
  }, [])

  const generateQR = async () => {
    try {
      const qr = await generateQRCode(`clue_${clueId}`)
      setQrCode(qr)
    } catch (error) {
      console.error('Error generating QR:', error)
    }
  }

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="font-bold mb-4">📱 QR Code</h3>
      
      {revealPercentage === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-2">Answer the clue correctly to reveal the QR code</p>
          <div className="text-4xl opacity-20">🔒</div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          {qrCode && (
            <img
              src={qrCode}
              alt="QR Code"
              className="w-64 h-64 rounded-lg border-4 border-green-500"
            />
          )}
        </motion.div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Reveal Progress: {revealPercentage}%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${revealPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default QRCodeDisplay
