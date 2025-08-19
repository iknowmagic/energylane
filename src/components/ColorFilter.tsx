import React from 'react'

interface ColorFilterProps {
  children: React.ReactNode
}

const ColorFilter: React.FC<ColorFilterProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* NightTone-style warm orange filter for blue light reduction */}
      <div className="z-50 fixed inset-0 bg-orange-400/30 pointer-events-none mix-blend-color-dodge" />
      {children}
    </div>
  )
}

export default ColorFilter
