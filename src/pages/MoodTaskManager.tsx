import { MenuItem } from '@/components/MenuItem'
import { useEffect, useState } from 'react'
import BlinkingCursor from '../components/BlinkingCursor'
import Hero from '../components/Hero'
import MainHeader from '../components/MainHeader'
import ScanLinesEffect from '../components/ScanLinesEffect'

const MoodTaskManager = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-hidden bg-black font-mono text-sm leading-relaxed text-green-400">
      {/* Scanlines effect */}
      <ScanLinesEffect />

      <div className="relative z-10 w-full max-w-[760px] p-4">
        {/* Header */}
        <Hero />

        {/* System Info */}
        <div className="mb-8 grid grid-cols-3 text-center text-xs text-green-500">
          <div>SYSTEM TIME: {formatTime(currentTime)}</div>
          <div>MEMORY: 640K OK</div>
          <div>USER: ILAN_KAIM</div>
        </div>

        {/* Main Menu */}
        <div className="mx-auto w-full">
          <MainHeader title="MAIN MENU" />

          <div className="mb-6 flex flex-col gap-4">
            <MenuItem
              location="/mood-check-in"
              number={1}
              title="MOOD CHECK-IN"
              description="Single emoji dial logs current emotional state for context-aware task suggestions"
            >
              😊 ⚡ 😴
            </MenuItem>

            <MenuItem
              location="/instant-task-sort"
              number={2}
              title="INSTANT TASK SORT"
              description="Auto-reshuffle top three tasks to match current energy. Zero extra taps required"
            >
              ★★★
            </MenuItem>

            <MenuItem
              location="/energy-aware-agenda"
              number={3}
              title="ENERGY-AWARE AGENDA"
              description="Peak hours highlighted. Deep-work tasks auto-scheduled for high-energy blocks"
            >
              ████
            </MenuItem>

            <MenuItem
              location="/weekly-reflection-insights"
              number={4}
              title="WEEKLY REFLECTION & INSIGHTS"
              description="Quick chart and prompts capture trends plus one actionable tweak per week"
            >
              ▆▆█
            </MenuItem>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-center text-xs text-green-600">
            <div>
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div>│ PRESS [1-4] TO SELECT MODULE • [ESC] TO EXIT PROGRAM │</div>
            <div>│ USE ARROW KEYS TO NAVIGATE • [ENTER] TO CONFIRM │</div>
            <div>
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          {/* Blinking cursor */}
          <div className="mt-4 text-center">
            <BlinkingCursor text="READY" />
          </div>
        </div>

        {/* Footer */}
        <div className="right-4 bottom-4 left-4 text-center text-xs text-green-700">
          <div>
            ───────────────────────────────────────────────────────────────
          </div>
          <div>F1=HELP • F10=QUIT • ALT+X=EXIT TO DOS</div>
        </div>
      </div>
    </div>
  )
}

export default MoodTaskManager
