import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { routeTree } from './routeTree.gen'

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
})

export default function App() {
    return (
        <StrictMode>
            <RouterProvider basepath={import.meta.env.BASE_URL} router={router} />
        </StrictMode>
    )
}
