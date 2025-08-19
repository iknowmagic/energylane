import React from 'react'
import { big, standard, useAsciiText } from 'react-ascii-text'

function genLine(n: number) {
  return '─'.repeat(n)
}

const Hero: React.FC = () => {
  const asciiTextRefSmall1 = useAsciiText({
    isAnimated: false,
    font: standard,
    text: ['ENERGY'],
  }) as React.MutableRefObject<HTMLPreElement | null>
  const asciiTextRefSmall2 = useAsciiText({
    isAnimated: false,
    font: standard,
    text: ['LANE'],
  }) as React.MutableRefObject<HTMLPreElement | null>
  const asciiTextRef = useAsciiText({
    isAnimated: false,
    font: big,
    text: ['ENERGYLANE'],
  }) as React.MutableRefObject<HTMLPreElement | null>

  return (
    <div className="mb-8 text-center">
      <div className="mb-2 text-green-300">
        <span className="md:hidden">{genLine(40)}</span>
        <span className="hidden md:block">{genLine(65)}</span>
      </div>
      <div className="md:hidden text-xs">
        <pre ref={asciiTextRefSmall1}></pre>
        <pre ref={asciiTextRefSmall2}></pre>
      </div>
      <pre ref={asciiTextRef} className="hidden md:block"></pre>
      <div className="mb-2 text-green-300 text-lg tracking-widest">
        PRODUCTIVITY MOOD TASK MANAGER
      </div>
      <div className="text-green-500 text-xs">
        VERSION 1.0 • COPYRIGHT 2025 • MOOD SYSTEMS INC
      </div>
      <div className="mt-2 text-green-300">
        <span className="md:hidden">{genLine(40)}</span>
        <span className="hidden md:block">{genLine(65)}</span>
      </div>
    </div>
  )
}

export default Hero
