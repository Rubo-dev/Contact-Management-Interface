import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '../components/Sidebar/Sidebar'

export const DashboardLayout = () => (
    <div className="flex h-full overflow-hidden bg-gray-50">
        <Sidebar/>
        <main className="flex-1 overflow-y-hidden  p-6">
            <Outlet/>
        </main>
    </div>
);