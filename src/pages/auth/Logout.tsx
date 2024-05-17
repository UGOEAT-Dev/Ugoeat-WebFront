import useAuth from "../../core/hooks/useAuth";
import { useMiddleware } from "../../core/hooks/useMiddleware";
import useSWR from "swr";

function Logout()
{
    useMiddleware('auth')
    const { logout } = useAuth(undefined, 'auth')
    useSWR('/api/auth/logout', () => logout())

    return (
        <></>
    )
}

export default Logout