import {FC, useCallback, useState} from 'react'
import {useNavigate, UseNavigateResult} from '@tanstack/react-router'
import { User, Edit2, Trash2 } from 'lucide-react'
import { useUser, useDeleteUser } from '@/hooks/useUsers.ts'
import {UserForm} from '@/components/ContactForm/UserForm.tsx';
import {DeleteDialog} from '@/components/DeleteDialog/DeleteDialog.tsx';
import Loading from '@/components/Loading/Loading.tsx';

interface UserDetailsProps {
    userId: string;
}

export const UserDetails: FC<UserDetailsProps> = ({ userId }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const { data: user, isLoading } = useUser(userId)
    const deleteUser = useDeleteUser()

    const handleCancel = useCallback(() => {
        setIsEditing(false)
    },[setIsEditing])

    if (isLoading) {
        return <Loading text="Loading contact details..." className="text-center"/>
    }

    if (!user) {
        return <div className="text-center">Contact not found</div>
    }

    if (isEditing) {
        return (
            <UserForm
                initialData={user}
                handleCancel={handleCancel}
            />
        )
    }

    const handleDelete = async () => {
        await deleteUser.mutateAsync(userId)
    }

    return (
        <>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {user.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt={user.name}
                                className="w-20 h-20 rounded-full"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                <User size={40} className="text-gray-500" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-gray-600">@{user.username}</p>
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
                        <p className="mt-1">{user.email}</p>
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Phone</h2>
                        <p className="mt-1">{user.phone}</p>
                    </div>
                    {user.description && (
                        <div>
                            <h2 className="text-sm font-medium text-gray-500">About</h2>
                            <p className="mt-1 text-gray-700">{user.description}</p>
                        </div>
                    )}
                </div>
            </div>

            <DeleteDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                contactName={user.name}
            />
        </>
    )
}
