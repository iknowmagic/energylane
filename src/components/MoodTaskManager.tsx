import { useEffect, useState } from 'react'

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

  const handleMenuSelect = (option: string) => {
    // Navigation logic would go here with TanStack Router
    console.log(`Selected: ${option}`)
  }

  return (
    <div className="bg-black min-h-screen overflow-hidden font-mono text-green-400 text-sm leading-relaxed">
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-[length:100%_4px] bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-20 animate-pulse pointer-events-none"></div>

      <div className="z-10 relative p-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 text-green-300">
            ════════════════════════════════════════════════════════════════
          </div>
          <div className="mb-1 text-xl tracking-wider">
            ██████╗ ███╗ ███╗████████╗███╗ ███╗
          </div>
          <div className="mb-1 text-xl tracking-wider">
            ██╔══██╗████╗ ████║╚══██╔══╝████╗ ████║
          </div>
          <div className="mb-1 text-xl tracking-wider">
            ██████╔╝██╔████╔██║ ██║ ██╔████╔██║
          </div>
          <div className="mb-1 text-xl tracking-wider">
            ██╔═══╝ ██║╚██╔╝██║ ██║ ██║╚██╔╝██║
          </div>
          <div className="mb-4 text-xl tracking-wider">
            ██║ ██║ ╚═╝ ██║ ██║ ██║ ╚═╝ ██║
          </div>
          <div className="mb-2 text-green-300 text-lg tracking-widest">
            PRODUCTIVITY MOOD TASK MANAGER
          </div>
          <div className="text-green-500 text-xs">
            VERSION 1.0 • COPYRIGHT 2025 • MOOD SYSTEMS INC
          </div>
          <div className="mt-2 text-green-300">
            ════════════════════════════════════════════════════════════════
          </div>
        </div>

        {/* System Info */}
        <div className="flex justify-between mb-8 text-green-500 text-xs">
          <div>SYSTEM TIME: {formatTime(currentTime)}</div>
          <div>MEMORY: 640K OK</div>
          <div>USER: ILAN_KAIM</div>
        </div>

        {/* Main Menu */}
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <div className="text-green-300 text-lg tracking-wider">
              ╔══════════════════════════════════════════════════════════╗
            </div>
            <div className="text-green-300 text-lg tracking-wider">
              ║ MAIN MENU ║
            </div>
            <div className="text-green-300 text-lg tracking-wider">
              ╚══════════════════════════════════════════════════════════╝
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleMenuSelect('mood-checkin')}
              className="group hover:bg-green-900 hover:bg-opacity-30 p-3 border border-green-600 w-full text-left transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[1]</span>
                <div className="flex-1">
                  <div className="text-green-400 group-hover:text-green-200 text-base tracking-wide">
                    ► MOOD CHECK-IN
                  </div>
                  <div className="mt-1 text-green-600 text-xs">
                    Single emoji dial logs current emotional state for
                    context-aware task suggestions
                  </div>
                </div>
                <div className="ml-4 text-green-600">😊 ⚡ 😴</div>
              </div>
            </button>

            <button
              onClick={() => handleMenuSelect('instant-task-sort')}
              className="group hover:bg-green-900 hover:bg-opacity-30 p-3 border border-green-600 w-full text-left transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[2]</span>
                <div className="flex-1">
                  <div className="text-green-400 group-hover:text-green-200 text-base tracking-wide">
                    ► INSTANT TASK SORT
                  </div>
                  <div className="mt-1 text-green-600 text-xs">
                    Auto-reshuffle top three tasks to match current energy. Zero
                    extra taps required
                  </div>
                </div>
                <div className="ml-4 text-green-600">★★★</div>
              </div>
            </button>

            <button
              onClick={() => handleMenuSelect('energy-agenda')}
              className="group hover:bg-green-900 hover:bg-opacity-30 p-3 border border-green-600 w-full text-left transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[3]</span>
                <div className="flex-1">
                  <div className="text-green-400 group-hover:text-green-200 text-base tracking-wide">
                    ► ENERGY-AWARE AGENDA
                  </div>
                  <div className="mt-1 text-green-600 text-xs">
                    Peak hours highlighted. Deep-work tasks auto-scheduled for
                    high-energy blocks
                  </div>
                </div>
                <div className="ml-4 text-green-600">████</div>
              </div>
            </button>

            <button
              onClick={() => handleMenuSelect('weekly-insights')}
              className="group hover:bg-green-900 hover:bg-opacity-30 p-3 border border-green-600 w-full text-left transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="mr-4 font-bold text-green-300">[4]</span>
                <div className="flex-1">
                  <div className="text-green-400 group-hover:text-green-200 text-base tracking-wide">
                    ► WEEKLY REFLECTION & INSIGHTS
                  </div>
                  <div className="mt-1 text-green-600 text-xs">
                    Quick chart and prompts capture trends plus one actionable
                    tweak per week
                  </div>
                </div>
                <div className="ml-4 text-green-600">▆▆█</div>
              </div>
            </button>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-green-600 text-xs text-center">
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
        <div className="right-4 bottom-4 left-4 absolute text-green-700 text-xs text-center">
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
