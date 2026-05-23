'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const COLS = [
  'rgba(212,175,55,0.4)',
  'rgba(201,184,245,0.3)',
  'rgba(147,197,253,0.3)',
  'rgba(240,168,208,0.3)',
  'rgba(255,255,255,0.15)',
]

function gen() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 16 + 8,
    delay: Math.random() * 12,
    color: COLS[Math.floor(Math.random() * COLS.length)],
    mx: (Math.random() - 0.5) * 40,
    my: (Math.random() - 0.5) * 40,
  }))
}

export default function Particles() {
  const [ps, setPs] = useState([])
  useEffect(() => { setPs(gen()) }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {ps.map((p) => (
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
          animate={{ x: [0, p.mx, -p.mx * 0.5, 0], y: [0, p.my, p.my * 0.4, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
