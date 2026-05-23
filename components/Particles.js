'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const COLORS = [
  'rgba(212,175,55,0.45)',
  'rgba(201,184,245,0.35)',
  'rgba(240,168,208,0.35)',
  'rgba(255,255,255,0.18)',
]

function generateParticles() {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 14 + 8,
    delay: Math.random() * 12,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    mx: Math.random() * 30 - 15,
    my: Math.random() * 30 - 15,
  }))
}

export default function Particles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left + '%',
            top: p.top + '%',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: 'blur(1.5px)',
          }}
          animate={{
            x: [0, p.mx, -p.mx * 0.6, 0],
            y: [0, p.my, p.my * 0.4, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
