import { useAuth } from "@/features/auth/hooks";
import { useMiddleware } from "@/features/common/hooks/";
import { useQuery } from "@tanstack/react-query";

function Logout()
{
    useMiddleware('auth')
    const { logout } = useAuth(undefined, 'auth')
    useQuery({ queryKey: ['/api/auth/logout'], queryFn: () => logout()})

    return (
        <></>
    )
}

export default Logout