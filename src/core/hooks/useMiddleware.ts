import { json, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import getAccount from "../services/account/getAccount";
import { routesConfig } from "../../router.config";
import { UserImpl } from "../types/User";
import useSWR from "swr";


export type AuthMiddleware = "auth" | "guest" | "admin"

export function useMiddleware(middleware: AuthMiddleware, redirecTo?: string)
{
    const { token, user, setUser } = useAppContext()
    const { routes } = routesConfig
    const navigate = useNavigate()
    const [isAuth, setAuth] = useState(user.id !== 0)

    const { isLoading } = useSWR('/api/v1/account', () => 
            getAccount(token)
                .then((r) => {
                    setAuth(true)
                    setUser(r.data.data)
                    return user
                })
                .catch(() => setAuth(false)))

    useEffect(() => {

        if(isLoading)
            return;

        if(isAuth && user.id) {
            const userObj = new UserImpl(user)

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

    }, [isAuth, isLoading])

    return { isLoading, isAuth }
}
