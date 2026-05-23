'use client'

import { motion } from 'framer-motion'

function WifiRings() {
  return (
    <div
      style={{
        position: 'relative',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(212,175,55,0.45)',
          }}
          animate={{ scale: [0.7, 2.2], opacity: [0.7, 0] }}
          transition={{
            duration: 3,
            delay: i * 0.9,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
      <motion.div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          background:
            'radial-gradient(circle, rgba(212,175,55,0.25), rgba(201,184,245,0.1) 70%)',
          border: '1px solid rgba(212,175,55,0.45)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          filter: [
            'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
            'drop-shadow(0 0 22px rgba(212,175,55,0.95))',
            'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        📶
      </motion.div>
    </div>
  )
}

export default function HomeScreen({ onActivate, onOracle, dailyCard, dailyNum }) {
  return (
    <motion.div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.45em',
            color: 'rgba(212,175,55,0.5)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Oráculo Digital
        </div>
        <h1
          className="shimmer-text"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.2rem, 8vw, 3.8rem)',
            fontWeight: 300,
            letterSpacing: '0.12em',
            lineHeight: 1.05,
          }}
        >
          WIFI ANGELICAL
        </h1>
        <div
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.5em',
            color: 'rgba(212,175,55,0.45)',
            marginTop: 2,
          }}
        >
          ™
        </div>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          color: 'rgba(201,184,245,0.7)',
          textAlign: 'center',
          maxWidth: 280,
          lineHeight: 1.7,
          fontSize: '1.05rem',
          fontStyle: 'italic',
          fontWeight: 300,
          marginBottom: '2.5rem',
        }}
      >
        Enciende tu conexión con tus ángeles y recibe tu mensaje.
      </p>

      {/* WiFi animation */}
      <div style={{ marginBottom: '2.5rem' }}>
        <WifiRings />
      </div>

      {/* Main CTA */}
      <motion.button
        onClick={onActivate}
        className="glow-btn"
        style={{
          background:
            'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(201,184,245,0.12))',
          border: '1px solid rgba(212,175,55,0.55)',
          color: '#e8c84a',
          padding: '0.95rem 2rem',
          borderRadius: 60,
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          width: '100%',
          maxWidth: 300,
          marginBottom: 12,
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
        whileTap={{ scale: 0.97 }}
      >
        ✦ Activar mi WiFi Angelical
      </motion.button>

      {/* Oracle button */}
      <button
        onClick={onOracle}
        style={{
          background: 'transparent',
          border: '1px solid rgba(201,184,245,0.2)',
          color: 'rgba(201,184,245,0.55)',
          padding: '0.6rem 1.5rem',
          borderRadius: 60,
          fontSize: '0.82rem',
          marginBottom: '2.5rem',
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        ◈ Buscar número o hora espejo
      </button>

      {/* Daily card teaser */}
      {dailyCard && (
        <motion.div
          className="glass"
          style={{
            borderRadius: 20,
            padding: '1.2rem 1.6rem',
            maxWidth: 320,
            width: '100%',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: 'rgba(212,175,55,0.55)',
              marginBottom: 8,
            }}
          >
            MENSAJE ANGELICAL DE HOY
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.88)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: 5,
            }}
          >
            &ldquo;{dailyCard.mensajeCorto}&rdquo;
          </p>
          <div style={{ fontSize: '0.7rem', color: 'rgba(201,184,245,0.4)' }}>
            Carta {dailyNum} · {dailyCard.titulo}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
