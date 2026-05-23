'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchOracle } from '../data/oracle'

const QUICK_CHIPS = ['111', '222', '333', '444', '777', '888', '11:11', '22:22', '12:12', '00:00']

export default function OracleScreen({ onBack, dailyCard, dailyNum }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)

  function handleSearch(val) {
    setQuery(val)
    setResult(val.trim() ? searchOracle(val) : null)
  }

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 1.25rem 2rem',
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(201,184,245,0.5)',
            fontSize: '0.82rem',
            display: 'block',
            marginBottom: 20,
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          ← Volver
        </button>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '2rem',
            fontWeight: 300,
            color: 'white',
            marginBottom: 5,
          }}
        >
          Sincronías Divinas
        </h2>
        <p style={{ color: 'rgba(201,184,245,0.6)', fontSize: '0.88rem', marginBottom: 24, lineHeight: 1.55 }}>
          ¿Viste una hora espejo o un número repetido?
        </p>

        {/* Search input */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Escribe 111, 11:11, 22:22…"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: 50,
              padding: '0.9rem 3rem 0.9rem 1.4rem',
              color: 'white',
              fontSize: '0.95rem',
              fontFamily: "'Nunito', system-ui, sans-serif",
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.25)')}
          />
          <span
            style={{
              position: 'absolute',
              right: '1.1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(212,175,55,0.4)',
              pointerEvents: 'none',
            }}
          >
            ✦
          </span>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && result.type !== 'notfound' && (
            <motion.div
              key={result.key}
              className="glass"
              style={{
                borderRadius: 20,
                padding: '1.4rem',
                marginBottom: 16,
                border: '1px solid rgba(212,175,55,0.2)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div
                className="shimmer-text"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '2.8rem',
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: 5,
                }}
              >
                {result.key}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.4rem',
                  color: 'white',
                  marginBottom: 5,
                  fontWeight: 400,
                }}
              >
                {result.data.titulo}
              </h3>
              <p style={{ color: '#e8c84a', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 12 }}>
                {result.data.mensajeCorto}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontSize: '0.86rem', marginBottom: 12 }}>
                {result.data.significado}
              </p>
              <div
                style={{
                  background: 'rgba(212,175,55,0.06)',
                  borderLeft: '2px solid rgba(212,175,55,0.35)',
                  borderRadius: '0 10px 10px 0',
                  padding: '0.7rem 0.9rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(212,175,55,0.6)',
                    marginBottom: 4,
                  }}
                >
                  ACCIÓN
                </div>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.86rem', fontStyle: 'italic' }}>
                  {result.data.accionSugerida}
                </p>
              </div>
            </motion.div>
          )}

          {result && result.type === 'notfound' && (
            <motion.div
              className="glass"
              style={{ borderRadius: 16, padding: '1.1rem', textAlign: 'center', marginBottom: 16 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p style={{ color: 'rgba(201,184,245,0.55)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                Esta combinación no está en el oráculo. Prueba con 111, 222, 11:11…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick chips */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(201,184,245,0.4)',
              marginBottom: 10,
            }}
          >
            CONSULTAS FRECUENTES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUICK_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => handleSearch(c)}
                style={{
                  background: query === c ? 'rgba(212,175,55,0.18)' : 'rgba(255,255,255,0.03)',
                  border: query === c ? '1px solid rgba(212,175,55,0.45)' : '1px solid rgba(255,255,255,0.08)',
                  color: query === c ? '#e8c84a' : 'rgba(201,184,245,0.5)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                  fontFamily: "'Nunito', system-ui, sans-serif",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Daily card */}
        {dailyCard && (
          <div
            className="glass"
            style={{ borderRadius: 18, padding: '1.15rem 1.4rem' }}
          >
            <div
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                color: 'rgba(212,175,55,0.5)',
                marginBottom: 8,
              }}
            >
              MENSAJE ANGELICAL DEL DÍA
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.08rem',
                color: 'rgba(255,255,255,0.88)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: 5,
              }}
            >
              &ldquo;{dailyCard.mensajeCorto}&rdquo;
            </p>
            <div style={{ color: 'rgba(201,184,245,0.35)', fontSize: '0.7rem' }}>
              {dailyCard.titulo} · Carta {dailyNum}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
