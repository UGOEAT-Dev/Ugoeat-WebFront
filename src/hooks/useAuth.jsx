import useSWR from "swr";
import axios from "../lib/axios.jsx";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../AppContext.jsx";

function useAuth(middleware = '', redirectIfAuthenticated = '')
{
    const navigate = useNavigate()
    const {token, user, setToken, setUser} = useContext(AppContext)

    const { data , error, mutate } = useSWR('/api/v1/account', (url, _) =>
        axios.get('/api/v1/account?__token__=' + token)
            .then(response => {
                setUser(response.data)
                return response.data
            })
            .catch(error => {
                console.log("[useAuth::account::error] ", error)
                if(error.response.status === 401) throw error
            })
    )

    const login = ({setErrors, ...props}) => {
        axios.post('/api/auth/login', props)
            .then( response => {
                setErrors([])
                setToken(response.data.token)
                console.log("[Auth::Login::message] " + response.data.message)
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
                console.log("[Auth::Register::message] " + response.data.message)
            })
            .catch( error => {
                if(error.response.status === 422) throw error

                setErrors(error.response.data.errors)
            } )
    }

    const logout = () => {

    }

    useEffect(() => {
        mutate()
    }, [token])

    useEffect(()=>{
        if(middleware === 'guest' && redirectIfAuthenticated && user)
            navigate(redirectIfAuthenticated)
        if(middleware === 'auth' && error) {
            setUser(null)
            setToken(null)
            navigate('/login')
        }
    }, [user, error])

    return {
        user,
        token,
        login,
        register
    }
}

export default useAuth