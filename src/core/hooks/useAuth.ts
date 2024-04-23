import useSWR from "swr";
import axios from "../lib/axios";
import {Dispatch, SetStateAction, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {isUserLoggedIn} from "../lib/helpers";
import getAccount from "../services/account/getAccount.js";
import { useAppContext } from "../context/AppContext.js";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { RegistrationError } from "../types/error/RegistrationError.js";
import { UserRole } from "../types/User.js";
import { Error } from "../types/error/Error.js";

function useAuth(middleware:string, redirectIfAuthenticated: string)
{
    const navigate = useNavigate()
    const {token, user, setOnlineStatus, setToken, setUser, setOrder} = useAppContext()

    const { data , error, mutate } = useSWR('/api/v1/account', () =>
        getAccount(token)
            .then(response => {
                setOnlineStatus(true)
                setUser(response.data.data)
                return response.data
            })
            .catch((error: AxiosError) => {
                if(error.code === AxiosError.ERR_NETWORK){
                    setOnlineStatus(false)
                } else { 
                    setUser({id: 0})
                    setOnlineStatus(true)
                }
                throw error
            })
    )

    const login = (
        setErrors: Dispatch<SetStateAction<Error>> | null, 
        props: {
            email: string,
            password: string
        }) => {
        axios.post('/api/auth/login', props)
            .then( response => {
                if(setErrors) setErrors({})
                setToken(response.data.token)
            })
            .catch( error => {
                toast.error("Nom d'utilisateur ou mot de passe invalide", { duration: 1000})
                if (error.response.status === 401) throw error
            } )
    }

    const register = (
        setErrors: Dispatch<SetStateAction<RegistrationError>>, 
        props : { 
            role: UserRole,
            name: string,
            email: string,
            password: string,
            password_confirmation: string
        }) => {
        axios.post('/api/auth/register', props)
            .then( response => {
                setErrors({})
                setToken(response.data.token)
            })
            .catch( error => {
                setErrors(error.response.data)
                throw error
            } )
    }

    const logout = () => {
        axios.post('/api/auth/logout', null,{
                    headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
                if(response.status === 200) {
                    setToken('')
                    setUser({id: 0})
                    setOrder({products:[]})
                }
            })
    }

    useEffect(() => {
        mutate()
    }, [token])

    useEffect(()=>{

        if(middleware === 'guest' && redirectIfAuthenticated && isUserLoggedIn(user, token)) {
            navigate(redirectIfAuthenticated)
        }
        if(middleware === 'auth' && !isUserLoggedIn(user, token)) {
            setUser({id: 0})
            setToken('')
            navigate(redirectIfAuthenticated)
        }
    }, [user, token, error])

    return {
        user,
        token,
        login,
        register,
        logout,
        data
    }
}

export default useAuth