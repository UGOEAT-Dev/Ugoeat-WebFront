import useAuth from "../../core/hooks/useAuth";
import {useEffect} from "react";

function Logout()
{
    const { logout } = useAuth('auth', '/')

    useEffect(() => {
        logout()
    }, [])

    return (
        <div></div>
    )
}

export default Logout