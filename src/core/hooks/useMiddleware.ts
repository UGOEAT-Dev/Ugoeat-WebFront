import { json, useNavigate } from "react-router-dom";
import { routesConfig } from "../../router.config";
import { UserImpl } from "../types/User";
import { useEffect } from "react";
import useSession from "../../features/session/useSession";


export type AuthMiddleware = "auth" | "guest" | "admin"

export function useMiddleware(middleware: AuthMiddleware, redirecTo?: string)
{
    const { session } = useSession()
    const { routes } = routesConfig
    const navigate = useNavigate()

    useEffect(() => {

        if(session) {
            const userObj = new UserImpl(session.user)
    
            if(middleware === "guest")
                navigate(redirecTo ?? routes.dashboard.index)
            if(middleware === "admin") {
                if(!userObj.isAdmin()) {
                    throw json('Page Not Found', {status: 404, statusText: 'Not Found'})
                }
            }
    
        } else {
            if(middleware === "auth" || middleware === "admin")
                navigate(redirecTo ?? routes.auth.login)
        }
    }, [session])


    return { isAuth: session !== undefined }
}
