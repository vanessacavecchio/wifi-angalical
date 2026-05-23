'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function gen() {
  return Array.from({ length: 90 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.4,
    duration: Math.random() * 5 + 2,
    delay: Math.random() * 9,
  }))
}

export default function Stars() {
  const [stars, setStars] = useState([])
  useEffect(() => { setStars(gen()) }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: s.left + '%',
            top: s.top + '%',
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'white',
          }}
          animate={{ opacity: [0.1, 0.85, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
