import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import ScanLinesEffect from '../components/ScanLinesEffect'
import SectionHeader from '../components/SectionHeader'
import SystemInfo from '../components/SystemInfo'

export interface Mood {
  id: string
  emoji: string
  label: string
  energy: number
  description: string
}

const MoodCheckIn = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [blinkingCursor, setBlinkingCursor] = useState(true)
  const navigate = useNavigate()

  const moods = [
    {
      id: 'exhausted',
      emoji: '😴',
      label: 'EXHAUSTED',
      energy: 1,
      description: 'Need rest, minimal tasks only',
    },
    {
      id: 'low',
      emoji: '😑',
      label: 'LOW ENERGY',
      energy: 3,
      description: 'Light tasks, easy wins',
    },
    {
      id: 'neutral',
      emoji: '😐',
      label: 'NEUTRAL',
      energy: 5,
      description: 'Steady work, moderate tasks',
    },
    {
      id: 'good',
      emoji: '🙂',
      label: 'GOOD',
      energy: 7,
      description: 'Productive mode, tackle priorities',
    },
    {
      id: 'energized',
      emoji: '😊',
      label: 'ENERGIZED',
      energy: 9,
      description: 'Peak performance, complex work',
    },
    {
      id: 'hyper',
      emoji: '🤩',
      label: 'HYPER FOCUSED',
      energy: 10,
      description: 'Flow state, deep work sessions',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const blinkTimer = setInterval(() => {
      setBlinkingCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(timer)
      clearInterval(blinkTimer)
    }
  }, [])

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
  }

  const handleConfirm = () => {
    if (selectedMood) {
      console.log('Mood confirmed:', selectedMood)
      // Navigation to next screen would happen here
    }
  }

  interface EnergyBarProps {
    energy: number
  }

  const getEnergyBar = (energy: EnergyBarProps['energy']): string => {
    const bars: number = Math.floor(energy / 2)
    return '█'.repeat(bars) + '░'.repeat(5 - bars)
  }

  return (
    <div className="flex flex-col items-center bg-black min-h-screen overflow-hidden font-mono text-green-400 text-sm leading-relaxed">
      {/* Scanlines effect */}
      <ScanLinesEffect />

      <div className="z-10 relative p-4 w-full max-w-[800px]">
        {/* Header */}
        <SystemInfo currentTime={currentTime} formatTime={formatTime} />

        <SectionHeader title="MOOD CHECK-IN">
          SELECT YOUR CURRENT ENERGY STATE FOR OPTIMAL TASK MATCHING
        </SectionHeader>

        {/* Mood Selection Grid */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="gap-4 grid grid-cols-2 md:grid-cols-3">
            {moods.map((mood, index) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood)}
                className={`p-4 border-2 transition-all duration-200 ${
                  selectedMood?.id === mood.id
                    ? 'border-green-300 bg-green-900 bg-opacity-30'
                    : 'border-green-600 hover:border-green-400 hover:bg-green-900 hover:bg-opacity-20'
                }`}
              >
                <div className="text-center">
                  <div className="mb-2 text-3xl">{mood.emoji}</div>
                  <div className="mb-1 font-bold text-green-300 text-xs">
                    [{index + 1}] {mood.label}
                  </div>
                  <div className="mb-2 text-green-600 text-xs">
                    {mood.description}
                  </div>
                  <div className="text-green-500 text-xs">
                    ENERGY: {getEnergyBar(mood.energy)} ({mood.energy}/10)
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Mood Display */}
        {selectedMood && (
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="text-center">
              <div className="mb-4 text-green-300">
                ┌─────────────────────────────────────────────────────────┐
              </div>
              <div className="mb-2 text-green-300">│ CURRENT SELECTION │</div>
              <div className="mb-4 text-green-300">
                └─────────────────────────────────────────────────────────┘
              </div>

              <div className="mb-2 text-4xl">{selectedMood.emoji}</div>
              <div className="mb-2 text-green-300 text-lg">
                {selectedMood.label}
              </div>
              <div className="mb-2 text-green-500">
                {selectedMood.description}
              </div>
              <div className="text-green-400 text-sm">
                ENERGY LEVEL: {getEnergyBar(selectedMood.energy)} (
                {selectedMood.energy}/10)
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="md:flex md:flex-row justify-center gap-8 grid">
            <Button
              shortcut="[ESC]"
              text="Back to Menu"
              onClick={() => navigate({ to: '/' })}
            />
            <Button
              shortcut="[ENTER]"
              text="Confirm & Continue"
              onClick={handleConfirm}
              disabled={!selectedMood}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 text-green-600 text-xs text-center">
          <div>┌─────────────────────────────────────────────────────────┐</div>
          <div>│ PRESS [1-6] TO SELECT MOOD • [ENTER] TO CONFIRM │</div>
          <div>│ [ESC] BACK TO MENU • [TAB] CYCLE THROUGH OPTIONS │</div>
          <div>└─────────────────────────────────────────────────────────┘</div>
        </div>

        {/* Blinking cursor */}
        <div className="mt-4 text-center">
          <span className="text-green-400">
            {selectedMood
              ? `MOOD SELECTED: ${selectedMood.label}`
              : 'SELECT MOOD TO CONTINUE'}
            {blinkingCursor ? '█' : ' '}
          </span>
        </div>

        {/* Footer */}
        <div className="right-4 bottom-4 left-4 text-green-700 text-xs text-center">
          <div>
            ───────────────────────────────────────────────────────────────
          </div>
          <div>F1=HELP • F10=MAIN MENU • ALT+X=EXIT TO DOS</div>
        </div>
      </div>
    </div>
  )
}

export default MoodCheckIn
