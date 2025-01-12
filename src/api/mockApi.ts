import { Contact, ContactFormData } from '../types/contact'
import {API_BASE_URL, STORAGE_KEY} from '@/constants/constants.ts';

const initializeStorage = async () => {
    const existingData = localStorage.getItem(STORAGE_KEY)

    if (!existingData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users`)

            if (!response.ok) throw new Error('Failed to fetch initial data')
            const users = await response.json()

            localStorage.setItem(STORAGE_KEY, JSON.stringify(users))

            return users
        } catch (error) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]))

            return []
        }
    }

    return JSON.parse(existingData)
}

export const mockApi = {

    getContacts: async (): Promise<Contact[]> => {
        const data = localStorage.getItem(STORAGE_KEY)

        if (!data) {
            return await initializeStorage()
        }

        return JSON.parse(data)
    },

    getContact: async (id: string): Promise<Contact> => {
        const data = localStorage.getItem(STORAGE_KEY)
        const contacts: Contact[] = data ? JSON.parse(data) : []
        const contact = contacts.find(c => c.id === Number(id))

        if (!contact) throw new Error('Contact not found')

        return contact
    },

    createContact: async (data: ContactFormData): Promise<Contact> => {
        const contacts: Contact[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        const newContact: Contact = {
            ...data,
            id: Math.max(0, ...contacts.map(c => c.id)) + 1
        }

        contacts.push(newContact)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))

        return newContact
    },

    updateContact: async (id: string, data: ContactFormData): Promise<Contact> => {
        const contacts: Contact[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        const index = contacts.findIndex(c => c.id === Number(id))

        if (index === -1) throw new Error('Contact not found')

        const updatedContact: Contact = {
            ...contacts[index],
            ...data,
            id: Number(id)
        }

        contacts[index] = updatedContact
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))

        return updatedContact
    },

    deleteContact: async (id: string): Promise<boolean> => {
        const contacts: Contact[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        const filteredContacts = contacts.filter(c => c.id !== Number(id))

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredContacts))

        return true
    }
}