import { useForm } from '@tanstack/react-form'
import { userSchema, type IUser } from '@/types/user.ts'
import { useCreateUser, useUpdateUser } from '@/hooks/useUsers.ts'
import {FC, FormEvent} from 'react';
import UserFormItem from '@/components/ContactForm/UserFormItem.tsx';

interface UserFormProps {
    handleCancel: () => void
    initialData?: IUser
}

export const UserForm:FC<UserFormProps> = ({ initialData, handleCancel }) => {
    const createContact = useCreateUser()
    const updateContact = useUpdateUser()

    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            username: initialData?.username ?? '',
            email: initialData?.email ?? '',
            phone: initialData?.phone ?? '',
            description: initialData?.description ?? '',
        },
        validators: {
            onChange: userSchema,
            onChangeAsyncDebounceMs: 500,
        },
        onSubmit: async (values) => {
            try {
                if (initialData?.id) {
                    await updateContact.mutateAsync({
                        id: String(initialData.id),
                        data: values.value,
                    })
                } else {
                    await createContact.mutateAsync(values.value)
                }
                handleCancel()
            } catch (error) {
                return {error}
            }
        },
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    const isPending = createContact.isPending || updateContact.isPending
    const error = createContact.error || updateContact.error

    return (
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6"
            >
                <h2 className="text-2xl font-bold mb-6">
                    {initialData ? 'Edit Contact' : 'Create Contact'}
                </h2>
                <div className="space-y-4">
                    <form.Field
                        name="name"
                        validators={{
                            onChange: userSchema.shape.name,
                        }}
                    >
                        {(field) => (
                            <UserFormItem
                                label="Name"
                                field={field}
                                type="text"
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="username"
                        validators={{
                            onChange: userSchema.shape.username,
                        }}
                    >
                        {(field) => (
                            <UserFormItem
                                label="Username"
                                field={field}
                                type="text"
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="email"
                        validators={{
                            onChange: userSchema.shape.email,
                        }}
                    >
                        {(field) => (
                            <UserFormItem
                                label="Email"
                                type="email"
                                field={field}
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="phone"
                        validators={{
                            onChange: userSchema.shape.phone,
                        }}
                    >
                        {(field) => (
                            <UserFormItem
                                label="Phone"
                                type="tel"
                                field={field}
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="description"
                        validators={{
                            onChange: userSchema.shape.description,
                        }}
                    >
                        {(field) => (
                            <UserFormItem
                                label="Description"
                                type="textarea"
                                field={field}
                            />
                        )}
                    </form.Field>
                </div>
                {error && (
                    <div className="mt-4 text-red-600 text-sm">
                        {error.message}
                    </div>
                )}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={()=> handleCancel()}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                        Cancel
                    </button>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit]) => (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50" type="submit" disabled={!canSubmit}>
                                {isPending
                                    ? 'Saving...'
                                    : initialData
                                        ? 'Update Contact'
                                        : 'Create Contact'}
                            </button>
                        )}
                    />
                </div>
            </form>
    )
}