
import useAuth from "../../hooks/useAuth.jsx";
import {Link, Outlet} from "react-router-dom";
import {isUserLoggedIn} from "../../lib/helpers.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useState} from "react";

function Dashboard()
{
    const { user, token, unregister } = useAuth('auth', '/login')
    const [sidebarMode, setSidebarMode] = useState(1)
    const path = pathname2link(window.location.pathname)

    if( ! isUserLoggedIn(user, token) ) return ( <div></div>)

    return (
        <div className="bg-gray-50 min-h-screen">
            <DashboardHeader
                toggleSidebar={() => setSidebarMode(v => v === 1? 2 : 1)} />
            <main className={`${sidebarMode === 1 ? 'block sm:flex' : 'flex'} pt-16 sm:pt-0 gap-2 min-h-screen`}>
                <Sidebar mode={sidebarMode}/>
                <div className="relative w-full p-3">
                    <p className="hidden sm:block absolute right-3 top-5 text-sm capitalize">
                        <Link to='/' className="text-blue-600">~</Link> / dashboard / <Link to={path.link} className="text-blue-600">{path.text}</Link>
                    </p>
                    <Outlet context={{user, token}} />
                </div>
            </main>
        </div>
    )
}

function pathname2link(path = '')
{
    return {
        link: path,
        text: path.split('/').pop()
    }
}

export default Dashboard