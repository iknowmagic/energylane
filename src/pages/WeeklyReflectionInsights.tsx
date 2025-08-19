import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import ScanLinesEffect from '../components/ScanLinesEffect'
import SectionHeader from '../components/SectionHeader'
import SystemInfo from '../components/SystemInfo'

// Exported interfaces for type safety
export interface WeeklyData {
  days: Array<string>
  energyLevels: Array<number>
  lowEnergyTasks: Array<number>
  highEnergyTasks: Array<number>
  totalLowTasks: Array<number>
  totalHighTasks: Array<number>
}

export interface ReflectionAnswers {
  blockers: string
  change: string
}

export type FormatTimeFn = (date: Date) => string
export type GetEnergyBarFn = (energy: number) => string
export type GetCompletionBarFn = (completed: number, total: number) => string
export type HandleReflectionChangeFn = (field: string, value: string) => void

const WeeklyInsightsScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [blinkingCursor, setBlinkingCursor] = useState(true)
  const navigate = useNavigate()
  const [currentWeek] = useState('AUG 11-17, 2025')
  const [reflectionAnswers, setReflectionAnswers] = useState({
    blockers: '',
    change: '',
  })

  // Weekly data (mock data for demonstration)
  const weeklyData = {
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    energyLevels: [7, 8, 6, 9, 8, 5, 4], // Average energy per day
    lowEnergyTasks: [3, 4, 2, 5, 4, 6, 3], // Completed low-energy tasks
    highEnergyTasks: [2, 3, 1, 4, 3, 1, 0], // Completed high-energy tasks
    totalLowTasks: [4, 5, 3, 6, 5, 7, 4], // Total low-energy tasks
    totalHighTasks: [4, 4, 3, 5, 4, 3, 2], // Total high-energy tasks
  }

  // Calculate completion rates
  const lowEnergyCompletion = Math.round(
    (weeklyData.lowEnergyTasks.reduce((a, b) => a + b, 0) /
      weeklyData.totalLowTasks.reduce((a, b) => a + b, 0)) *
      100,
  )

  const highEnergyCompletion = Math.round(
    (weeklyData.highEnergyTasks.reduce((a, b) => a + b, 0) /
      weeklyData.totalHighTasks.reduce((a, b) => a + b, 0)) *
      100,
  )

  const insights = [
    'Your peak energy days (THU, FRI) had 75% high-energy task completion',
    'Low energy weekend matches reduced task load - good self-awareness!',
    'Wednesday dip coincided with only 33% high-energy completion',
    'Best momentum: Tuesday-Thursday with consistent 7+ energy levels',
  ]

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

  const formatTime: FormatTimeFn = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getEnergyBar: GetEnergyBarFn = (energy) => {
    const bars = Math.floor(energy / 2)
    return '█'.repeat(bars) + '░'.repeat(5 - bars)
  }

  const getCompletionBar: GetCompletionBarFn = (completed, total) => {
    if (total === 0) return '░░░░░░░░'
    const percentage = completed / total
    const bars = Math.floor(percentage * 8)
    return '█'.repeat(bars) + '░'.repeat(8 - bars)
  }

  const handleReflectionChange: HandleReflectionChangeFn = (field, value) => {
    setReflectionAnswers((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-black font-mono text-sm leading-relaxed text-green-400">
      {/* Scanlines effect */}
      <ScanLinesEffect />

      <div className="relative z-10 w-full max-w-[800px] p-4">
        {/* Header */}
        <SystemInfo currentTime={currentTime} formatTime={formatTime} />

        <SectionHeader title="WEEKLY REFLECTION & INSIGHTS">
          <div className="mb-2 text-sm text-green-500">
            WEEK OF {currentWeek}
          </div>
          <div className="mb-4 text-xs text-green-500">
            ANALYZE PATTERNS • IDENTIFY IMPROVEMENTS • PLAN AHEAD
          </div>
        </SectionHeader>

        {/* Weekly Overview Stats */}
        <div className="mx-auto mb-8 max-w-6xl">
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-4">
            <div className="bg-opacity-20 border border-green-600 bg-green-900 p-4">
              <div className="mb-2 text-lg text-green-300">
                {lowEnergyCompletion}%
              </div>
              <div className="text-xs text-green-500">LOW-ENERGY TASKS</div>
              <div className="mt-1 text-xs text-green-600">27/34 completed</div>
            </div>
            <div className="bg-opacity-20 border border-green-600 bg-green-900 p-4">
              <div className="mb-2 text-lg text-green-300">
                {highEnergyCompletion}%
              </div>
              <div className="text-xs text-green-500">HIGH-ENERGY TASKS</div>
              <div className="mt-1 text-xs text-green-600">14/25 completed</div>
            </div>
            <div className="bg-opacity-20 border border-green-600 bg-green-900 p-4">
              <div className="mb-2 text-lg text-green-300">6.7</div>
              <div className="text-xs text-green-500">AVG ENERGY LEVEL</div>
              <div className="mt-1 text-xs text-green-600">
                Good week overall
              </div>
            </div>
            <div className="bg-opacity-20 border border-green-600 bg-green-900 p-4">
              <div className="mb-2 text-lg text-green-300">4</div>
              <div className="text-xs text-green-500">PEAK ENERGY DAYS</div>
              <div className="mt-1 text-xs text-green-600">
                Thu-Fri strongest
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Charts */}
        <div className="mx-auto mb-8 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Energy Levels Chart */}
            <div>
              <div className="mb-4 text-center">
                <div className="text-base text-green-300">
                  ┌─────────────────────────────────────┐
                </div>
                <div className="text-base text-green-300">
                  │ DAILY ENERGY LEVELS │
                </div>
                <div className="text-base text-green-300">
                  └─────────────────────────────────────┘
                </div>
              </div>

              <div className="space-y-2">
                {weeklyData.days.map((day, index) => (
                  <div
                    key={day}
                    className="flex items-center border border-green-600 p-2"
                  >
                    <div className="mr-4 w-8 text-center text-green-300">
                      {day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="mr-3 w-20">
                          {getEnergyBar(weeklyData.energyLevels[index])}
                        </div>
                        <div className="text-xs text-green-400">
                          {weeklyData.energyLevels[index]}/10
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Completion Chart */}
            <div>
              <div className="mb-4 text-center">
                <div className="text-base text-green-300">
                  ┌─────────────────────────────────────┐
                </div>
                <div className="text-base text-green-300">
                  │ TASK COMPLETION RATES │
                </div>
                <div className="text-base text-green-300">
                  └─────────────────────────────────────┘
                </div>
              </div>

              <div className="space-y-3">
                {weeklyData.days.map((day, index) => (
                  <div key={day} className="border border-green-600 p-2">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-bold text-green-300">{day}</div>
                      <div className="text-xs text-green-600">
                        {weeklyData.lowEnergyTasks[index] +
                          weeklyData.highEnergyTasks[index]}
                        /
                        {weeklyData.totalLowTasks[index] +
                          weeklyData.totalHighTasks[index]}{' '}
                        total
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <div className="mr-2 w-12 text-green-500">LOW:</div>
                        <div className="mr-2 w-20">
                          {getCompletionBar(
                            weeklyData.lowEnergyTasks[index],
                            weeklyData.totalLowTasks[index],
                          )}
                        </div>
                        <div className="text-green-400">
                          {weeklyData.lowEnergyTasks[index]}/
                          {weeklyData.totalLowTasks[index]}
                        </div>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="mr-2 w-12 text-green-300">HIGH:</div>
                        <div className="mr-2 w-20">
                          {getCompletionBar(
                            weeklyData.highEnergyTasks[index],
                            weeklyData.totalHighTasks[index],
                          )}
                        </div>
                        <div className="text-green-400">
                          {weeklyData.highEnergyTasks[index]}/
                          {weeklyData.totalHighTasks[index]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="mb-4 text-center">
            <div className="text-base text-green-300">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-base text-green-300">│ KEY INSIGHTS │</div>
            <div className="text-base text-green-300">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-opacity-10 border border-green-600 bg-green-900 p-3"
              >
                <div className="flex items-start">
                  <div className="mr-3 text-green-300">►</div>
                  <div className="text-sm text-green-400">{insight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection Questions */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="mb-4 text-center">
            <div className="text-base text-green-300">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-base text-green-300">
              │ WEEKLY REFLECTION │
            </div>
            <div className="text-base text-green-300">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-green-600 p-4">
              <div className="mb-3 text-green-300">
                [1] What blocked high-energy tasks this week?
              </div>
              <textarea
                value={reflectionAnswers.blockers}
                onChange={(e) =>
                  handleReflectionChange('blockers', e.target.value)
                }
                placeholder="Type your reflection here..."
                className="h-20 w-full resize-none border border-green-700 bg-black p-2 font-mono text-sm text-green-400 focus:border-green-500 focus:outline-none"
                style={{ backgroundColor: '#000', color: '#4ade80' }}
              />
              <div className="mt-2 text-xs text-green-600">
                Examples: meetings during peak hours, energy dips after lunch,
                distractions...
              </div>
            </div>

            <div className="border border-green-600 p-4">
              <div className="mb-3 text-green-300">
                [2] One change for next week?
              </div>
              <textarea
                value={reflectionAnswers.change}
                onChange={(e) =>
                  handleReflectionChange('change', e.target.value)
                }
                placeholder="Type your actionable change here..."
                className="h-20 w-full resize-none border border-green-700 bg-black p-2 font-mono text-sm text-green-400 focus:border-green-500 focus:outline-none"
                style={{ backgroundColor: '#000', color: '#4ade80' }}
              />
              <div className="mt-2 text-xs text-green-600">
                Keep it simple and specific. What's one small adjustment to try?
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="mb-4 text-center">
            <div className="text-base text-green-500">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-base text-green-500">
              │ RECOMMENDATIONS FOR NEXT WEEK │
            </div>
            <div className="text-base text-green-500">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-green-600 p-4">
              <div className="mb-2 text-sm text-green-300">
                ⚡ ENERGY OPTIMIZATION
              </div>
              <div className="mb-2 text-xs text-green-400">
                Schedule 2-3 high-energy tasks for Tuesday-Thursday when you're
                strongest
              </div>
              <div className="text-xs text-green-600">
                Current sweet spot: 9-11 AM on peak days
              </div>
            </div>
            <div className="border border-green-600 p-4">
              <div className="mb-2 text-sm text-green-300">
                📋 TASK BALANCING
              </div>
              <div className="mb-2 text-xs text-green-400">
                Add more low-energy buffer tasks for Wednesday recovery
              </div>
              <div className="text-xs text-green-600">
                Target: 6-8 easy tasks for energy dip days
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="flex justify-center space-x-8">
            <Button
              shortcut="[ESC]"
              text="Back"
              onClick={() => navigate({ to: '/' })}
            />
            <Button
              shortcut="[S]"
              text="Save Reflection"
              onClick={() => console.log('Save reflections')}
            />
            <Button
              shortcut="[ENTER]"
              text="Plan Next Week"
              onClick={() => navigate({ to: '/energy-aware-agenda' })}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-4 space-y-2 text-center text-xs text-green-600">
          <div>┌─────────────────────────────────────────────────────────┐</div>
          <div>│ [TAB] NAVIGATE FIELDS • [S] SAVE • [P] PRINT REPORT │</div>
          <div>│ [ESC] BACK • [ENTER] CONTINUE • [←→] PREV WEEK │</div>
          <div>└─────────────────────────────────────────────────────────┘</div>
        </div>

        {/* Status Line */}
        <div className="mt-4 text-center">
          <span className="text-green-400">
            WEEKLY ANALYSIS COMPLETE • READY FOR NEXT WEEK
            {blinkingCursor ? '█' : ' '}
          </span>
        </div>

        {/* Footer */}
        <div className="right-4 bottom-4 left-4 mb-4 text-center text-xs text-green-700">
          <div>
            ───────────────────────────────────────────────────────────────
          </div>
          <div>F1=HELP • F5=EXPORT DATA • F10=MAIN MENU • ALT+R=REMINDER</div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyInsightsScreen
