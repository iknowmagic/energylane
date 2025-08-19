import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import MainHeader from '../components/MainHeader'
import ScanLinesEffect from '../components/ScanLinesEffect'

const MoodTaskManager = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [blinkingCursor, setBlinkingCursor] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const blinkTimer = setInterval(() => {
      setBlinkingCursor((prev) => !prev)
    }, 800)

    return () => {
      clearInterval(timer)
      clearInterval(blinkTimer)
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
            <Link
              to="/mood-check-in"
              className="group hover:bg-opacity-30 block w-full border border-green-600 p-3 text-left transition-colors duration-200 hover:bg-green-900"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[1]</span>
                <div className="flex-1">
                  <div className="text-base tracking-wide text-green-400 group-hover:text-green-200">
                    ► MOOD CHECK-IN
                  </div>
                  <div className="mt-1 text-xs text-green-600">
                    Single emoji dial logs current emotional state for
                    context-aware task suggestions
                  </div>
                </div>
                <div className="ml-4 text-green-600">😊 ⚡ 😴</div>
              </div>
            </Link>

            <Link
              to="/instant-task-sort"
              className="group hover:bg-opacity-30 block w-full border border-green-600 p-3 text-left transition-colors duration-200 hover:bg-green-900"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[2]</span>
                <div className="flex-1">
                  <div className="text-base tracking-wide text-green-400 group-hover:text-green-200">
                    ► INSTANT TASK SORT
                  </div>
                  <div className="mt-1 text-xs text-green-600">
                    Auto-reshuffle top three tasks to match current energy. Zero
                    extra taps required
                  </div>
                </div>
                <div className="ml-4 text-green-600">★★★</div>
              </div>
            </Link>

            <Link
              to="/energy-aware-agenda"
              className="group hover:bg-opacity-30 block w-full border border-green-600 p-3 text-left transition-colors duration-200 hover:bg-green-900"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[3]</span>
                <div className="flex-1">
                  <div className="text-base tracking-wide text-green-400 group-hover:text-green-200">
                    ► ENERGY-AWARE AGENDA
                  </div>
                  <div className="mt-1 text-xs text-green-600">
                    Peak hours highlighted. Deep-work tasks auto-scheduled for
                    high-energy blocks
                  </div>
                </div>
                <div className="ml-4 text-green-600">████</div>
              </div>
            </Link>

            <Link
              to="/weekly-reflection-insights"
              className="group hover:bg-opacity-30 block w-full border border-green-600 p-3 text-left transition-colors duration-200 hover:bg-green-900"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[4]</span>
                <div className="flex-1">
                  <div className="text-base tracking-wide text-green-400 group-hover:text-green-200">
                    ► WEEKLY REFLECTION & INSIGHTS
                  </div>
                  <div className="mt-1 text-xs text-green-600">
                    Quick chart and prompts capture trends plus one actionable
                    tweak per week
                  </div>
                </div>
                <div className="ml-4 text-green-600">▆▆█</div>
              </div>
            </Link>
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
            <span className="text-green-400">
              READY{blinkingCursor ? '█' : ' '}
            </span>
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
