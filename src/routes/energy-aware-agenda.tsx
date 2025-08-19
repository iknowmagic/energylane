import { createFileRoute } from '@tanstack/react-router'
import EnergyAwareAgenda from '../pages/EnergyAwareAgenda'

export const Route = createFileRoute('/energy-aware-agenda')({
  component: EnergyAwareAgenda,
})
