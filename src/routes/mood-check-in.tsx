import { createFileRoute } from '@tanstack/react-router'
import MoodCheckIn from '../pages/MoodCheckIn'

export const Route = createFileRoute('/mood-check-in')({
  component: MoodCheckIn,
})
