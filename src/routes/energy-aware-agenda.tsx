import { createFileRoute } from '@tanstack/react-router'
import EnergyAwareAgenda from '../components/EnergyAwareAgenda'

export const Route = createFileRoute('/energy-aware-agenda')({
  component: EnergyAwareAgenda,
})
