import useAuth from "../../hooks/useAuth.jsx";
import {useEffect} from "react";

function Logout()
{
    const { logout } = useAuth('auth', '/')

    useEffect(() => {
        logout()
    }, [])

    return (<div> </div>)
}

export default Logout