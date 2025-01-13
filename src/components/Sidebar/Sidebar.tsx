import { useState } from 'react'
import {Link, useParams} from '@tanstack/react-router'
import { Search, Plus } from 'lucide-react'
import { useUsers } from '@/hooks/useUsers.ts'
import { useDebounce } from '@/hooks/useDebounce'
import Loading from '@/components/Loading/Loading.tsx';
import UserItem from '@/components/ContactItem/UserItem.tsx';

export const Sidebar = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const debouncedSearchTerm = useDebounce(inputValue, 300);
    const params = useParams({ strict: false });

    const userId = params?.userId;
    const { data: users, isLoading, isError } = useUsers(debouncedSearchTerm);

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="sticky top-0 left-0  p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Contacts</h2>
                    <Link
                        to="/users/new"
                        className="p-2 text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={20} />
                    </Link>
                </div>

                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
                    />
                </div>
            </div>
            <>
                {isLoading ? (
                    <Loading text="Loading contacts..." className="p-4 text-center text-gray-500" />
                ) : isError ? (
                    <div className="p-4 text-center text-red-500">Error loading contacts</div>
                ) : users?.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        {debouncedSearchTerm ? 'No contacts found' : 'No contacts yet'}
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col overflow-y-auto divide-y divide-gray-200">
                        {users?.map((user) => (
                            <UserItem user={user} currentUserId={userId} key={user.id} />
                        ))}
                    </div>
                )}
            </>
        </div>
    )
};