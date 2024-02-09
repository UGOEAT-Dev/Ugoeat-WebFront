
import useAuth from "../../hooks/useAuth.jsx";

function Dashboard()
{
    const { user, logout, unregister } = useAuth('auth', '/login')

    if( ! user ) return ( <div></div>)

    return (
        <main>
            <h1 className="text-2xl font-bold">DashBoard</h1>
            <p>Welcome {user?.role} {user?.name}</p>
        </main>
    )
}

export default Dashboard