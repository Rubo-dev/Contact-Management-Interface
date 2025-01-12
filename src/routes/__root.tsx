import { createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashboardLayout } from '../layouts/DashboardLayout'

const queryClient = new QueryClient()

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <DashboardLayout />
        </QueryClientProvider>
    ),
})