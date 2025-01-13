import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { IUser, UserFormData } from '../types/user.ts'
import {useNavigate} from '@tanstack/react-router';
import {API_URL} from '@/constants/constants.ts';

export function useUsers(searchTerm: string = '') {
    return useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/users`);

            if (!response.ok) throw new Error('Failed to fetch users')
            const users: IUser[] = await response.json();

            if (searchTerm) {
                return users.filter(contact =>
                    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }

            return users
        },
        staleTime: 1000 * 60 * 5,
    })
}

export function useUser(id: string) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/users/${id}`)

            if (!response.ok) throw new Error('Failed to fetch contact')

            return response.json()
        }
    })
}

export function useCreateUser() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UserFormData) => {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error('Failed to create contact')

            return response.json()
        },
        onSuccess: (newUser) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate({
                to: `/users/${newUser.id}`,
                params: { userId: String(newUser.id) },
            });
        },
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UserFormData }) => {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error('Failed to update contact')

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
}

export function useDeleteUser() {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete contact')

            return id
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            navigate({ to: '/' })
        },
    })
}