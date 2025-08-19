import { createFileRoute } from '@tanstack/react-router'

import MoodTaskManager from '@/pages/MoodTaskManager'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <MoodTaskManager />
}
