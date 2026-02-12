import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFileText, FiCalendar, FiExternalLink, FiX } from 'react-icons/fi'
import ScrollReveal from '../components/ScrollReveal'
import content from '../data/content'
import './Research.css'

function highlightAuthor(authors) {
  const name = 'Akhil Kambhatla'
  const idx = authors.indexOf(name)
  if (idx === -1) return authors
  return (
    <>
      {authors.slice(0, idx)}
      <span className="research-author-highlight">{name}</span>
      {authors.slice(idx + name.length)}
    </>
  )
}

function PubModal({ pub, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content pub-modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal"><FiX /></button>

        <span className={`research-status research-status--${pub.status.toLowerCase().replace(/\s+/g, '-')}`}>
          {pub.status}
        </span>

        <h2 className="pub-modal-title">{pub.title}</h2>
        <p className="pub-modal-authors">{highlightAuthor(pub.authors)}</p>
        <p className="pub-modal-venue">{pub.venue}</p>

        <p className="pub-modal-date">
          <FiCalendar className="research-footer-icon" /> {pub.date}
        </p>

        <p className="pub-modal-abstract">{pub.abstract}</p>

        <div className="pub-modal-keywords">
          {pub.keywords.map((kw) => (
            <span key={kw} className="research-keyword-tag">{kw}</span>
          ))}
        </div>

        {pub.link && (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="pub-modal-btn">
            <FiExternalLink /> Read Paper
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}

function Research() {
  const { publications } = content
  const [selectedPub, setSelectedPub] = useState(null)

  const closeModal = useCallback(() => setSelectedPub(null), [])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeModal() }
    if (selectedPub) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [selectedPub, closeModal])

  return (
    <section className="research-page">
      <ScrollReveal>
        <h1 className="section-title research-title">📖 Research &amp; Publications</h1>
      </ScrollReveal>

      <div className="research-list">
        {publications.map((pub, index) => (
          <ScrollReveal key={pub.title} delay={index * 0.1}>
            <div className="glass-card research-card" onClick={() => setSelectedPub(pub)}>
              <div className="research-card-top">
                <div className="research-icon-wrap">
                  <FiFileText className="research-icon" />
                </div>
                <div className="research-card-header">
                  <h3 className="research-card-title">{pub.title}</h3>
                  <p className="research-card-authors">{highlightAuthor(pub.authors)}</p>
                  <p className="research-card-venue">{pub.venue}</p>
                </div>
                <span className={`research-status research-status--${pub.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {pub.status}
                </span>
              </div>

              <p className="research-card-abstract">{pub.abstract}</p>

              <div className="research-card-keywords">
                {pub.keywords.map((kw) => (
                  <span key={kw} className="research-keyword-tag">{kw}</span>
                ))}
              </div>

              <div className="research-card-footer">
                <span className="research-card-date">
                  <FiCalendar className="research-footer-icon" /> {pub.date}
                </span>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-card-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="research-footer-icon" /> Read Paper
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {selectedPub && <PubModal pub={selectedPub} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}

export default Research
