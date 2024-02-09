import useSWR from "swr";
import axios from "../lib/axios.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage.jsx";

function useAuth({middleware = '', redirectIfAuthenticated = ''})
{
    const navigate = useNavigate()
    const [token, setToken] = useLocalStorage('authToken', '')
    const { data: user , error, mutate } = useSWR('/api/v1/account', (url, _) =>
        axios.get('/api/v1/account?__token__=' + token)
            .then(response => response.data)
            .catch(error => console.log("[useAuth::account] ", error))
    )

    const login = ({setErrors, ...props}) => {
        axios.post('/api/auth/login', props)
            .then( response => {
                setErrors([])
                setToken(response.data.token)
                mutate()
                console.log("[Auth::Login::message] " + response.data.message)
            })
            .catch( error => setErrors([error.response.data.message]) )
    }

    const register = ({setErrors, ...props}) => {
        axios.post('/api/auth/register', props)
            .then( response => {
                setErrors([])
                setToken(response.data.token)
                mutate()
                console.log("[Auth::Register::message] " + response.data.message)
            })
            .catch( error => {
                if(error.response.status === 422)
                    setErrors(error.response.data.errors)
            } )
    }

    const logout = () => {

    }

    useEffect(()=>{
        if(middleware === 'guest' && redirectIfAuthenticated && user)
            navigate(redirectIfAuthenticated)
        if(middleware === 'auth' && error)
            logout()
    }, [user, error])

    return {
        user,
        token,
        login,
        register
    }
}

export default useAuth