import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

import ColorFilter from '@/components/ColorFilter'
import MoodTaskManager from '@/pages/MoodTaskManager'

function App() {
  return (
    <ColorFilter>
      <MoodTaskManager />
    </ColorFilter>
  )
}
