'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function generateStars() {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 5 + 2,
    delay: Math.random() * 8,
  }))
}

export default function Stars() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    setStars(generateStars())
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
          animate={{ opacity: [0.12, 0.9, 0.12], scale: [1, 1.4, 1] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
