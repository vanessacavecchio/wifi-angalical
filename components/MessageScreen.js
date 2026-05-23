'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans  = { fontFamily: "'Nunito', system-ui, sans-serif" }

// SVG feather fallback — shown if /imagen-pluma.png is not uploaded yet
function FeatherSVG({ color }) {
  return (
    <svg viewBox="0 0 100 160" width="100" height="160" fill="none">
      <defs>
        <radialGradient id="fg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      {/* Quill */}
      <path d="M50 150 Q50 80 55 20" stroke="url(#fg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      {/* Barbs left */}
      {[30,45,60,75,90,105,120,135].map((y,i) => (
        <path key={'l'+i} d={`M50 ${y} Q${30-i*1.5} ${y-8} ${18-i*2} ${y-18}`} stroke="url(#fg)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity={0.6-i*0.04} />
      ))}
      {/* Barbs right */}
      {[30,45,60,75,90,105,120,135].map((y,i) => (
        <path key={'r'+i} d={`M50 ${y} Q${70+i*1.5} ${y-8} ${82+i*2} ${y-18}`} stroke="url(#fg)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity={0.6-i*0.04} />
      ))}
    </svg>
  )
}

export default function MessageScreen({ angel, onReceiveCard }) {
  const [imgErr, setImgErr] = useState(false)
  const angelColor = angel ? angel.color : '#d4af37'

  if (!angel) return null

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem', textAlign: 'center',
        overflowY: 'auto',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${angelColor}12, transparent 60%)`,
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, width: '100%' }}>
        {/* Angel label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            ...sans, fontSize: '0.62rem', letterSpacing: '0.35em',
            color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', marginBottom: '1.5rem',
          }}
        >
          {angel.tipo === 'arcángel' ? 'Arcángel' : 'Ángel'} guardián de hoy
        </motion.div>

        {/* Feather image with glow */}
        <motion.div
          style={{ position: 'relative', marginBottom: '1.5rem' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        >
          {/* Glow behind feather */}
          <motion.div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 140, height: 180,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${angelColor}30, transparent 70%)`,
              filter: 'blur(20px)',
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {!imgErr ? (
            <img
              src="/imagen-pluma.png"
              alt="Pluma angelical"
              onError={() => setImgErr(true)}
              style={{ width: 110, height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.4))' }}
            />
          ) : (
            <div style={{ position: 'relative', zIndex: 1, filter: `drop-shadow(0 0 16px ${angelColor}88)` }}>
              <FeatherSVG color={angelColor} />
            </div>
          )}
        </motion.div>

        {/* Angel name */}
        <motion.h2
          className="shimmer-text"
          style={{ ...serif, fontSize: '3rem', fontWeight: 300, letterSpacing: '0.08em', marginBottom: '0.25rem' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {angel.nombre}
        </motion.h2>

        <motion.div
          style={{ ...sans, fontSize: '0.68rem', letterSpacing: '0.3em', color: angelColor + 'aa', textTransform: 'uppercase', marginBottom: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {angel.frecuencia}
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${angelColor}, transparent)`, marginBottom: '1.5rem' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />

        {/* Message */}
        <motion.div
          className="glass"
          style={{ borderRadius: 20, padding: '1.4rem 1.5rem', marginBottom: '1rem', textAlign: 'left', width: '100%' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <div style={{ ...sans, fontSize: '0.58rem', letterSpacing: '0.25em', color: angelColor + 'aa', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Mensaje canalizado
          </div>
          <p style={{ ...serif, fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', lineHeight: 1.7 }}>
            &ldquo;{angel.mensajeCorto}&rdquo;
          </p>
        </motion.div>

        {/* Significado */}
        <motion.p
          style={{ ...sans, fontSize: '0.8rem', color: 'rgba(201,184,245,0.5)', lineHeight: 1.6, marginBottom: '2rem', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {angel.significado}
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onReceiveCard}
          className="glow-btn"
          style={{
            ...sans,
            background: `linear-gradient(135deg, ${angelColor}20, rgba(139,92,246,0.12))`,
            border: `1px solid ${angelColor}66`,
            color: '#e8c84a',
            padding: '1rem 2.5rem', borderRadius: 60,
            fontSize: '0.88rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            width: '100%',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
        >
          RECIBIR MI CARTA
        </motion.button>
      </div>
    </motion.div>
  )
}
