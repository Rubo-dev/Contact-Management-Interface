import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { routeTree } from './routeTree.gen'
import {mockApi} from '@/api/mockApi.ts';

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
})

await mockApi.getContacts()

export default function App() {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}
