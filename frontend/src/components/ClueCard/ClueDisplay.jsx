import { motion } from 'framer-motion'

function ClueDisplay({ clue }) {
  return (
    <motion.div
      className="card p-6 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Clue #{clue.clue_id}
        </span>
        <span className="inline-block ml-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          {clue.difficulty}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">🔍 Main Clue</h3>
        <p className="text-gray-700 text-lg leading-relaxed">{clue.text}</p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h4 className="font-bold text-yellow-800 mb-2">💡 Hint</h4>
        <p className="text-yellow-700">{clue.hint}</p>
      </div>
    </motion.div>
  )
}

export default ClueDisplay
