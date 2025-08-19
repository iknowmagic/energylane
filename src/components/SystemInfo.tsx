import React, { useEffect, useState } from 'react'

const SystemInfo: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="mb-6 flex items-center justify-between text-xs">
      <div className="text-green-500">ENERGYLANE v1.0</div>
      <div className="text-green-500">TIME: {formatTime(currentTime)}</div>
      <div className="text-green-500">USER: ILAN_KAIM</div>
    </div>
  )
}

export default SystemInfo
