import React from 'react'

interface SystemInfoProps {
  currentTime: Date
  formatTime: (date: Date) => string
}

const SystemInfo: React.FC<SystemInfoProps> = ({ currentTime, formatTime }) => (
  <div className="mb-6 flex items-center justify-between text-xs">
    <div className="text-green-500">ENERGYLANE v1.0</div>
    <div className="text-green-500">TIME: {formatTime(currentTime)}</div>
    <div className="text-green-500">USER: ILAN_KAIM</div>
  </div>
)

export default SystemInfo
