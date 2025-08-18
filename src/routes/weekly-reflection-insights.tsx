import { createFileRoute } from '@tanstack/react-router'
import WeeklyReflectionInsights from '../components/WeeklyReflectionInsights'

export const Route = createFileRoute('/weekly-reflection-insights')({
  component: WeeklyReflectionInsights,
})
