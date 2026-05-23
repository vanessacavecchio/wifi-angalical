'use client'

import { useState, useRef } from 'react'
import Stars from '../components/Stars'
import Particles from '../components/Particles'
import WelcomeScreen from '../components/WelcomeScreen'
import FeelingScreen from '../components/FeelingScreen'
import AreaScreen from '../components/AreaScreen'
import ConnectingScreen from '../components/ConnectingScreen'
import MessageScreen from '../components/MessageScreen'
import CardScreen from '../components/CardScreen'
import { getRandomAngel } from '../data/oracle'

// Audio from GitHub repo
const AUDIO_URL =
  'https://raw.githubusercontent.com/vanessacavecchio/wifi-angalical/main/SERENADE%20%20pachebell.mp3'

export default function Page() {
  const [screen, setScreen] = useState('welcome')
  const [feeling, setFeeling] = useState(null)
  const [area, setArea] = useState(null)
  const [angel, setAngel] = useState(null)
  const audioRef = useRef(null)

  // Try to play audio — works on desktop immediately,
  // on mobile it fires on the first user gesture (COMENZAR click)
  function playAudio() {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
    const p = audio.play()
    if (p !== undefined) {
      p.catch(() => {
        // Mobile blocked autoplay — attach one-time listener for next touch
        const resume = () => {
          audio.play().catch(() => {})
          document.removeEventListener('touchstart', resume)
          document.removeEventListener('click', resume)
        }
        document.addEventListener('touchstart', resume, { once: true })
        document.addEventListener('click', resume, { once: true })
      })
    }
  }

  function handleStart() {
    playAudio()
    setScreen('feeling')
  }

  function handleFeelingSelect(f) {
    setFeeling(f)
    setTimeout(() => setScreen('area'), 700)
  }

  function handleAreaSelect(a) {
    setArea(a)
    const selected = getRandomAngel()
    setAngel(selected)
    setTimeout(() => setScreen('connecting'), 700)
  }

  function handleConnectingDone() {
    setScreen('message')
  }

  function handleReceiveCard() {
    setScreen('card')
  }

  function handleRestart() {
    setFeeling(null)
    setArea(null)
    setAngel(null)
    setScreen('welcome')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 25% 0%, #1a0535 0%, #0a0118 45%, #020008 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />

      {/* Background layers */}
      <Stars />
      <Particles />

      {/* Soft center glow overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.05), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Screens */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {screen === 'welcome' && (
          <WelcomeScreen onStart={handleStart} />
        )}
        {screen === 'feeling' && (
          <FeelingScreen onSelect={handleFeelingSelect} />
        )}
        {screen === 'area' && (
          <AreaScreen feeling={feeling} onSelect={handleAreaSelect} />
        )}
        {screen === 'connecting' && (
          <ConnectingScreen angel={angel} onDone={handleConnectingDone} />
        )}
        {screen === 'message' && (
          <MessageScreen angel={angel} onReceiveCard={handleReceiveCard} />
        )}
        {screen === 'card' && (
          <CardScreen angel={angel} feeling={feeling} area={area} onRestart={handleRestart} />
        )}
      </div>
    </div>
  )
}
