import { useForm } from '@tanstack/react-form'
import { contactSchema, type Contact } from '@/types/contact'
import { useCreateContact, useUpdateContact } from '@/hooks/useContacts'
import {FC} from 'react';
import ContactFormItem from '@/components/ContactForm/ContactFormItem.tsx';

interface ContactFormProps {
    handleCancel: () => void
    initialData?: Contact
}

export const ContactForm:FC<ContactFormProps> = ({ initialData, handleCancel }) => {
    const createContact = useCreateContact()
    const updateContact = useUpdateContact()

    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            username: initialData?.username ?? '',
            email: initialData?.email ?? '',
            phone: initialData?.phone ?? '',
            description: initialData?.description ?? '',
        },
        validators: {
            onChange: contactSchema,
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

    const isPending = createContact.isPending || updateContact.isPending
    const error = createContact.error || updateContact.error

    return (
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6"
            >
                <h2 className="text-2xl font-bold mb-6">
                    {initialData ? 'Edit Contact' : 'Create Contact'}
                </h2>
                <div className="space-y-4">
                    <form.Field
                        name="name"
                        validators={{
                            onChange: contactSchema.shape.name,
                        }}
                    >
                        {(field) => (
                            <ContactFormItem
                                label="Name"
                                field={field}
                                type="text"
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="username"
                        validators={{
                            onChange: contactSchema.shape.username,
                        }}
                    >
                        {(field) => (
                            <ContactFormItem
                                label="Username"
                                field={field}
                                type="text"
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="email"
                        validators={{
                            onChange: contactSchema.shape.email,
                        }}
                    >
                        {(field) => (
                            <ContactFormItem
                                label="Email"
                                type="email"
                                field={field}
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="phone"
                        validators={{
                            onChange: contactSchema.shape.phone,
                        }}
                    >
                        {(field) => (
                            <ContactFormItem
                                label="Phone"
                                type="tel"
                                field={field}
                            />
                        )}
                    </form.Field>
                    <form.Field
                        name="description"
                        validators={{
                            onChange: contactSchema.shape.description,
                        }}
                    >
                        {(field) => (
                            <ContactFormItem
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