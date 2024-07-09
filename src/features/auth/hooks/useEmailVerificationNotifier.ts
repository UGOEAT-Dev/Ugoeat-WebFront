import { useMutation } from "@tanstack/react-query"
import axios from "@/lib/axios/axios"
import {isEmail} from "@/lib/utils"
import toast from "react-hot-toast"

function useEmailVerificationNotifier()
{
    const mutator = useMutation({
        mutationKey: ['/api/v1/email/notify'],
        mutationFn: (email: string) => axios.post('/api/v1/email/resend', { email }).then(response => response.data)
    })

    const notify = (email: string) => {
        if(mutator.isSuccess)
            return;

        if(email && isEmail(email)) {
            mutator.mutate(email, {
                onError: () => {
                    toast.error("Impossible d'envoyer le lien de verification, une erreur est survenue")
                },
                onSuccess: () => {
                    toast.success("L'email de verification a ete envoyé avec success.")
                }
            })
        } else {
            toast.error("Une adresse email est requise")
        }
    }

    return {mutator, notify}
}

export default useEmailVerificationNotifier