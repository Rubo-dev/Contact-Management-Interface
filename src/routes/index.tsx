import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    return (
        <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact or create a new one
        </div>
    )
}