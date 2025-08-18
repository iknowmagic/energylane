import { useEffect, useState } from 'react'

export interface Task {
  id: number
  title: string
  energyRequired: number
  category: string
  priority: string
  timeEst: string
}

export interface Mood {
  emoji: string
  label: string
  energy: number
}

const InstantTaskSortScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [blinkingCursor, setBlinkingCursor] = useState(true)
  const [currentMood] = useState({ emoji: '😊', label: 'ENERGIZED', energy: 9 }) // Would come from previous screen
  const [sortAnimation, setSortAnimation] = useState(false)

  // Sample tasks with different energy requirements
  const [tasks] = useState([
    {
      id: 1,
      title: 'Finish quarterly report',
      energyRequired: 9,
      category: 'DEEP WORK',
      priority: 'HIGH',
      timeEst: '3h',
    },
    {
      id: 2,
      title: 'Project strategy meeting',
      energyRequired: 8,
      category: 'MEETING',
      priority: 'HIGH',
      timeEst: '1h',
    },
    {
      id: 3,
      title: 'Code review for new feature',
      energyRequired: 7,
      category: 'TECHNICAL',
      priority: 'MED',
      timeEst: '45m',
    },
    {
      id: 4,
      title: 'Email team about deadlines',
      energyRequired: 4,
      category: 'ADMIN',
      priority: 'MED',
      timeEst: '15m',
    },
    {
      id: 5,
      title: 'Update project documentation',
      energyRequired: 6,
      category: 'WRITING',
      priority: 'LOW',
      timeEst: '2h',
    },
    {
      id: 6,
      title: 'Organize digital files',
      energyRequired: 3,
      category: 'ADMIN',
      priority: 'LOW',
      timeEst: '30m',
    },
    {
      id: 7,
      title: 'Research competitor analysis',
      energyRequired: 8,
      category: 'RESEARCH',
      priority: 'MED',
      timeEst: '2h',
    },
    {
      id: 8,
      title: 'Quick status check-ins',
      energyRequired: 2,
      category: 'SOCIAL',
      priority: 'LOW',
      timeEst: '10m',
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const blinkTimer = setInterval(() => {
      setBlinkingCursor((prev) => !prev)
    }, 800)

    // Trigger sort animation on load
    setSortAnimation(true)
    const animTimer = setTimeout(() => setSortAnimation(false), 1500)

    return () => {
      clearInterval(timer)
      clearInterval(blinkTimer)
      clearTimeout(animTimer)
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

  // Sort tasks based on energy match (closer to current energy = higher priority)
  const sortedTasks = [...tasks].sort((a, b) => {
    const aMatch = Math.abs(a.energyRequired - currentMood.energy)
    const bMatch = Math.abs(b.energyRequired - currentMood.energy)
    return aMatch - bMatch
  })

  interface TaskMatchResult {
    match: 'PERFECT' | 'GOOD' | 'OK' | 'POOR'
  }

  const getTaskMatch = (taskEnergy: number): TaskMatchResult['match'] => {
    const diff = Math.abs(taskEnergy - currentMood.energy)
    if (diff <= 1) return 'PERFECT'
    if (diff <= 2) return 'GOOD'
    if (diff <= 3) return 'OK'
    return 'POOR'
  }

  interface MatchColorMap {
    PERFECT: string
    GOOD: string
    OK: string
    POOR: string
  }

  const getMatchColor = (match: TaskMatchResult['match']): string => {
    const colorMap: MatchColorMap = {
      PERFECT: 'text-green-300',
      GOOD: 'text-green-400',
      OK: 'text-green-500',
      POOR: 'text-green-600',
    }
    return colorMap[match] || 'text-green-600'
  }

  interface EnergyBarProps {
    energy: number
  }

  const getEnergyBar = (energy: EnergyBarProps['energy']): string => {
    const bars = Math.floor(energy / 2)
    return '█'.repeat(bars) + '░'.repeat(5 - bars)
  }

  const topThreeTasks = sortedTasks.slice(0, 3)

  return (
    <div className="flex flex-col items-center bg-black min-h-screen overflow-hidden font-mono text-green-400 text-sm leading-relaxed">
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-[length:100%_4px] bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-20 animate-pulse pointer-events-none"></div>

      <div className="z-10 relative p-4 w-full max-w-[800px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-xs">
          <div className="text-green-500">ENERGYLANE v1.0</div>
          <div className="text-green-500">TIME: {formatTime(currentTime)}</div>
          <div className="text-green-500">USER: ILAN_KAIM</div>
        </div>

        <div className="mb-8 text-center">
          <div className="mb-4 text-green-300">
            ════════════════════════════════════════════════════════════════
          </div>
          <div className="mb-2 text-green-300 text-xl tracking-wider">
            ╔══════════════════════════════════════════════════════════╗
          </div>
          <div className="mb-2 text-green-300 text-xl tracking-wider">
            ║ INSTANT TASK SORT ║
          </div>
          <div className="mb-4 text-green-300 text-xl tracking-wider">
            ╚══════════════════════════════════════════════════════════╝
          </div>
          <div className="mb-4 text-green-500 text-sm">
            TASKS AUTO-SORTED FOR YOUR CURRENT ENERGY STATE
          </div>
          <div className="text-green-300">
            ════════════════════════════════════════════════════════════════
          </div>
        </div>

        {/* System Info */}
        <div className="grid grid-cols-3 mb-8 text-green-500 text-xs text-center">
          <div>TIME: {formatTime(currentTime)}</div>
          <div>ENERGYLANE</div>
          <div>USER: ILAN_KAIM</div>
        </div>

        {/* Current Energy Status */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="bg-green-900 bg-opacity-20 p-4 border border-green-600 text-center">
            <div className="mb-2 text-green-300 text-lg">
              CURRENT ENERGY: {currentMood.emoji} {currentMood.label}
            </div>
            <div className="text-green-400">
              LEVEL: {getEnergyBar(currentMood.energy)} ({currentMood.energy}
              /10)
            </div>
          </div>
        </div>

        {/* Top 3 Recommended Tasks */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="mb-4 text-center">
            <div className="text-green-300 text-lg">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-green-300 text-lg">
              │ TOP 3 TASKS - DO THESE NOW │
            </div>
            <div className="text-green-300 text-lg">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          <div className="space-y-3">
            {topThreeTasks.map((task, index) => {
              const match = getTaskMatch(task.energyRequired)
              return (
                <div
                  key={task.id}
                  className={`p-4 border-2 border-green-300 bg-green-900 bg-opacity-30 ${
                    sortAnimation ? 'animate-pulse' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-1 items-center">
                      <div className="mr-4 font-bold text-green-300 text-lg">
                        ★ {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 text-green-300 text-base">
                          {task.title}
                        </div>
                        <div className="text-green-500 text-xs">
                          {task.category} • {task.priority} PRIORITY • EST:{' '}
                          {task.timeEst}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div
                        className={`font-bold text-sm ${getMatchColor(match)}`}
                      >
                        [BEST NOW]
                      </div>
                      <div className="text-green-600 text-xs">
                        REQ: {getEnergyBar(task.energyRequired)} (
                        {task.energyRequired}/10)
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* All Tasks List */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="mb-4 text-center">
            <div className="text-green-600 text-base">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-green-600 text-base">
              │ ALL TASKS (SORTED) │
            </div>
            <div className="text-green-600 text-base">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          <div className="space-y-2">
            {sortedTasks.slice(3).map((task, index) => {
              const match = getTaskMatch(task.energyRequired)
              return (
                <div
                  key={task.id}
                  className="hover:bg-green-900 hover:bg-opacity-20 p-3 border border-green-600 transition-colors duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-1 items-center">
                      <div className="mr-4 text-green-500">[{index + 4}]</div>
                      <div className="flex-1">
                        <div className="mb-1 text-green-400 text-sm">
                          {task.title}
                        </div>
                        <div className="text-green-600 text-xs">
                          {task.category} • {task.priority} • {task.timeEst}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className={`text-xs ${getMatchColor(match)}`}>
                        {match} MATCH
                      </div>
                      <div className="text-green-700 text-xs">
                        {getEnergyBar(task.energyRequired)} (
                        {task.energyRequired}/10)
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => window.history.back()}
              className="hover:bg-green-900 hover:bg-opacity-30 px-6 py-3 border border-green-600 text-green-400 transition-colors duration-200"
            >
              [ESC] BACK
            </button>

            <button
              onClick={() => setSortAnimation(true)}
              className="hover:bg-green-900 hover:bg-opacity-30 px-6 py-3 border border-green-500 text-green-400 transition-colors duration-200"
            >
              [R] REFRESH SORT
            </button>

            <button
              onClick={() => console.log('Navigate to agenda')}
              className="hover:bg-green-900 hover:bg-opacity-30 px-6 py-3 border border-green-300 text-green-300 transition-colors duration-200"
            >
              [ENTER] VIEW AGENDA
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 text-green-600 text-xs text-center">
          <div>┌─────────────────────────────────────────────────────────┐</div>
          <div>│ [1-8] SELECT TASK • [R] REFRESH • [ENTER] NEXT MODULE │</div>
          <div>│ [ESC] BACK • [SPACE] MARK COMPLETE │</div>
          <div>└─────────────────────────────────────────────────────────┘</div>
        </div>

        {/* Blinking cursor */}
        <div className="mt-4 text-center">
          <span className="text-green-400">
            {sortAnimation
              ? 'SORTING TASKS...'
              : 'TASKS SORTED BY ENERGY MATCH'}
            {blinkingCursor ? '█' : ' '}
          </span>
        </div>

        {/* Footer */}
        <div className="right-4 bottom-4 left-4 text-green-700 text-xs text-center">
          <div>
            ───────────────────────────────────────────────────────────────
          </div>
          <div>F1=HELP • F2=CHANGE MOOD • F10=MAIN MENU • ALT+X=EXIT</div>
        </div>
      </div>
    </div>
  )
}

export default InstantTaskSortScreen
