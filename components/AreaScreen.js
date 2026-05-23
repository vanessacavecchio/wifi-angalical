'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans  = { fontFamily: "'Nunito', system-ui, sans-serif" }

const AREAS = [
  { id: 'amor',       label: 'Amor',               icon: '💫' },
  { id: 'dinero',     label: 'Dinero',              icon: '🌟' },
  { id: 'proposito',  label: 'Propósito',           icon: '🔮' },
  { id: 'salud',      label: 'Salud',               icon: '🌿' },
  { id: 'familia',    label: 'Familia',             icon: '🌸' },
  { id: 'proteccion', label: 'Protección',          icon: '🛡' },
  { id: 'manifestar', label: 'Manifestación',       icon: '✦' },
  { id: 'espiritual', label: 'Energía espiritual',  icon: '⚡' },
]

const FEELING_LABELS = {
  ansiedad: 'Ansiedad', tristeza: 'Tristeza', confusion: 'Confusión',
  esperanza: 'Esperanza', soledad: 'Soledad', gratitud: 'Gratitud',
  miedo: 'Miedo', cansancio: 'Cansancio energético',
}

export default function AreaScreen({ feeling, onSelect }) {
  const [selected, setSelected] = useState(null)

  function handleClick(id) {
    if (selected) return
    setSelected(id)
    setTimeout(() => onSelect(id), 800)
  }

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.25rem',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ ...sans, fontSize: '0.6rem', letterSpacing: '0.4em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Paso 2 de 2
        </div>
        {feeling && (
          <div style={{
            ...sans,
            display: 'inline-block',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 20, padding: '0.3rem 1rem',
            fontSize: '0.75rem', color: 'rgba(212,175,55,0.7)',
            marginBottom: '0.75rem',
          }}>
            Sentimiento: {FEELING_LABELS[feeling] || feeling}
          </div>
        )}
        <h2 style={{ ...serif, fontSize: 'clamp(1.6rem, 5.5vw, 2.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.25 }}>
          ¿Sobre qué área de tu vida deseas recibir guía angelical?
        </h2>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.75rem',
        width: '100%', maxWidth: 400,
      }}>
        {AREAS.map((a, idx) => {
          const isSelected = selected === a.id
          return (
            <motion.button
              key={a.id}
              onClick={() => handleClick(a.id)}
              style={{
                ...sans,
                background: isSelected ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.04)',
                border: isSelected
                  ? '1px solid rgba(139,92,246,0.65)'
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '1rem 0.75rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.4rem',
                cursor: selected ? 'default' : 'pointer',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                boxShadow: isSelected
                  ? '0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(139,92,246,0.12)'
                  : 'none',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1, y: 0,
                scale: isSelected ? [1, 1.06, 1] : 1,
              }}
              transition={{
                opacity: { delay: idx * 0.06, duration: 0.4 },
                y:       { delay: idx * 0.06, duration: 0.4 },
                scale:   { duration: 0.4 },
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>{a.icon}</span>
              <span style={{
                ...sans,
                fontSize: '0.78rem', fontWeight: 500,
                color: isSelected ? '#c4b5fd' : 'rgba(255,255,255,0.7)',
                textAlign: 'center', lineHeight: 1.3,
                transition: 'color 0.3s',
              }}>
                {a.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
