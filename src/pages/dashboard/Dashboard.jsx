
import useAuth from "../../hooks/useAuth.jsx";
import {Outlet} from "react-router-dom";
import {isUserLoggedIn} from "../../lib/helpers.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useState} from "react";

function Dashboard()
{
    const { user, token, logout, unregister } = useAuth('auth', '/login')
    const [sidebarMode, setSidebarMode] = useState(1)

    if( ! isUserLoggedIn(user, token) ) return ( <div></div>)

    return (
        <div className="bg-gray-50 min-h-screen">
            <DashboardHeader
                toggleSidebar={() => setSidebarMode(v => v === 1? 2 : 1)}
                logout={logout}/>
            <main className={`${sidebarMode === 1 ? 'block sm:flex' : 'flex'} pt-16 sm:pt-0 gap-2 min-h-screen`}>
                <Sidebar mode={sidebarMode}/>
                <div className="w-full p-3">
                    <Outlet context={{user, token}} />
                </div>
            </main>
        </div>
    )
}

export default Dashboard