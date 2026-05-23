'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GH_BASE =
  'https://raw.githubusercontent.com/vanessacavecchio/wifi-angelical/main/imagenes%20app%20angeles'

function FallbackCard({ number, data }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '2/3',
        borderRadius: 20,
        background: 'linear-gradient(160deg, #1e0840 0%, #2d0f55 40%, #1a0535 100%)',
        border: '1px solid rgba(212,175,55,0.45)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.65), 0 0 60px rgba(212,175,55,0.15)',
      }}
    >
      {/* Inner border */}
      <div
        style={{
          position: 'absolute',
          inset: 14,
          borderRadius: 10,
          border: '1px solid rgba(212,175,55,0.18)',
          pointerEvents: 'none',
        }}
      />
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 12, left: 12, width: 18, height: 18, borderTop: '1.5px solid rgba(212,175,55,0.55)', borderLeft: '1.5px solid rgba(212,175,55,0.55)' }} />
      <div style={{ position: 'absolute', top: 12, right: 12, width: 18, height: 18, borderTop: '1.5px solid rgba(212,175,55,0.55)', borderRight: '1.5px solid rgba(212,175,55,0.55)' }} />
      <div style={{ position: 'absolute', bottom: 12, left: 12, width: 18, height: 18, borderBottom: '1.5px solid rgba(212,175,55,0.55)', borderLeft: '1.5px solid rgba(212,175,55,0.55)' }} />
      <div style={{ position: 'absolute', bottom: 12, right: 12, width: 18, height: 18, borderBottom: '1.5px solid rgba(212,175,55,0.55)', borderRight: '1.5px solid rgba(212,175,55,0.55)' }} />

      {/* Number */}
      <div
        className="shimmer-text"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '5rem',
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: 8,
        }}
      >
        {number}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 40,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
          marginBottom: 14,
        }}
      />

      {/* Emoji */}
      <motion.div
        style={{ fontSize: '2rem', marginBottom: 12, filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.7))' }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {data.emoji}
      </motion.div>

      {/* Title */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.95rem',
          color: 'rgba(201,184,245,0.88)',
          textAlign: 'center',
          fontStyle: 'italic',
          lineHeight: 1.35,
        }}
      >
        {data.titulo}
      </div>
    </div>
  )
}

export default function CardScreen({ num, data, visible, saved, onSave, onAnother, onBack, onOracle }) {
  const [imgErr, setImgErr] = useState(false)
  const imgSrc = GH_BASE + '/' + num + '.jpg'

  useEffect(() => {
    setImgErr(false)
  }, [num])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 1.25rem 2.5rem',
        overflowY: 'auto',
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
    >
      {/* Nav */}
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(201,184,245,0.5)',
            fontSize: '0.82rem',
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          ← Inicio
        </button>
        <button
          onClick={onOracle}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(201,184,245,0.5)',
            fontSize: '0.82rem',
            fontFamily: "'Nunito', system-ui, sans-serif",
          }}
        >
          ◈ Oráculo
        </button>
      </div>

      {/* Status */}
      <div
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'rgba(212,175,55,0.65)',
          textTransform: 'uppercase',
          marginBottom: 22,
        }}
      >
        ✦ Tu WiFi Angelical está encendido ✦
      </div>

      {/* Card reveal */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={num}
            style={{ width: 'min(210px, 54vw)', marginBottom: 22, position: 'relative' }}
            initial={{ opacity: 0, rotateY: 90, scale: 0.82 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88, rotateY: -30 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glow halo */}
            <motion.div
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: 40,
                background: 'radial-gradient(ellipse, rgba(212,175,55,0.22), rgba(201,184,245,0.08) 50%, transparent 70%)',
                filter: 'blur(14px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image or fallback */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {!imgErr ? (
                <img
                  src={imgSrc}
                  alt={'Carta ' + num}
                  onError={() => setImgErr(true)}
                  style={{
                    width: '100%',
                    borderRadius: 18,
                    display: 'block',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.14)',
                  }}
                />
              ) : (
                <FallbackCard number={num} data={data} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence>
        {visible && (
          <motion.div
            style={{ width: '100%', maxWidth: 390 }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.28, duration: 0.65, ease: 'easeOut' }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.8rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.95)',
                textAlign: 'center',
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {data.titulo}
            </h2>

            {/* Short message */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.05rem',
                color: '#e8c84a',
                textAlign: 'center',
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: 22,
              }}
            >
              {data.mensajeCorto}
            </p>

            {/* Significado */}
            <div
              className="glass"
              style={{ borderRadius: 18, padding: '1.15rem 1.3rem', marginBottom: 10 }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(201,184,245,0.55)',
                  textTransform: 'uppercase',
                  marginBottom: 9,
                }}
              >
                Significado
              </div>
              <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.68, fontSize: '0.88rem' }}>
                {data.significado}
              </p>
            </div>

            {/* Acción */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.07), rgba(201,184,245,0.04))',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 18,
                padding: '1.15rem 1.3rem',
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(212,175,55,0.65)',
                  textTransform: 'uppercase',
                  marginBottom: 9,
                }}
              >
                ✦ Acción Sugerida
              </div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.68,
                  fontSize: '0.88rem',
                  fontStyle: 'italic',
                }}
              >
                {data.accionSugerida}
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <motion.button
                onClick={onAnother}
                className="glow-btn"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(201,184,245,0.12))',
                  border: '1px solid rgba(212,175,55,0.5)',
                  color: '#e8c84a',
                  padding: '0.95rem',
                  borderRadius: 60,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  width: '100%',
                  fontFamily: "'Nunito', system-ui, sans-serif",
                }}
                whileTap={{ scale: 0.97 }}
              >
                ✦ Recibir otro mensaje
              </motion.button>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={onSave}
                  style={{
                    flex: 1,
                    background: saved ? 'rgba(201,184,245,0.14)' : 'transparent',
                    border: saved ? '1px solid rgba(201,184,245,0.45)' : '1px solid rgba(201,184,245,0.22)',
                    color: saved ? '#c9b8f5' : 'rgba(201,184,245,0.55)',
                    padding: '0.72rem',
                    borderRadius: 60,
                    fontSize: '0.82rem',
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    transition: 'all 0.3s ease',
                  }}
                >
                  {saved ? '✓ Guardada' : '◈ Guardar carta'}
                </button>

                <button
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid rgba(201,184,245,0.22)',
                    color: 'rgba(201,184,245,0.55)',
                    padding: '0.72rem',
                    borderRadius: 60,
                    fontSize: '0.82rem',
                    fontFamily: "'Nunito', system-ui, sans-serif",
                  }}
                >
                  ↑ Compartir
                </button>
              </div>
            </div>

            {/* Footer */}
            <p
              style={{
                textAlign: 'center',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '0.82rem',
                color: 'rgba(201,184,245,0.28)',
                fontStyle: 'italic',
                marginTop: 28,
                letterSpacing: '0.05em',
              }}
            >
              Tu WiFi Angelical está encendido ✦
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
