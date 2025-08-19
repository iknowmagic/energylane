import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import ScanLinesEffect from '../components/ScanLinesEffect'
import SectionHeader from '../components/SectionHeader'
import SystemInfo from '../components/SystemInfo'

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
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-black font-mono text-sm leading-relaxed text-green-400">
      {/* Scanlines effect */}
      <ScanLinesEffect />

      <div className="relative z-10 w-full max-w-[800px] p-4">
        {/* Header */}
        <SystemInfo currentTime={currentTime} formatTime={formatTime} />

        <SectionHeader title="ENERGY-AWARE AGENDA">
          <div className="mb-2 text-sm text-green-500">
            {formatDate(selectedDate).toUpperCase()}
          </div>
          <div className="mb-4 text-xs text-green-500">
            TASKS AUTOMATICALLY SCHEDULED FOR OPTIMAL ENERGY ALIGNMENT
          </div>
        </SectionHeader>

        {/* Current Energy Status */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="bg-opacity-20 border border-green-600 bg-green-900 p-4 text-center">
            <div className="mb-2 text-lg text-green-300">
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Energy Timeline */}
            <div>
              <div className="mb-4 text-center">
                <div className="text-base text-green-300">
                  ┌─────────────────────────────────────┐
                </div>
                <div className="text-base text-green-300">
                  │ ENERGY TIMELINE │
                </div>
                <div className="text-base text-green-300">
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
                      className={`flex items-center border p-2 ${isCurrentHour ? 'bg-opacity-40 border-green-300 bg-green-900' : 'border-green-600'} ${getEnergyColor(energy)}`}
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
                            <div className="ml-2 text-xs text-green-300">
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
                <div className="text-base text-green-300">
                  ┌─────────────────────────────────────┐
                </div>
                <div className="text-base text-green-300">
                  │ SCHEDULED TASKS │
                </div>
                <div className="text-base text-green-300">
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
                      className={`border p-3 ${isCurrentTask ? 'bg-opacity-40 border-green-300 bg-green-900' : 'border-green-600'} ${getTaskColor(task)}`}
                    >
                      <div className="mb-2 flex items-center justify-between">
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
                      <div className="text-xs text-green-600">
                        REQ: {getEnergyBar(task.energy)} ({task.energy}/10) •{' '}
                        {task.priority} PRIORITY
                      </div>
                      {isCurrentTask && (
                        <div className="mt-1 text-xs text-green-300">
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
            <div className="text-base text-green-500">
              ┌─────────────────────────────────────────────────────────┐
            </div>
            <div className="text-base text-green-500">│ ENERGY INSIGHTS │</div>
            <div className="text-base text-green-500">
              └─────────────────────────────────────────────────────────┘
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
            <div className="border border-green-600 p-3">
              <div className="mb-1 text-sm text-green-300">PEAK HOURS</div>
              <div className="text-xs text-green-400">09:00-11:00</div>
              <div className="text-xs text-green-500">████████ (9/10)</div>
            </div>
            <div className="border border-green-600 p-3">
              <div className="mb-1 text-sm text-green-300">OPTIMAL TASKS</div>
              <div className="text-xs text-green-400">5 of 7 matched</div>
              <div className="text-xs text-green-500">71% efficiency</div>
            </div>
            <div className="border border-green-600 p-3">
              <div className="mb-1 text-sm text-green-300">NEXT PEAK</div>
              <div className="text-xs text-green-400">Tomorrow 09:00</div>
              <div className="text-xs text-green-500">15h 23m away</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="grid justify-center gap-8 md:flex md:flex-row">
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
        <div className="mb-4 space-y-2 text-center text-xs text-green-600">
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
      <div className="right-4 bottom-4 left-4 mb-4 text-center text-xs text-green-700">
        <div>
          ───────────────────────────────────────────────────────────────
        </div>
        <div>F1=HELP • F3=TASK SORT • F4=INSIGHTS • F10=MAIN MENU</div>
      </div>
    </div>
  )
}

export default EnergyAgendaScreen
