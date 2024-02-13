
import useAuth from "../../hooks/useAuth.jsx";
import {NavLink, Outlet} from "react-router-dom";
import {isUserLoggedIn} from "../../lib/helpers.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import Sidebar from "./components/Sidebar.jsx";

function Dashboard()
{
    const { user, token, logout, unregister } = useAuth('auth', '/login')

    if( ! isUserLoggedIn(user, token) ) return ( <div></div>)

    return (
        <div className="bg-gray-50 min-h-screen">
            <DashboardHeader logout={logout} unRegister={unregister}/>
            <main className="flex gap-2 min-h-screen">
                <Sidebar />
                <div className="w-full p-3">
                    <Outlet context={{user, token}} />
                </div>
            </main>
        </div>
    )
}

export default Dashboard