import { motion } from 'framer-motion'

function ScrollReveal({ children, delay = 0, direction = 'up', distance = 60, className = '' }) {
  const initial = { opacity: 0 }

  if (direction === 'left') {
    initial.x = -distance
  } else if (direction === 'right') {
    initial.x = distance
  } else {
    initial.y = distance
  }

  const animateTo = { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animateTo}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
