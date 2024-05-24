import {useStoreContext} from "@/features/store/hooks/useStoreContext";
import toast from "react-hot-toast";
import { AccountService } from "../services/account.service";

function useUpdateAccount()
{
    const {setUser} = useStoreContext()

    const success = () => toast.success('Mise a jour effectue avec Sucess')

    const errors = () => toast.error('Oupps !!! Mise a jour impossible')

    function update(setErrors:any, data:any, formData: boolean = false){
        AccountService.update(data, formData).then( user => {
            success()
            setUser(user)
            setErrors({})
        }).catch(error => {
            errors()
            setErrors(error.response.data.errors)
            throw error
        })
    }

    return { update }
}

export default useUpdateAccount