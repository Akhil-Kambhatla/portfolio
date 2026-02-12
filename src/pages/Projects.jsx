import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import content from '../data/content'
import './Projects.css'

const categoryBadgeMap = {
  'Data Science': 'badge-ds',
  'Computer Vision': 'badge-cv',
  'Generative AI': 'badge-genai',
  'Machine Learning': 'badge-ml',
  'Deep Learning': 'badge-dl',
  'Time Series': 'badge-timeseries',
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const closeModal = useCallback(() => setSelectedProject(null), [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [selectedProject, closeModal])

  return (
    <section className="projects-page">
      <div className="projects-header">
        <h2 className="section-title">✨ Featured Projects</h2>
        <p className="section-subtitle">
          A collection of academic and personal projects driven by curiosity and a love for problem-solving
        </p>
      </div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {content.projects.map((project) => {
          const badgeClass = categoryBadgeMap[project.category] || 'badge-ml'
          const maxTags = 4
          const visibleTags = project.techStack.slice(0, maxTags)
          const extraCount = project.techStack.length - maxTags

          return (
            <motion.div
              key={project.title}
              className="glass-card project-card"
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-top">
                <span className={`project-badge ${badgeClass}`}>
                  {project.category}
                </span>
                <span className="project-sparkle">✨</span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              <div className="project-tags">
                {visibleTags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
                {extraCount > 0 && (
                  <span className="project-tag project-tag--extra">
                    +{extraCount}
                  </span>
                )}
              </div>

              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub />
                    <span>Code</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  const badgeClass = categoryBadgeMap[project.category] || 'badge-ml'

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
        className="modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <FiX />
        </button>

        <span className={`project-badge ${badgeClass}`}>
          {project.category}
        </span>

        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-desc">{project.description}</p>

        <h4 className="modal-tech-label gradient-text">Tech Stack</h4>
        <div className="modal-tags">
          {project.techStack.map((tag) => (
            <span key={tag} className="modal-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="modal-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn"
            >
              <FiGithub />
              <span>View Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn"
            >
              <FiExternalLink />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Projects
