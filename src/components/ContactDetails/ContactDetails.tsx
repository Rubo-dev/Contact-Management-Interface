import {FC, useCallback, useState} from 'react'
import {useNavigate, UseNavigateResult} from '@tanstack/react-router'
import { User, Edit2, Trash2 } from 'lucide-react'
import { useContact, useDeleteContact } from '@/hooks/useContacts'
import {ContactForm} from '@/components/ContactForm/ContactForm.tsx';
import {DeleteDialog} from '@/components/DeleteDialog/DeleteDialog.tsx';
import Loading from '@/components/Loading/Loading.tsx';

interface ContactDetailsProps {
    contactId: string;
}

export const ContactDetails: FC<ContactDetailsProps> = ({ contactId }) => {
    const navigate: UseNavigateResult<string> = useNavigate()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const { data: contact, isLoading } = useContact(contactId)
    const deleteContact = useDeleteContact()

    const handleCancel = useCallback(() => {
        setIsEditing(false)
    },[setIsEditing])

    if (isLoading) {
        return <Loading text="Loading contact details..." className="text-center"/>
    }

    if (!contact) {
        return <div className="text-center">Contact not found</div>
    }

    if (isEditing) {
        return (
            <ContactForm
                initialData={contact}
                handleCancel={handleCancel}
            />
        )
    }

    const handleDelete = async () => {
        await deleteContact.mutateAsync(contactId)
        navigate({ to: '/' })
    }

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {contact.imageUrl ? (
                            <img
                                src={contact.imageUrl}
                                alt={contact.name}
                                className="w-20 h-20 rounded-full"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                <User size={40} className="text-gray-500" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold">{contact.name}</h1>
                            <p className="text-gray-600">@{contact.username}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-gray-600 hover:text-blue-600"
                        >
                            <Edit2 size={20} />
                        </button>
                        <button
                            onClick={() => setShowDeleteDialog(true)}
                            className="p-2 text-gray-600 hover:text-red-600"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Email</h2>
                        <p className="mt-1">{contact.email}</p>
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Phone</h2>
                        <p className="mt-1">{contact.phone}</p>
                    </div>
                    {contact.description && (
                        <div>
                            <h2 className="text-sm font-medium text-gray-500">About</h2>
                            <p className="mt-1 text-gray-700">{contact.description}</p>
                        </div>
                    )}
                </div>
            </div>

            <DeleteDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                contactName={contact.name}
            />
        </>
    )
}
