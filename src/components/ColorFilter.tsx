import React from 'react'

interface ColorFilterProps {
  children: React.ReactNode
}

const ColorFilter: React.FC<ColorFilterProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* NightTone-style warm orange filter for blue light reduction */}
      <div className="z-50 fixed inset-0 bg-orange-400/40 pointer-events-none mix-blend-hue" />
      {children}
    </div>
  )
}

export default ColorFilter
