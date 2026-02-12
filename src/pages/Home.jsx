import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiDownload, FiChevronDown, FiGithub, FiLinkedin, FiX, FiBox, FiTarget, FiMapPin, FiCalendar } from 'react-icons/fi'
import {
  SiGmail, SiPython, SiMysql, SiR, SiJavascript, SiReact,
  SiScikitlearn, SiPytorch, SiTensorflow, SiPandas, SiNumpy,
  SiDocker, SiKubernetes, SiGithub as SiGithubIcon, SiJupyter, SiFastapi, SiApachespark,
  SiAmazonwebservices, SiMongodb, SiDatabricks, SiSqlite,
  SiTableau,
} from 'react-icons/si'
import ScrollReveal from '../components/ScrollReveal'
import content from '../data/content'
import './Home.css'

/* ============================================
   Hero helpers
   ============================================ */
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
})

/* ============================================
   About helpers
   ============================================ */
const stats = [
  { value: 3, suffix: '+', label: 'Publications' },
  { value: 8, suffix: '+', label: 'Projects' },
  { value: 2, suffix: '', label: 'Research Papers (IEEE & Springer)' },
]

const statsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function AnimatedCounter({ value, suffix, inView }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const display = useTransform(rounded, (v) => `${v}${suffix}`)
  const ref = useRef(null)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, count, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

function highlightBio(bio) {
  const highlights = [
    'University of Maryland, College Park',
    'machine learning',
    'computer vision',
    'precision agriculture',
    'soccer team captain',
  ]
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = bio.split(pattern)
  return parts.map((part, i) => {
    const isHighlight = highlights.some((h) => h.toLowerCase() === part.toLowerCase())
    return isHighlight ? <span key={i} className="about-highlight">{part}</span> : part
  })
}

/* ============================================
   Skills helpers
   ============================================ */
const skillIconMap = {
  'Python': SiPython, 'SQL': SiMysql, 'R': SiR, 'JavaScript': SiJavascript, 'React.js': SiReact,
  'Scikit-learn': SiScikitlearn, 'PyTorch': SiPytorch, 'TensorFlow': SiTensorflow, 'Pandas': SiPandas, 'NumPy': SiNumpy,
  'FastAPI': SiFastapi, 'Spark': SiApachespark, 'Docker': SiDocker, 'Kubernetes': SiKubernetes,
  'GitHub': SiGithubIcon, 'Jupyter Notebook': SiJupyter,
  'AWS Lambda': SiAmazonwebservices, 'AWS S3': SiAmazonwebservices, 'AWS Bedrock': SiAmazonwebservices, 'AWS SageMaker': SiAmazonwebservices,
  'MongoDB': SiMongodb, 'Databricks': SiDatabricks, 'SQLite': SiSqlite,
  'Tableau': SiTableau,
}

const skillCategories = [
  { key: 'programming', label: 'Programming Languages', colorClass: 'skills-cat--cyan' },
  { key: 'dsAndML', label: 'Data Science & Machine Learning', colorClass: 'skills-cat--purple' },
  { key: 'frameworksAndTools', label: 'Frameworks & Tools', colorClass: 'skills-cat--pink' },
  { key: 'cloudAndDB', label: 'Cloud & Databases', colorClass: 'skills-cat--indigo' },
  { key: 'visualization', label: 'Visualization & BI', colorClass: 'skills-cat--orange' },
]

const skillsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const skillItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

/* ============================================
   Education Modal
   ============================================ */
function EduModal({ edu, onClose }) {
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
        className="modal-content edu-modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal"><FiX /></button>

        <div className="edu-card-header">
          <h2 className="edu-modal-institution">{edu.institution}</h2>
          {edu.current && <span className="edu-current-badge">Current</span>}
        </div>
        <p className="edu-degree">{edu.degree}</p>
        <p className="edu-dates">{edu.dates}</p>
        <p className="edu-gpa">GPA: <span className="gradient-text">{edu.gpa}</span></p>

        <h4 className="modal-tech-label gradient-text">Coursework</h4>
        <div className="edu-coursework">
          {edu.coursework.map((course) => (
            <span key={course} className="edu-course-tag">{course}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================
   Home Component
   ============================================ */
function Home() {
  const { personal, education, skills, experience } = content
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [selectedEdu, setSelectedEdu] = useState(null)
  const [activeExp, setActiveExp] = useState(null)

  const closeEduModal = useCallback(() => setSelectedEdu(null), [])

  // Reverse experience for chronological left-to-right display
  const chronologicalExp = [...experience].reverse()

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') closeEduModal() }
    if (selectedEdu) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [selectedEdu, closeEduModal])

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1 className="hero-name" {...fadeUp(0.2)}>{personal.name}</motion.h1>
          <motion.p className="hero-title" {...fadeUp(0.4)}>{personal.title}</motion.p>
          <motion.p className="hero-tagline" {...fadeUp(0.6)}>{personal.tagline}</motion.p>

          <motion.div className="hero-buttons" {...fadeUp(0.8)}>
            <Link to="/contact" className="hero-btn hero-btn--primary"><FiMail /><span>Get in Touch</span></Link>
            <a href={personal.resumePath} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--outline"><FiDownload /><span>Resume</span></a>
          </motion.div>

          <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }}>
            <FiChevronDown className="hero-scroll-icon" />
          </motion.div>

          <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }}>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub"><FiGithub /></a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href={`mailto:${personal.email}`} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Email"><SiGmail /></a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-container" id="about">
        <ScrollReveal>
          <h2 className="section-title">About Me</h2>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal direction="left" className="about-image-col">
            <div className="about-image-wrapper">
              <img src={personal.profileImage} alt={personal.name} className="about-image" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="about-text-col">
            <p className="about-bio">{highlightBio(personal.bio)}</p>
            <motion.div
              className="about-stats"
              ref={statsRef}
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} className="glass-card about-stat-card" variants={statItemVariants}>
                  <div className="about-stat-number gradient-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                  </div>
                  <div className="about-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Education Section */}
      <section className="section-container" id="education">
        <ScrollReveal>
          <h2 className="section-title edu-title">🎓 Education</h2>
        </ScrollReveal>

        <div className="edu-timeline">
          <ScrollReveal className="edu-timeline-line" />

          {education.map((edu, index) => {
            const isLeft = index % 2 === 0
            const maxCourses = 6
            const visibleCourses = edu.coursework.slice(0, maxCourses)
            const extraCourses = edu.coursework.length - maxCourses

            return (
              <ScrollReveal
                key={edu.institution}
                direction={isLeft ? 'left' : 'right'}
                delay={0.1}
                className={`edu-entry ${isLeft ? 'edu-entry--left' : 'edu-entry--right'}`}
              >
                <div className="edu-dot" />
                <div className="glass-card edu-card" onClick={() => setSelectedEdu(edu)}>
                  <div className="edu-card-header">
                    <h3 className="edu-institution">{edu.institution}</h3>
                    {edu.current && <span className="edu-current-badge">Current</span>}
                  </div>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-dates">{edu.dates}</p>
                  <p className="edu-gpa">GPA: <span className="gradient-text">{edu.gpa}</span></p>
                  <div className="edu-coursework">
                    {visibleCourses.map((course) => (
                      <span key={course} className="edu-course-tag">{course}</span>
                    ))}
                    {extraCourses > 0 && (
                      <span className="edu-course-tag edu-course-tag--extra">+{extraCourses} more</span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedEdu && <EduModal edu={selectedEdu} onClose={closeEduModal} />}
        </AnimatePresence>
      </section>

      {/* Experience Section */}
      <section className="section-container" id="experience">
        <ScrollReveal>
          <h2 className="section-title exp-title gradient-text">💼 Experience</h2>
        </ScrollReveal>

        {/* Desktop horizontal timeline */}
        <ScrollReveal>
          <div className="exp-h-timeline">
            <div className="exp-h-line">
              <div className="exp-h-line-energy" />
            </div>
            {chronologicalExp.map((exp, index) => (
              <div
                key={exp.company}
                className={`exp-h-node ${activeExp === index ? 'exp-h-node--active' : ''}`}
                onMouseEnter={() => setActiveExp(index)}
                onMouseLeave={() => setActiveExp(null)}
                onClick={() => setActiveExp(activeExp === index ? null : index)}
              >
                <div className="exp-h-dot" style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}80` }} />
                <div className="exp-h-label">
                  <span className="exp-h-company">{exp.company}</span>
                  <span className="exp-h-dates">{exp.dates}</span>
                </div>
                <AnimatePresence>
                  {activeExp === index && (
                    <motion.div
                      className="exp-h-card glass-card"
                      style={{ borderTopColor: exp.color }}
                      initial={{ opacity: 0, scale: 0.85, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="exp-h-card-arrow" style={{ borderTopColor: 'rgba(255,255,255,0.08)' }} />
                      <h4 className="exp-card-company">{exp.company}</h4>
                      <p className="exp-card-role" style={{ color: exp.color }}>{exp.role}</p>
                      <p className="exp-card-meta"><FiMapPin className="exp-card-meta-icon" /> {exp.location}</p>
                      <p className="exp-card-meta"><FiCalendar className="exp-card-meta-icon" /> {exp.dates}</p>
                      <p className="exp-card-desc">{exp.description}</p>
                      <div className="exp-card-tags">
                        {exp.techHighlights.map((t) => (
                          <span key={t} className="exp-card-tag" style={{ borderColor: `${exp.color}40`, color: exp.color }}>{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile vertical timeline */}
        <div className="exp-v-timeline">
          <div className="exp-v-line">
            <div className="exp-v-line-energy" />
          </div>
          {chronologicalExp.map((exp) => (
            <ScrollReveal key={exp.company} direction="right" delay={0.1} className="exp-v-entry">
              <div className="exp-v-dot" style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}80` }} />
              <div className="glass-card exp-v-card" style={{ borderLeftColor: exp.color }}>
                <h4 className="exp-card-company">{exp.company}</h4>
                <p className="exp-card-role" style={{ color: exp.color }}>{exp.role}</p>
                <p className="exp-card-meta"><FiMapPin className="exp-card-meta-icon" /> {exp.location}</p>
                <p className="exp-card-meta"><FiCalendar className="exp-card-meta-icon" /> {exp.dates}</p>
                <p className="exp-card-desc">{exp.description}</p>
                <div className="exp-card-tags">
                  {exp.techHighlights.map((t) => (
                    <span key={t} className="exp-card-tag" style={{ borderColor: `${exp.color}40`, color: exp.color }}>{t}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Skills / Technical Stack Section */}
      <section className="section-container" id="skills">
        <ScrollReveal>
          <h2 className="section-title skills-title">🛠 Technical Stack</h2>
        </ScrollReveal>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <ScrollReveal key={cat.key}>
              <div className={`glass-card skills-category-card ${cat.colorClass}`}>
                <div className={`skills-category-bar ${cat.colorClass}`}>
                  <span className="skills-category-bar-text">{cat.label}</span>
                </div>
                <motion.div
                  className="skills-items"
                  variants={skillsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  {skills[cat.key].map((skill) => {
                    const Icon = skillIconMap[skill] || FiBox
                    return (
                      <motion.div key={skill} className="skill-item" variants={skillItemVariants}>
                        <Icon className="skill-icon" />
                        <span className="skill-name">{skill}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Open to Opportunities Banner */}
      <ScrollReveal>
        <div className="opp-banner">
          <div className="opp-banner-inner glass-card">
            <div className="opp-content">
              <div className="opp-icon-wrap">
                <FiTarget className="opp-icon" />
              </div>
              <div className="opp-text">
                <h3 className="opp-title">Open to Opportunities</h3>
                <p className="opp-desc">
                  I&apos;m actively exploring roles where I can apply my data science and machine learning expertise
                  - whether it&apos;s building intelligent systems, uncovering insights from complex datasets, or
                  driving data-informed decisions. If you&apos;re working on something interesting that involves data,
                  let&apos;s connect!
                </p>
              </div>
              <Link to="/contact" className="hero-btn hero-btn--primary opp-btn">
                <FiMail /><span>Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </>
  )
}

export default Home
