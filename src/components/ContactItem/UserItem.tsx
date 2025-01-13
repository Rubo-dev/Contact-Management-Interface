import React, {FC} from 'react';
import {Link} from '@tanstack/react-router';
import {User} from 'lucide-react';
import {IUser} from '@/types/user.ts';

interface UserItemProps {
    user: IUser;
    currentUserId: string | undefined;
}

const UserItem: FC<UserItemProps> = ({user, currentUserId}) => {
    return (
        <Link
            key={user.id}
            to="/users/$userId"
            params={{userId: String(user.id)}}
            className={`flex items-center p-4 hover:bg-gray-50
             ${currentUserId === String(user.id) ? 'bg-blue-50' : ''}
             `}
        >
            <div className="mr-3">
                {user.imageUrl ? (
                    <img
                        src={user.imageUrl}
                        alt={user.name}
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
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
        </Link>
    );
};

export default UserItem;