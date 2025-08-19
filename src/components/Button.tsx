import React from 'react'

interface ButtonProps {
  shortcut: string
  text: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  shortcut,
  text,
  onClick,
  disabled,
  className,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 border transition-colors duration-200 flex items-center justify-center gap-2 uppercase font-mono text-sm ${disabled ? 'border-green-700 text-green-700 cursor-not-allowed' : 'border-green-300 text-green-300 hover:bg-green-900 hover:bg-opacity-30'} ${className || ''}`}
  >
    <span className="font-bold">{shortcut.toUpperCase()}</span>
    <span>{text.toUpperCase()}</span>
  </button>
)

export default Button
