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
    className={`flex items-center justify-center gap-2 border px-6 py-3 font-mono text-sm uppercase transition-colors duration-200 ${disabled ? 'cursor-not-allowed border-green-700 text-green-700' : 'hover:bg-opacity-30 border-green-300 text-green-300 hover:bg-green-900'} ${className || ''}`}
  >
    <span className="font-bold">{shortcut.toUpperCase()}</span>
    <span>{text.toUpperCase()}</span>
  </button>
)

export default Button
