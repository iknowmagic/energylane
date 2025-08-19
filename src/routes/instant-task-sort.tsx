import { createFileRoute } from '@tanstack/react-router'
import InstantTaskSortScreen from '../pages/InstantTaskSort'

export const Route = createFileRoute('/instant-task-sort')({
  component: InstantTaskSortScreen,
})
