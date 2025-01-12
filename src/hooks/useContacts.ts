import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockApi } from '../api/mockApi'
import type { Contact, ContactFormData } from '../types/contact'
import {useNavigate} from '@tanstack/react-router';

export function useContacts(searchTerm: string = '') {
    const query = useQuery({
        queryKey: ['contacts'],
        queryFn: mockApi.getContacts,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: true,
    })

    const filteredContacts = query.data?.filter(contact =>
        searchTerm
            ? contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
            : true
    )

    return {
        ...query,
        data: filteredContacts,
    }
}

export function useContact(id: string) {
    return useQuery({
        queryKey: ['contact', id],
        queryFn: () => mockApi.getContact(id)
    })
}

export function useCreateContact() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: mockApi.createContact,
        onSuccess: (newContact) => {
            queryClient.setQueryData<Contact[]>(['contacts'], (old = []) => [...old, newContact])
            queryClient.setQueryData(['contact', String(newContact.id)], newContact)
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
            navigate({ to: '/contacts/$contactId', params: { contactId: String(newContact.id) } })
        },
    })
}

export function useUpdateContact() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: ContactFormData }) =>
            mockApi.updateContact(id, data),
        onSuccess: (updatedContact) => {
            queryClient.setQueryData(['contact', String(updatedContact.id)], updatedContact)
            queryClient.setQueryData<Contact[]>(['contacts'], (old = []) =>
                old?.map(contact => contact.id === updatedContact.id ? updatedContact : contact) ?? []
            )
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
            navigate({to: '/contacts/$contactId', params: {contactId: String(updatedContact.id)}})
        },
    })
}

export function useDeleteContact() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: mockApi.deleteContact,
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData<Contact[]>(['contacts'], (old = []) =>
                old.filter(contact => contact.id !== Number(deletedId))
            )
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        },
    })
}