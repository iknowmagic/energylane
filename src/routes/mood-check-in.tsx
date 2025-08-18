import { createFileRoute } from '@tanstack/react-router'
import MoodCheckIn from '../components/MoodCheckIn'

export const Route = createFileRoute('/mood-check-in')({
  component: MoodCheckIn,
})
