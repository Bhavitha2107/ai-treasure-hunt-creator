import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navigation/Navbar'
import Home from './pages/Home'
import CreateHunt from './pages/CreateHunt'
import JoinHunt from './pages/JoinHunt'
import HuntPlay from './pages/HuntPlay'
import Leaderboard from './pages/Leaderboard'
import Results from './pages/Results'
import Certificate from './pages/Certificate'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateHunt />} />
          <Route path="/join" element={<JoinHunt />} />
          <Route path="/hunt/:huntId" element={<HuntPlay />} />
          <Route path="/leaderboard/:huntId" element={<Leaderboard />} />
          <Route path="/results/:huntId" element={<Results />} />
          <Route path="/certificate/:scoreId" element={<Certificate />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
