import {useAppContext} from "../context/AppContext";
import axios from "../lib/axios";
import toast from "react-hot-toast";

function useUpdateAccount()
{
    const {setUser, token} = useAppContext()

    const success = () => toast.success('Mise a jour effectue avec Sucess')

    const errors = () => toast.error('Oupps !!! Mise a jour impossible')

    const updateProfile = (setErrors:any, data:any) => {
        return axios.put('/api/v1/account', data, {
                            headers: { 'Authorization': `Bearer ${token}`}})
                    .then( response => {
                        setUser(response.data.data)
                        success()
                        setErrors({})
                        return response.data
                    })
                    .catch(error => {
                        errors()
                        setErrors(error.response.data.errors)
                        throw error
                    })
    }

    const updateImage = ({setErrors, ...props}: {setErrors:any, data:any}) => {
        return axios.post('/api/v1/account', props.data, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }})
                    .then( response => {
                        setUser({...response.data.data})
                        success()
                        setErrors({})
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