import {
  createFileRoute,
  useNavigate,
  UseNavigateResult,
} from '@tanstack/react-router'
import { UserForm } from '../components/ContactForm/UserForm.tsx'
import { useCallback } from 'react'

export const Route = createFileRoute('/users/new')({
  component: CreateUserPage,
})

function CreateUserPage() {
  const navigate: UseNavigateResult<string> = useNavigate()

  const handleCancel = useCallback(() => {
    navigate({ to: '/' })
  }, [navigate])

  return <UserForm handleCancel={handleCancel} />
}
