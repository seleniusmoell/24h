import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Schedule from './pages/Schedule'
import Activities from './pages/Activities'
import Performers from './pages/Performers'
import Support from './pages/Support'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/aktiviteter" element={<Activities />} />
          <Route path="/medverkande" element={<Performers />} />
          <Route path="/stod-oss" element={<Support />} />
        </Routes>
      </main>
    </>
  )
}
