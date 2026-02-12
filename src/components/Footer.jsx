import { useState, useEffect } from 'react'
import { FiGithub, FiLinkedin, FiArrowUp } from 'react-icons/fi'
import { SiGmail } from 'react-icons/si'
import { motion, AnimatePresence } from 'framer-motion'
import './Footer.css'

function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-gradient-line" />
          <div className="footer-socials">
            <a href="https://github.com/Akhil-Kambhatla" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/akhil-kambhatla-b4914826a/" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
            <a href="mailto:akhilkambhatla.work@gmail.com" target="_blank" rel="noopener noreferrer">
              <SiGmail />
            </a>
          </div>
          <p className="footer-copy">&copy; 2026 Akhil Kambhatla. Built with passion and code.</p>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer
