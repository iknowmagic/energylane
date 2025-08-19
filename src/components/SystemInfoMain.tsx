import { useEffect, useState } from 'react'

const SystemInfoMain = () => {
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
    <div className="mb-8 grid grid-cols-3 text-center text-xs text-green-500">
      <div>SYSTEM TIME: {formatTime(currentTime)}</div>
      <div>MEMORY: 640K OK</div>
      <div>USER: ILAN_KAIM</div>
    </div>
  )
}

export default SystemInfoMain
