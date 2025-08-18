import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

import MoodTaskManager from '@/components/MoodTaskManager'

function App() {
  return <MoodTaskManager />
}
