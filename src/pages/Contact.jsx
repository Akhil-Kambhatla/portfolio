import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FiMail, FiSend, FiMapPin, FiGithub, FiLinkedin, FiCopy } from 'react-icons/fi'
import { SiGmail } from 'react-icons/si'
import ScrollReveal from '../components/ScrollReveal'
import content from '../data/content'
import './Contact.css'



function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="contact-email-row">
      <a href={`mailto:${email}`} className="contact-info-text contact-info-link">{email}</a>
      <button className="contact-copy-btn" onClick={handleCopy} aria-label={`Copy ${email}`}>
        {copied ? <span className="contact-copied-tip">Copied!</span> : <FiCopy />}
      </button>
    </div>
  )
}

function Contact() {
  const { personal } = content
  const [form, setForm] = useState({ from_name: '', from_email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSend = () => {
    if (!form.from_name || !form.from_email || !form.subject || !form.message) return

    setSending(true)
    setToast(null)

    const templateParams = {
      name: form.from_name,
      email: form.from_email,
      subject: form.subject,
      message: form.message,
    }

    console.log('EmailJS sending with params:', templateParams)

    const timeoutId = setTimeout(() => {
      setSending(false)
      setToast({ type: 'error' })
      setTimeout(() => setToast(null), 5000)
    }, 15000)

    emailjs.send(
      'service_4ld638u',
      'template_b7j2glf',
      templateParams,
      '8Ot8CeRlCheucqYpG'
    )
      .then((response) => {
        clearTimeout(timeoutId)
        console.log('SUCCESS!', response.status, response.text)
        setSending(false)
        setToast({ type: 'success' })
        setForm({ from_name: '', from_email: '', subject: '', message: '' })
        setTimeout(() => setToast(null), 3000)
      })
      .catch((err) => {
        clearTimeout(timeoutId)
        console.error('FAILED...', err)
        console.error('Full error:', JSON.stringify(err))
        setSending(false)
        setToast({ type: 'error' })
        setTimeout(() => setToast(null), 5000)
      })
  }

  return (
    <section className="contact-page">
      <ScrollReveal>
        <h1 className="section-title contact-title">Let&apos;s Connect</h1>
        <p className="section-subtitle contact-subtitle">
          I&apos;m always open to discussing new projects, research collaborations, or opportunities
        </p>
      </ScrollReveal>

      <div className="contact-grid">
        {/* Left Column — Email Compose Box */}
        <ScrollReveal direction="left" className="contact-form-col">
          <div className="glass-card contact-compose-card">
            <div className="contact-compose-header">
              <FiMail className="contact-compose-icon" />
              <h2 className="contact-compose-title">Compose</h2>
            </div>

            {toast && (
              <div className={`contact-toast contact-toast--${toast.type}`}>
                {toast.type === 'success'
                  ? 'Message sent successfully!'
                  : <>Oops! Something went wrong. Please <a href={`mailto:${personal.emailAlt}`} className="contact-toast-link">email me directly</a>.</>
                }
              </div>
            )}

            <div className="contact-compose-form">
              <div className="contact-compose-row">
                <span className="contact-compose-label">To:</span>
                <span className="contact-compose-to-pill">{personal.emailAlt}</span>
              </div>
              <div className="contact-compose-sep" />

              <div className="contact-compose-row">
                <span className="contact-compose-label">Name:</span>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your name"
                  value={form.from_name}
                  onChange={handleChange}
                  className="contact-compose-input"
                />
              </div>
              <div className="contact-compose-sep" />

              <div className="contact-compose-row">
                <span className="contact-compose-label">From:</span>
                <input
                  type="email"
                  name="from_email"
                  placeholder="your.email@example.com"
                  value={form.from_email}
                  onChange={handleChange}
                  className="contact-compose-input"
                />
              </div>
              <div className="contact-compose-sep" />

              <div className="contact-compose-row">
                <span className="contact-compose-label">Subject:</span>
                <input
                  type="text"
                  name="subject"
                  placeholder="Let's collaborate!"
                  value={form.subject}
                  onChange={handleChange}
                  className="contact-compose-input"
                />
              </div>
              <div className="contact-compose-sep" />

              <textarea
                name="message"
                rows="8"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                className="contact-compose-input contact-compose-textarea"
              />

              <div className="contact-compose-footer">
                <span className="contact-compose-powered">Powered by EmailJS</span>
                <button
                  type="button"
                  className="contact-send-btn"
                  disabled={sending || !form.from_name || !form.from_email || !form.subject || !form.message}
                  onClick={handleSend}
                >
                  {sending ? <span className="contact-spinner" /> : <FiSend />}
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column — Info Cards */}
        <div className="contact-info-col">
          <ScrollReveal direction="right" delay={0}>
            <div className="glass-card contact-info-card">
              <div className="contact-info-icon-wrap contact-info-icon--gradient">
                <SiGmail className="contact-info-icon" />
              </div>
              <div className="contact-info-content">
                <h3 className="contact-info-title">Email</h3>
                <CopyEmail email={personal.emailAlt} />
                <CopyEmail email={personal.email} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="glass-card contact-info-card">
              <div className="contact-info-icon-wrap contact-info-icon--cyan">
                <FiMapPin className="contact-info-icon" />
              </div>
              <div>
                <h3 className="contact-info-title">Location</h3>
                <p className="contact-info-text">{personal.location}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="glass-card contact-info-card contact-social-card">
              <h3 className="contact-info-title">Social Links</h3>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <FiGithub /> github.com/Akhil-Kambhatla
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <FiLinkedin /> linkedin.com/in/akhil-kambhatla
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
