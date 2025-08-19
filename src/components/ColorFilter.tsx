import React from 'react'

interface ColorFilterProps {
  children: React.ReactNode
}

const ColorFilter: React.FC<ColorFilterProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* NightTone-style warm orange filter for blue light reduction */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-orange-400/10 mix-blend-hue" />
      {children}
    </div>
  )
}

export default ColorFilter
