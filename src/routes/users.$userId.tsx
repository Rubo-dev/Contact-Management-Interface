import { createFileRoute } from '@tanstack/react-router'
import { UserDetails } from '../components/ContactDetails/UserDetails.tsx'

export const Route = createFileRoute('/users/$userId')({
  component: UserDetailsPage,
})

function UserDetailsPage() {
  const { userId } = Route.useParams()

  return <UserDetails userId={userId} />
}
