import {useContext} from "react";
import AppContext from "../AppContext.jsx";
import axios from "../lib/axios.jsx";

function useUpdateAccount()
{
    const {user, setUser, token} = useContext(AppContext)

    const updateProfile = ({setUpdated, setErrors, ...props}) => {
        return axios.put('/api/v1/account', {...props}, {
                            headers: { 'Authorization': `Bearer ${token}`}})
                    .then( response => {
                        setUser(response.data)
                        setUpdated(true)
                        setErrors([])
                        return response.data
                    })
                    .catch(error => {
                        setErrors(error.response.data.errors)
                        throw error
                    })
    }

    const updateImage = ({setUpdated, setErrors, ...props}) => {
        return axios.post('/api/v1/account/updateImage', props.data, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }})
                    .then( response => {
                        setUser({...user, ...response.data.user})
                        setUpdated(true)
                        setErrors([])
                        return response.data.user
                    })
                    .catch(error => {
                        setErrors(error.response.data.errors)
                        throw error
                    })
    }

    return {
        updateProfile,
        updateImage,
    }
}

export default useUpdateAccount