import React, {FC} from 'react';
import {Link} from '@tanstack/react-router';
import {User} from 'lucide-react';
import {Contact} from '@/types/contact.ts';

interface ContactItemProps {
    contact: Contact;
    currentContactId: string | null;
}

const ContactItem: FC<ContactItemProps> = ({contact, currentContactId}) => {
    return (
        <Link
            key={contact.id}
            to="/contacts/$contactId"
            params={{contactId: String(contact.id)}}
            className={`flex items-center p-4 hover:bg-gray-50
             ${currentContactId === String(contact.id) ? 'bg-blue-50' : ''}
             `}
        >
            <div className="mr-3">
                {contact.imageUrl ? (
                    <img
                        src={contact.imageUrl}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <div
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-500"/>
                    </div>
                )}
            </div>
            <div>
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-500">@{contact.username}</div>
            </div>
        </Link>
    );
};

export default ContactItem;