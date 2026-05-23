'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans  = { fontFamily: "'Nunito', system-ui, sans-serif" }

const FEELINGS = [
  { id: 'ansiedad',   label: 'Ansiedad',             icon: '🌊' },
  { id: 'tristeza',   label: 'Tristeza',              icon: '🌧' },
  { id: 'confusion',  label: 'Confusión',             icon: '🌀' },
  { id: 'esperanza',  label: 'Esperanza',             icon: '✨' },
  { id: 'soledad',    label: 'Soledad',               icon: '🌙' },
  { id: 'gratitud',   label: 'Gratitud',              icon: '🌟' },
  { id: 'miedo',      label: 'Miedo',                 icon: '🔮' },
  { id: 'cansancio',  label: 'Cansancio energético',  icon: '🍃' },
]

export default function FeelingScreen({ onSelect }) {
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
          Paso 1 de 2
        </div>
        <h2 style={{ ...serif, fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: 300, color: 'white', lineHeight: 1.2 }}>
          ¿Cómo te sientes hoy?
        </h2>
        <p style={{ ...serif, color: 'rgba(201,184,245,0.55)', fontStyle: 'italic', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          Selecciona lo que más resuene contigo
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.75rem',
        width: '100%', maxWidth: 400,
      }}>
        {FEELINGS.map((f, idx) => {
          const isSelected = selected === f.id
          return (
            <motion.button
              key={f.id}
              onClick={() => handleClick(f.id)}
              style={{
                ...sans,
                background: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
                border: isSelected
                  ? '1px solid rgba(212,175,55,0.7)'
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
                  ? '0 0 20px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.1)'
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
              <span style={{ fontSize: '1.6rem' }}>{f.icon}</span>
              <span style={{
                ...sans,
                fontSize: '0.78rem',
                fontWeight: 500,
                color: isSelected ? '#e8c84a' : 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                lineHeight: 1.3,
                transition: 'color 0.3s',
              }}>
                {f.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
