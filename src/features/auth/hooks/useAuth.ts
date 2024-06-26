import {useNavigate} from "react-router-dom";
import { AuthService, LoginProps, RegisterProps } from "@/features/auth/services/auth.service.js";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { routesConfig } from "@/router/router.config";
import useSession from "@/features/session/hooks/useSession";
import toast from "react-hot-toast";
import { useStoreContext } from "@/features/store/hooks/useStoreContext";
import { AccountService } from "@/features/account/services/account.service";
import { useQuery } from "@tanstack/react-query";

function useAuth(redirectTo?: string, middleware?: 'guest'|'auth')
{
    const navigate = useNavigate()
    const {token: _token} = useStoreContext()
    const {deleteSession, createSession, setUser} = useSession()
    const [token, setToken] = useState(_token)

    const { data: user, error, isLoading } = useQuery({
        queryKey: [token],
        queryFn: () => AccountService.get(token)
    })

    const login = async (data: LoginProps) => {

        await AuthService.login(data).then((res) => {
            setToken(res.data.token as string)
        }).catch((e: AxiosError) => {
            toast.error("Nom d'utilisateur ou mot de passe invalide.")
            throw e
        })
    }

    const register = async (data: RegisterProps, setErrors: any) => {
        
        await AuthService.register(data).then((res) => {
            setToken(res.data.token as string)
        }).catch((e: AxiosError) => {
            setErrors(e.response?.data)
            throw e
        })
    }

    const logout = async () => {
        await AuthService.logout(token??'').then(() => {
            deleteSession()
        })
    }

    useEffect(() => {

        if(error) {
            const {code} = error as AxiosError
            switch(code){
                case AxiosError.ERR_NETWORK:
                case AxiosError.ERR_NOT_SUPPORT: 
                    break;
                default:
                    deleteSession()
                    break;
            }
            console.error('[useAuth::AxiosError] code = ', code)
        }

        if(!isLoading) {

            if(middleware === 'auth') {
                if(!token) {
                    deleteSession()
                    navigate(redirectTo ?? routesConfig.routes.app.home)
                }
            } else if(middleware === 'guest') {
                if(user && token) {
                    createSession({user, token})
                    navigate(redirectTo ?? routesConfig.routes.dashboard.index)
                }
            }
        }

    }, [isLoading, token, user, error])

    useEffect(() => {
        if(user) {
            setUser(user)
        }
    }, [user])

    return {
        login,
        register,
        logout
    }
}

export default useAuth