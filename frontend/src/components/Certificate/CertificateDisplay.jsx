import { motion } from 'framer-motion'

function CertificateDisplay({ certificate }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-2xl p-12 text-center max-w-2xl mx-auto border-4 border-yellow-500"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      {/* Decorative corners */}
      <div className="absolute top-6 left-6 text-4xl">🎖️</div>
      <div className="absolute top-6 right-6 text-4xl">🎖️</div>

      {/* Header */}
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-2">
        Certificate of Achievement
      </h2>
      <div className="h-1 w-20 bg-gradient-to-r from-yellow-600 to-amber-600 mx-auto mb-8"></div>

      {/* Content */}
      <p className="text-gray-600 mb-4">This is to certify that</p>
      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        {certificate.participant_name}
      </h3>

      <p className="text-gray-600 mb-2">
        has successfully {certificate.position === 'winner' ? 'won' : 'participated in'} the
      </p>
      <p className="text-2xl font-bold text-primary-600 mb-8">
        🏆 Treasure Hunt Challenge
      </p>

      {/* Date and seal */}
      <div className="border-t-2 border-gray-300 pt-6 mt-8">
        <p className="text-sm text-gray-500 mb-6">
          Issued on {new Date(certificate.issued_date).toLocaleDateString()}
        </p>
        <div className="text-5xl">✨</div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-6 left-6 text-4xl">🎉</div>
      <div className="absolute bottom-6 right-6 text-4xl">🎉</div>
    </motion.div>
  )
}

export default CertificateDisplay
