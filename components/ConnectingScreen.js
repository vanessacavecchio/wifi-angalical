'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans  = { fontFamily: "'Nunito', system-ui, sans-serif" }

export default function ConnectingScreen({ angel, onDone }) {
  const [step, setStep] = useState(0)
  // 0 → "Conectando con los ángeles…"
  // 1 → "Buscando tu mensaje personal…"
  // 2 → "Hoy tienes un mensaje especial del [tipo] [nombre]"

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 2000)
    const t2 = setTimeout(() => setStep(2), 3600)
    const t3 = setTimeout(() => onDone(), 6200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, []) // eslint-disable-line

  const angelColor = angel ? angel.color : '#d4af37'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Large ambient background glow */}
      <motion.div
        style={{
          position: 'fixed', inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${angelColor}18, transparent 65%)`,
          pointerEvents: 'none',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Energy rings */}
      <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 40 + i * 32, height: 40 + i * 32,
              borderRadius: '50%',
              border: `1px solid ${angelColor}${['55','44','33','22','11'][i]}`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.04, 1] }}
            transition={{
              rotate: { duration: 6 + i * 3, repeat: Infinity, ease: 'linear' },
              scale:  { duration: 2 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Center orb */}
        <motion.div
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `radial-gradient(circle, ${angelColor}55, ${angelColor}22, transparent 75%)`,
            border: `1px solid ${angelColor}88`,
            boxShadow: `0 0 30px ${angelColor}44, 0 0 60px ${angelColor}22`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {angel ? angel.simbolo : '✦'}
        </motion.div>
      </div>

      {/* Animated messages */}
      <div style={{ minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="s0"
              style={{ ...serif, fontSize: '1.4rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
            >
              Conectando con los ángeles…
            </motion.p>
          )}
          {step === 1 && (
            <motion.p
              key="s1"
              style={{ ...serif, fontSize: '1.4rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
            >
              Buscando tu mensaje personal…
            </motion.p>
          )}
          {step === 2 && angel && (
            <motion.div
              key="s2"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p style={{ ...sans, fontSize: '0.75rem', letterSpacing: '0.25em', color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase' }}>
                Mensaje especial para ti
              </p>
              <p style={{ ...serif, fontSize: '1.55rem', color: 'white', lineHeight: 1.3 }}>
                {angel.tipo === 'arcángel' ? 'Hoy el Arcángel' : 'Hoy el Ángel'}
              </p>
              <motion.p
                className="shimmer-text"
                style={{ ...serif, fontSize: '2.6rem', fontWeight: 300, letterSpacing: '0.06em' }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {angel.nombre}
              </motion.p>
              <p style={{ ...serif, fontSize: '1.2rem', color: 'rgba(201,184,245,0.7)', fontStyle: 'italic' }}>
                desea hablar contigo
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: i <= step ? 24 : 8, height: 8, borderRadius: 4,
              background: i <= step ? angelColor : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
