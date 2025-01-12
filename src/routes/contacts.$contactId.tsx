import { createFileRoute } from '@tanstack/react-router'
import { ContactDetails } from '../components/ContactDetails/ContactDetails'

export const Route = createFileRoute('/contacts/$contactId')({
    component: ContactDetailsPage,
})

function ContactDetailsPage() {
    const { contactId } = Route.useParams()

    return <ContactDetails contactId={contactId} />
}