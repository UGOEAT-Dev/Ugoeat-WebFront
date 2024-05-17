

import {useNavigate} from "react-router-dom";
import { AuthService, LoginProps, RegisterProps } from "../services/auth/auth.service.js";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { routesConfig } from "../../router.config.js";
import useSession from "../../features/session/useSession.js";
import toast from "react-hot-toast";
import { useStoreContext } from "../../features/store/store.context.js";
import useSWR from "swr";
import { AccountService } from "../services/account/account.service.js";

function useAuth(redirectTo?: string, middleware?: 'guest'|'auth')
{
    const navigate = useNavigate()
    const {token: _token} = useStoreContext()
    const {deleteSession, createSession} = useSession()
    const [token, setToken] = useState(_token)

    const {data: user, isLoading, error} = useSWR(token, AccountService.get)

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

    return {
        login,
        register,
        logout,
    }
}

export default useAuth