'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans  = { fontFamily: "'Nunito', system-ui, sans-serif" }

export default function CardScreen({ angel, feeling, area, onRestart }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [revealed, setRevealed] = useState(false)

  if (!angel) return null

  const angelColor = angel.color

  function handleFlip() {
    if (!isFlipped) setRevealed(true)
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '1.5rem 1.25rem 3rem',
        overflowY: 'auto',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `radial-gradient(ellipse at 50% 25%, ${angelColor}10, transparent 60%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '1.5rem', width: '100%' }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div style={{ ...sans, fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Tu carta angelical
          </div>
          <h2 style={{ ...serif, fontSize: '1.9rem', fontWeight: 300, color: 'white' }}>
            {angel.nombre}
          </h2>
          <p style={{ ...serif, color: 'rgba(201,184,245,0.5)', fontStyle: 'italic', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {!revealed ? 'Toca la carta para revelar tu mensaje' : isFlipped ? 'Toca para volver al frente' : 'Toca para ver el reverso'}
          </p>
        </motion.div>

        {/* ── 3D Flip Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ width: 'min(300px, 82vw)', marginBottom: '2rem' }}
        >
          {/* Perspective wrapper */}
          <div
            onClick={handleFlip}
            style={{ perspective: '1200px', cursor: 'pointer', width: '100%' }}
          >
            <motion.div
              style={{
                width: '100%',
                transformStyle: 'preserve-3d',
                position: 'relative',
                minHeight: 'min(440px, 60vh)',
              }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* ── FRONT FACE ── */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 24,
                  background: `linear-gradient(160deg, #1a0535 0%, #0f0228 50%, #050010 100%)`,
                  border: `1px solid ${angelColor}55`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${angelColor}22`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '2.5rem 1.5rem',
                  overflow: 'hidden',
                }}
              >
                {/* Corner accents */}
                <div style={{ position:'absolute', top:14, left:14, width:20, height:20, borderTop:`1.5px solid ${angelColor}66`, borderLeft:`1.5px solid ${angelColor}66` }} />
                <div style={{ position:'absolute', top:14, right:14, width:20, height:20, borderTop:`1.5px solid ${angelColor}66`, borderRight:`1.5px solid ${angelColor}66` }} />
                <div style={{ position:'absolute', bottom:14, left:14, width:20, height:20, borderBottom:`1.5px solid ${angelColor}66`, borderLeft:`1.5px solid ${angelColor}66` }} />
                <div style={{ position:'absolute', bottom:14, right:14, width:20, height:20, borderBottom:`1.5px solid ${angelColor}66`, borderRight:`1.5px solid ${angelColor}66` }} />
                {/* Inner glow */}
                <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'80%', height:'50%', background:`radial-gradient(ellipse, ${angelColor}12, transparent 70%)`, pointerEvents:'none' }} />

                {/* Symbol */}
                <motion.div
                  style={{ fontSize: '3.5rem', marginBottom: '1rem', filter: `drop-shadow(0 0 16px ${angelColor}88)` }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {angel.simbolo}
                </motion.div>

                {/* Number / name */}
                <div
                  className="shimmer-text"
                  style={{ ...serif, fontSize: '2.8rem', fontWeight: 300, lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '0.04em' }}
                >
                  {angel.nombre}
                </div>

                <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${angelColor}, transparent)`, marginBottom: '1rem' }} />

                <p style={{ ...serif, fontSize: '1rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                  {angel.mensajeCorto}
                </p>

                {/* Flip hint */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <motion.span
                    style={{ ...sans, fontSize: '0.7rem', color: `${angelColor}99`, letterSpacing: '0.15em' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    TOCA PARA REVELAR ✦
                  </motion.span>
                </div>
              </div>

              {/* ── BACK FACE ── */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: 24,
                  background: `linear-gradient(160deg, #0d0230 0%, #180540 50%, #0a011a 100%)`,
                  border: `1px solid ${angelColor}44`,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${angelColor}18`,
                  display: 'flex', flexDirection: 'column',
                  padding: '1.5rem',
                  overflowY: 'auto',
                }}
              >
                <div style={{ ...sans, fontSize: '0.58rem', letterSpacing: '0.25em', color: `${angelColor}99`, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Interpretación completa
                </div>
                <p style={{ ...serif, fontSize: '1rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.25rem', flexGrow: 1 }}>
                  {angel.interpretacion}
                </p>

                <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, transparent, ${angelColor}44, transparent)`, marginBottom: '1rem' }} />

                <div style={{ ...sans, fontSize: '0.58rem', letterSpacing: '0.25em', color: `${angelColor}88`, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  ✦ Acción sugerida
                </div>
                <p style={{ ...serif, fontSize: '0.95rem', color: 'rgba(201,184,245,0.85)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  {angel.accion}
                </p>

                <div style={{ ...sans, fontSize: '0.68rem', color: `${angelColor}77`, textAlign: 'center', marginTop: '0.5rem', letterSpacing: '0.08em' }}>
                  {angel.frecuencia}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* After reveal — extra details */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              style={{ width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Frequency badge */}
              <div
                className="glass-gold"
                style={{ borderRadius: 14, padding: '0.8rem 1rem', textAlign: 'center', marginBottom: '0.75rem' }}
              >
                <span style={{ ...sans, fontSize: '0.75rem', color: 'rgba(212,175,55,0.75)' }}>
                  🔊 {angel.frecuencia}
                </span>
              </div>

              {/* Restart */}
              <button
                onClick={onRestart}
                style={{
                  ...sans,
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(201,184,245,0.2)',
                  color: 'rgba(201,184,245,0.5)',
                  padding: '0.85rem', borderRadius: 60,
                  fontSize: '0.82rem', letterSpacing: '0.1em',
                  marginTop: '0.5rem',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(201,184,245,0.4)'; e.target.style.color = 'rgba(201,184,245,0.8)' }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(201,184,245,0.2)'; e.target.style.color = 'rgba(201,184,245,0.5)' }}
              >
                ↺ Nueva experiencia angelical
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
