import { motion } from 'framer-motion'

function LeaderboardTable({ standings }) {
  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <table className="w-full">
        <thead className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Rank</th>
            <th className="px-6 py-4 text-left font-semibold">Player</th>
            <th className="px-6 py-4 text-center font-semibold">Score</th>
            <th className="px-6 py-4 text-center font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((entry, idx) => (
            <motion.tr
              key={idx}
              className={`border-b ${
                idx === 0 ? 'bg-yellow-50' : idx === 1 ? 'bg-gray-100' : idx === 2 ? 'bg-orange-50' : ''
              } hover:bg-gray-50 transition-colors`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <td className="px-6 py-4">
                <span className="text-2xl">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
                </span>
              </td>
              <td className="px-6 py-4 font-medium">{entry.player_name || 'Anonymous'}</td>
              <td className="px-6 py-4 text-center font-bold text-primary-600">
                {entry.score}
              </td>
              <td className="px-6 py-4 text-center text-gray-600">
                {entry.time || '—'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default LeaderboardTable
