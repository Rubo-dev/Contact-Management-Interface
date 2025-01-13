import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    description: z.string().optional(),
})

export type UserFormData = z.infer<typeof userSchema>

export interface IUser extends UserFormData {
    id: number
    imageUrl?: string
}

export interface FieldItem {
    email: string;
    name: string;
    username: string;
    phone: string;
    description?: string | undefined;
}