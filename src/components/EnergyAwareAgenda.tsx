import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Button from './Button'
import SectionHeader from './SectionHeader'
import SystemInfo from './SystemInfo'

export interface Mood {
  emoji: string
  label: string
  energy: number
}

export interface Task {
  time: string
  duration: number
  title: string
  energy: number
  type: string
  priority: string
}

export interface EnergyBarProps {
  energy: number
}

export interface EnergyLevelMap {
  [key: number]: 'PEAK' | 'HIGH' | 'MED' | 'LOW' | 'MIN'
}

export interface GetTaskColorProps {
  type: string
}

const EnergyAgendaScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [blinkingCursor, setBlinkingCursor] = useState(true)
  const navigate = useNavigate()
  const [selectedDate] = useState(new Date(2025, 7, 17)) // August 17, 2025
  const [currentMood] = useState({ emoji: '😊', label: 'ENERGIZED', energy: 9 })

  // Energy patterns throughout the day (0-10 scale)
  const energyPattern: Record<string, number> = {
    '06:00': 3,
    '07:00': 4,
    '08:00': 6,
    '09:00': 8,
    '10:00': 9,
    '11:00': 9,
    '12:00': 7,
    '13:00': 5,
    '14:00': 6,
    '15:00': 8,
    '16:00': 7,
    '17:00': 6,
    '18:00': 5,
    '19:00': 4,
    '20:00': 3,
    '21:00': 2,
    '22:00': 1,
  }

  // Scheduled tasks with their optimal energy requirements
  const scheduledTasks = [
    {
      time: '09:00',
      duration: 120,
      title: 'Deep Work: Quarterly Report',
      energy: 9,
      type: 'DEEP',
      priority: 'HIGH',
    },
    {
      time: '11:30',
      duration: 60,
      title: 'Strategy Meeting',
      energy: 8,
      type: 'MEETING',
      priority: 'HIGH',
    },
    {
      time: '13:00',
      duration: 30,
      title: 'Lunch Break',
      energy: 5,
      type: 'BREAK',
      priority: 'LIFE',
    },
    {
      time: '14:30',
      duration: 90,
      title: 'Code Review Session',
      energy: 7,
      type: 'TECHNICAL',
      priority: 'MED',
    },
    {
      time: '16:30',
      duration: 45,
      title: 'Team Check-ins',
      energy: 6,
      type: 'SOCIAL',
      priority: 'MED',
    },
    {
      time: '17:30',
      duration: 30,
      title: 'Email & Admin Tasks',
      energy: 4,
      type: 'ADMIN',
      priority: 'LOW',
    },
    {
      time: '19:00',
      duration: 60,
      title: 'Documentation Update',
      energy: 4,
      type: 'WRITING',
      priority: 'LOW',
    },
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

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  const getEnergyBar = (energy: EnergyBarProps['energy']): string => {
    if (energy >= 8) return '████████'
    if (energy >= 6) return '██████░░'
    if (energy >= 4) return '████░░░░'
    if (energy >= 2) return '██░░░░░░'
    return '░░░░░░░░'
  }

  const getEnergyLevel = (energy: number): EnergyLevelMap[number] => {
    if (energy >= 8) return 'PEAK'
    if (energy >= 6) return 'HIGH'
    if (energy >= 4) return 'MED'
    if (energy >= 2) return 'LOW'
    return 'MIN'
  }

  const getEnergyColor = (energy: number): string => {
    if (energy >= 8) return 'text-green-300 bg-green-900 bg-opacity-40'
    if (energy >= 6) return 'text-green-400 bg-green-900 bg-opacity-20'
    if (energy >= 4) return 'text-green-500'
    return 'text-green-600'
  }

  const getTaskColor = (task: GetTaskColorProps): string => {
    if (task.type === 'DEEP') return 'text-green-300'
    if (task.type === 'MEETING') return 'text-green-400'
    if (task.type === 'BREAK') return 'text-green-500'
    if (task.type === 'TECHNICAL') return 'text-green-400'
    return 'text-green-500'
  }

  const timeSlots = Object.keys(energyPattern)
  const currentHour = currentTime.getHours()

  return (
    <div className="flex flex-col items-center bg-black min-h-screen overflow-hidden font-mono text-green-400 text-sm leading-relaxed">
      {/* Scanlines effect */}
      <div className="fixed inset-0 bg-[length:100%_4px] bg-gradient-to-b from-transparent via-green-900 to-transparent opacity-20 animate-pulse pointer-events-none"></div>

      <div className="z-10 relative p-4 w-full max-w-[800px]">
        {/* Header */}
        <SystemInfo currentTime={currentTime} formatTime={formatTime} />

        <SectionHeader title="ENERGY-AWARE AGENDA">
          <div className="mb-2 text-green-500 text-sm">
            {formatDate(selectedDate).toUpperCase()}
          </div>
          <div className="mb-4 text-green-500 text-xs">
            TASKS AUTOMATICALLY SCHEDULED FOR OPTIMAL ENERGY ALIGNMENT
          </div>
        </SectionHeader>

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

        {/* Main Sections: Energy Timeline & Scheduled Tasks */}
        <div className="mx-auto mb-8 max-w-6xl">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Energy Timeline */}
            <div>
              <div className="mb-4 text-center">
                <div className="text-green-300 text-base">
                  ┌─────────────────────────────────────┐
                </div>
                <div className="text-green-300 text-base">
                  │ ENERGY TIMELINE │
                </div>
                <div className="text-green-300 text-base">
                  └─────────────────────────────────────┘
                </div>
              </div>
              <div className="space-y-1">
                {timeSlots.map((time) => {
                  const energy = energyPattern[time]
                  const isCurrentHour =
                    parseInt(time.split(':')[0]) === currentHour
                  return (
                    <div
                      key={time}
                      className={`flex items-center p-2 border ${isCurrentHour ? 'border-green-300 bg-green-900 bg-opacity-40' : 'border-green-600'} ${getEnergyColor(energy)}`}
                    >
                      <div className="mr-4 w-12 text-right">{time}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="mr-3 w-16">
                            {getEnergyBar(energy)}
                          </div>
                          <div className="text-xs">
                            {getEnergyLevel(energy)} ({energy}/10)
                          </div>
                          {isCurrentHour && (
                            <div className="ml-2 text-green-300 text-xs">
                              ← NOW
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Scheduled Tasks */}
            <div>
              <div className="mb-4 text-center">
                <div className="text-green-300 text-base">
                  ┌─────────────────────────────────────┐
                </div>
                <div className="text-green-300 text-base">
                  │ SCHEDULED TASKS │
                </div>
                <div className="text-green-300 text-base">
                  └─────────────────────────────────────┘
                </div>
              </div>
              <div className="space-y-3">
                {scheduledTasks.map((task, index) => {
                  const taskHour = parseInt(task.time.split(':')[0])
                  const isCurrentTask = taskHour === currentHour
                  const energyAtTime =
                    energyPattern[
                      `${taskHour.toString().padStart(2, '0')}:00`
                    ] || 5
                  const energyMatch =
                    Math.abs(task.energy - energyAtTime) <= 1
                      ? 'OPTIMAL'
                      : 'MODERATE'
                  return (
                    <div
                      key={index}
                      className={`p-3 border ${isCurrentTask ? 'border-green-300 bg-green-900 bg-opacity-40' : 'border-green-600'} ${getTaskColor(task)}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="mr-3 font-bold text-green-300">
                            {task.time}
                          </div>
                          <div className="text-xs">
                            {task.duration}min • {task.type}
                          </div>
                        </div>
                        <div className="text-xs">
                          {energyMatch === 'OPTIMAL' ? '🎯' : '⚡'}{' '}
                          {energyMatch}
                        </div>
                      </div>
                      <div className="mb-1 text-sm">{task.title}</div>
                      <div className="text-green-600 text-xs">
                        REQ: {getEnergyBar(task.energy)} ({task.energy}/10) •{' '}
                        {task.priority} PRIORITY
                      </div>
                      {isCurrentTask && (
                        <div className="mt-1 text-green-300 text-xs">
                          ► ACTIVE NOW
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Energy Insights */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="mb-4 text-center">
            <div className="text-green-500 text-base">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-green-500 text-base">│ ENERGY INSIGHTS │</div>
            <div className="text-green-500 text-base">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3 text-center">
            <div className="p-3 border border-green-600">
              <div className="mb-1 text-green-300 text-sm">PEAK HOURS</div>
              <div className="text-green-400 text-xs">09:00-11:00</div>
              <div className="text-green-500 text-xs">████████ (9/10)</div>
            </div>
            <div className="p-3 border border-green-600">
              <div className="mb-1 text-green-300 text-sm">OPTIMAL TASKS</div>
              <div className="text-green-400 text-xs">5 of 7 matched</div>
              <div className="text-green-500 text-xs">71% efficiency</div>
            </div>
            <div className="p-3 border border-green-600">
              <div className="mb-1 text-green-300 text-sm">NEXT PEAK</div>
              <div className="text-green-400 text-xs">Tomorrow 09:00</div>
              <div className="text-green-500 text-xs">15h 23m away</div>
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
              shortcut="[R]"
              text="Reschedule"
              onClick={() => console.log('Reschedule tasks')}
            />
            <Button
              shortcut="[ENTER]"
              text="Weekly Insights"
              onClick={() => navigate({ to: '/weekly-reflection-insights' })}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 mb-4 text-green-600 text-xs text-center">
          <div>┌─────────────────────────────────────────────────────────┐</div>
          <div>│ [←→] CHANGE DATE • [R] AUTO-RESCHEDULE • [T] ADD TASK │</div>
          <div>│ [ESC] BACK • [ENTER] WEEKLY VIEW • [D] DAY VIEW │</div>
          <div>└─────────────────────────────────────────────────────────┘</div>
        </div>

        {/* Blinking cursor */}
        <div className="mt-4 text-center">
          <span className="text-green-400">
            AGENDA OPTIMIZED FOR ENERGY PATTERNS{blinkingCursor ? '█' : ' '}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="right-4 bottom-4 left-4 mb-4 text-green-700 text-xs text-center">
        <div>
          ───────────────────────────────────────────────────────────────
        </div>
        <div>F1=HELP • F3=TASK SORT • F4=INSIGHTS • F10=MAIN MENU</div>
      </div>
    </div>
  )
}

export default EnergyAgendaScreen
