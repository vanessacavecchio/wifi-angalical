'use client'

import { motion } from 'framer-motion'

const MESSAGES = [
  'Buscando señal angelical…',
  'Conectando con tus guías…',
  'Mensaje recibido. ✦',
]

export default function ActivatingScreen({ step }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        padding: '2rem',
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.08), rgba(201,184,245,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Spinner */}
      <div style={{ position: 'relative' }}>
        {/* Slow outer ring */}
        <motion.div
          style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* Mid ring */}
        <motion.div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '1px solid rgba(201,184,245,0.2)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Main spinner */}
        <motion.div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '1.5px solid rgba(212,175,55,0.1)',
            borderTop: '1.5px solid rgba(212,175,55,0.9)',
            borderRight: '1.5px solid rgba(212,175,55,0.4)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'rgba(212,175,55,0.8)',
            boxShadow: '0 0 20px 8px rgba(212,175,55,0.3)',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Messages */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'center',
        }}
      >
        {MESSAGES.map((msg, i) => (
          <motion.p
            key={i}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color:
                i < step
                  ? 'rgba(212,175,55,0.35)'
                  : i === step
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(255,255,255,0.1)',
            }}
            animate={
              i === step ? { opacity: [0, 1], y: [10, 0] } : {}
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {msg}
          </motion.p>
        ))}
      </div>

      {/* Shimmer bar */}
      <motion.div
        style={{
          width: 80,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(201,184,245,0.4), transparent)',
        }}
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
