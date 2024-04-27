
import useAuth from "../../core/hooks/useAuth";
import {Link, Outlet} from "react-router-dom";
import {isUserLoggedIn} from "../../core/lib/helpers";
import DashboardHeader from "./components/DashboardHeader";
import Sidebar from "./components/Sidebar";
import {useEffect, useState} from "react";
import { routesConfig } from "../../router.config";

function DashboardLayout()
{
    const {routes} = routesConfig
    const { user, token } = useAuth('auth', routes.auth.login)
    const [sidebarMode, setSidebarMode] = useState<1|2>(1)
    const path = pathname2link(window.location.pathname)

    if( ! isUserLoggedIn(user, token) ) return ( <div></div>)

    useEffect(() => {
        document.title = "Dashboard | UGOEAT";
    }, [])

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
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

function pathname2link(path: string)
{
    return {
        link: path,
        text: path.split('/').pop()
    }
}

export default DashboardLayout