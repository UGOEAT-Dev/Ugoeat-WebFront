import { Outlet } from "react-router-dom"
import { useMiddleware } from "../../core/hooks/useMiddleware"

function AuthLayout()
{
    useMiddleware('guest')

    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout