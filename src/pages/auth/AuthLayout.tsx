import { Outlet } from "react-router-dom"
import { useMiddleware } from "@/features/common/hooks"

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