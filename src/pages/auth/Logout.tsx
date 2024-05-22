import { useAuth } from "@/features/auth/hooks";
import { useMiddleware } from "@/features/common/hooks/";
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