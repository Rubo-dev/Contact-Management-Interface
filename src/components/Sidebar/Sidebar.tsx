import { useState } from 'react'
import {Link, useLocation} from '@tanstack/react-router'
import { Search, Plus } from 'lucide-react'
import { useContacts } from '@/hooks/useContacts'
import { useDebounce } from '@/hooks/useDebounce'
import Loading from '@/components/Loading/Loading.tsx';
import ContactItem from '@/components/ContactItem/ContactItem.tsx';

export const Sidebar = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const debouncedSearchTerm = useDebounce(inputValue, 300)
    const location = useLocation()
    const { data: contacts, isLoading, isError } = useContacts(debouncedSearchTerm)

    const currentPath: string = location.pathname
    const currentContactId: string | null = currentPath.startsWith(`${import.meta.env.BASE_URL}contacts/`)
        ? currentPath.split('/')[3]
        : null

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="sticky top-0 left-0  p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Contacts</h2>
                    <Link
                        to="/contacts/new"
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
                ) : contacts?.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        {debouncedSearchTerm ? 'No contacts found' : 'No contacts yet'}
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col overflow-y-auto divide-y divide-gray-200">
                        {contacts?.map((contact) => (
                            <ContactItem contact={contact} currentContactId={currentContactId} key={contact.id} />
                        ))}
                    </div>
                )}
            </>
        </div>
    )
};