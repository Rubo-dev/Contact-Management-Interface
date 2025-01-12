import {createFileRoute, useNavigate, UseNavigateResult} from '@tanstack/react-router'
import { ContactForm } from '../components/ContactForm/ContactForm.tsx'
import {useCallback} from 'react';

export const Route = createFileRoute('/contacts/new')({
    component: CreateContactPage,
})

function CreateContactPage() {
    const navigate: UseNavigateResult<string> = useNavigate()

    const handleCancel = useCallback(() => {
        navigate({ to: '/' })
    },[navigate])

    return <ContactForm handleCancel={handleCancel} />
}