import { createFileRoute } from '@tanstack/react-router'
import InstantTaskSortScreen from '../components/InstantTaskSort'

export const Route = createFileRoute('/instant-task-sort')({
  component: InstantTaskSortScreen,
})
