import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackgroundBlobs from './components/BackgroundBlobs'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <BackgroundBlobs />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
