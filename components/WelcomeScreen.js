'use client'

import { motion } from 'framer-motion'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans  = { fontFamily: "'Nunito', system-ui, sans-serif" }

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem', textAlign: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Central orb */}
      <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {/* Pulsing energy rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', width: '100%', height: '100%',
              borderRadius: '50%',
              border: `1px solid rgba(212,175,55,${0.35 - i * 0.07})`,
            }}
            animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.6, 0] }}
            transition={{ duration: 3.5, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        {/* Inner glow sphere */}
        <motion.div
          className="float-orb"
          style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(139,92,246,0.2) 50%, transparent 75%)',
            border: '1px solid rgba(212,175,55,0.5)',
            boxShadow: '0 0 30px rgba(212,175,55,0.25), 0 0 60px rgba(139,92,246,0.15), inset 0 0 20px rgba(212,175,55,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem',
          }}
        >
          📶
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h1
          className="shimmer-text"
          style={{
            ...serif,
            fontSize: 'clamp(2.8rem, 10vw, 5rem)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          WIFI ANGELICAL
        </h1>
        <div style={{ ...sans, fontSize: '0.65rem', letterSpacing: '0.55em', color: 'rgba(212,175,55,0.5)', marginBottom: '1rem' }}>
          ™
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        style={{
          ...serif,
          color: 'rgba(201,184,245,0.65)',
          fontSize: '1.1rem', fontStyle: 'italic',
          lineHeight: 1.65, maxWidth: 280, marginBottom: '3rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Tu conexión con los ángeles día a día
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onStart}
        className="glow-btn"
        style={{
          ...sans,
          background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(139,92,246,0.12))',
          border: '1px solid rgba(212,175,55,0.55)',
          color: '#e8c84a',
          padding: '1rem 3.5rem', borderRadius: 60,
          fontSize: '0.9rem', fontWeight: 600,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          transition: 'all 0.25s ease',
          marginBottom: '1.5rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        COMENZAR
      </motion.button>

      {/* Hint */}
      <motion.p
        style={{ ...sans, color: 'rgba(255,255,255,0.18)', fontSize: '0.68rem', letterSpacing: '0.12em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Toca para iniciar tu experiencia angelical
      </motion.p>
    </motion.div>
  )
}
