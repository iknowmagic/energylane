import { useEffect, useState } from 'react'

interface BlinkingCursorProps {
  text?: string
}

const BlinkingCursor = ({ text = '' }: BlinkingCursorProps) => {
  const [blinkingCursor, setBlinkingCursor] = useState(true)

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlinkingCursor((prev) => !prev)
    }, 800)
    return () => clearInterval(blinkTimer)
  }, [])

  return (
    <span className="text-green-400">
      {text}
      {blinkingCursor ? '█' : ' '}
    </span>
  )
}

export default BlinkingCursor
