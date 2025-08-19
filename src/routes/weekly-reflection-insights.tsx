import { createFileRoute } from '@tanstack/react-router'
import WeeklyReflectionInsights from '../pages/WeeklyReflectionInsights'

export const Route = createFileRoute('/weekly-reflection-insights')({
  component: WeeklyReflectionInsights,
})
