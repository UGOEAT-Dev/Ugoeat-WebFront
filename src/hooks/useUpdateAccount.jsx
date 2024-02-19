import {useContext} from "react";
import AppContext from "../AppContext.jsx";
import axios from "../lib/axios.jsx";
import toast from "react-hot-toast";

function useUpdateAccount()
{
    const {user, setUser, token} = useContext(AppContext)

    const success = () => toast.success('Mise a jour effectue avec Sucess')

    const errors = () => toast.error('Oupps !!! Mise a jour impossible')

    const updateProfile = ({setErrors, ...props}) => {
        return axios.put('/api/v1/account', {...props}, {
                            headers: { 'Authorization': `Bearer ${token}`}})
                    .then( response => {
                        setUser(response.data)
                        success()
                        setErrors([])
                        return response.data
                    })
                    .catch(error => {
                        errors()
                        setErrors(error.response.data.errors)
                        throw error
                    })
    }

    const updateImage = ({setErrors, ...props}) => {
        return axios.post('/api/v1/account/updateImage', props.data, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }})
                    .then( response => {
                        setUser({...user, ...response.data.user})
                        success()
                        setErrors([])
                        return response.data.user
                    })
                    .catch(error => {
                        errors()
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