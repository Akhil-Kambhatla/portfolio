import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiCode, FiBookOpen, FiMail, FiMenu, FiX } from 'react-icons/fi'
import content from '../data/content'
import './Navbar.css'

const iconMap = {
  home: FiHome,
  code: FiCode,
  book: FiBookOpen,
  mail: FiMail,
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          Portfolio
        </NavLink>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`navbar-links ${menuOpen ? 'navbar-links--open' : ''}`}>
          {content.navLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? 'navbar-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {Icon && <Icon className="navbar-link-icon" />}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
