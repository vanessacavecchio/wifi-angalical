'use client'

import { useState } from 'react'
import Stars from '../components/Stars'
import Particles from '../components/Particles'
import HomeScreen from '../components/HomeScreen'
import ActivatingScreen from '../components/ActivatingScreen'
import CardScreen from '../components/CardScreen'
import OracleScreen from '../components/OracleScreen'
import { ANGEL_NUMBERS, getRandomCard, getDailyCard } from '../data/oracle'

export default function Page() {
  const [screen, setScreen] = useState('home')
  const [activationStep, setActivationStep] = useState(0)
  const [cardNum, setCardNum] = useState(null)
  const [cardVisible, setCardVisible] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dailyNum] = useState(() => getDailyCard())

  function activate() {
    setScreen('activating')
    setActivationStep(0)
    setTimeout(() => setActivationStep(1), 1400)
    setTimeout(() => setActivationStep(2), 2900)
    setTimeout(() => {
      const card = getRandomCard()
      setCardNum(card)
      setSaved(false)
      setCardVisible(false)
      setScreen('card')
      setTimeout(() => setCardVisible(true), 180)
    }, 4500)
  }

  function receiveAnother() {
    setCardVisible(false)
    setTimeout(() => {
      setCardNum(getRandomCard())
      setSaved(false)
      setTimeout(() => setCardVisible(true), 100)
    }, 380)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 20% 10%, #200a40 0%, #0d0420 50%, #060010 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Background layers */}
      <Stars />
      <Particles />

      {/* Ambient center glow */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.04), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* App screens */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {screen === 'home' && (
          <HomeScreen
            onActivate={activate}
            onOracle={() => setScreen('oracle')}
            dailyCard={ANGEL_NUMBERS[dailyNum]}
            dailyNum={dailyNum}
          />
        )}

        {screen === 'activating' && (
          <ActivatingScreen step={activationStep} />
        )}

        {screen === 'card' && cardNum && (
          <CardScreen
            num={cardNum}
            data={ANGEL_NUMBERS[cardNum]}
            visible={cardVisible}
            saved={saved}
            onSave={() => setSaved(true)}
            onAnother={receiveAnother}
            onBack={() => setScreen('home')}
            onOracle={() => setScreen('oracle')}
          />
        )}

        {screen === 'oracle' && (
          <OracleScreen
            onBack={() => setScreen('home')}
            dailyCard={ANGEL_NUMBERS[dailyNum]}
            dailyNum={dailyNum}
          />
        )}
      </div>
    </div>
  )
}
