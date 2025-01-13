import React, {FC} from 'react';
import {FieldApi} from '@tanstack/react-form';
import {FieldItem} from '@/types/user.ts';

interface ContactFormItemProps {
    label: string;
    type: string;
    field:  FieldApi<FieldItem, any, undefined, undefined, string> | FieldApi<FieldItem, any, undefined, undefined, string | undefined>;
}

const UserFormItem: FC<ContactFormItemProps> = ({label, field, type}) => {

    if (type === 'textarea') {
        return (
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {field.state.meta.errors && (
                    <p className="mt-1 text-sm text-red-600">
                        {field.state.meta.errors}
                    </p>
                )}
            </div>
        )
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type={type}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {field.state.meta.errors && (
                <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors}
                </p>
            )}
        </div>
    );
};

export default UserFormItem;