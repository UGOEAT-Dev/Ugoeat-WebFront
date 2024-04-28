import useAuth from "../../core/hooks/useAuth";
import {useEffect} from "react";
import { useMiddleware } from "../../core/hooks/useMiddleware";

function Logout()
{
    useMiddleware('auth')
    const { logout } = useAuth('', '/')

    useEffect(() => {
        logout()
    }, [])

    return (
        <></>
    )
}

export default Logout