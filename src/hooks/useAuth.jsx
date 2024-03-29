import useSWR from "swr";
import axios from "../lib/axios.jsx";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../AppContext.jsx";
import {isUserLoggedIn} from "../lib/helpers.jsx";
import getAccount from "../api/account/getAccount.jsx";

function useAuth(middleware, redirectIfAuthenticated)
{
    const navigate = useNavigate()
    const {token, user, setToken, setUser, setOrders} = useContext(AppContext)

    const { data , error, mutate } = useSWR('/api/v1/account', () =>
        getAccount(token)
            .then(response => {
                setUser(response.data)
                return response.data
            })
            .catch(error => {
                setUser({})
                throw error
            })
    )

    const login = ({setErrors, ...props}) => {
        axios.post('/api/auth/login', props)
            .then( response => {
                setErrors([])
                setToken(response.data.token)
            })
            .catch( error => {
                if (error.response.status === 401) throw error
                setErrors([error.response.data.message])
            } )
    }

    const register = ({setErrors, ...props}) => {
        axios.post('/api/auth/register', props)
            .then( response => {
                setErrors([])
                setToken(response.data.token)
            })
            .catch( error => {
                setErrors(error.response.data.errors)
                throw error
            } )
    }

    const logout = () => {
        axios.post('/api/auth/logout', null,{
                    headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
                if(response.status === 200) {
                    setToken('')
                    setUser({})
                    setOrders({products:[]})
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
            setUser({})
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