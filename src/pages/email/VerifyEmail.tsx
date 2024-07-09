import { useQueryUrl } from "@/features/common/hooks"
import Card from "./components/Card"
import axios from "@/lib/axios/axios"
import { useQuery } from "@tanstack/react-query"
import { ProgressSpinner } from "primereact/progressspinner"
import { NavLink } from "react-router-dom"

export default function VerifyEmail()
{
    const { verification_url, email } = useQueryUrl()
    const { isLoading, isError, isSuccess } = useQuery({
        queryKey: ['/api/v1/email/verify'],
        queryFn: async () => {
            if(verification_url && email) {
                const url = new URL(verification_url as string)

                return await axios.post(
                    `${url.pathname}${url.search}`,
                    { email: email as string}
                ).then(res => res.data)
            }
            return null
        }
    })

    return (
        <div className="min-h-screen justify-center items-center bg-gray-50 flex flex-col text-center">
            <Card>
                {isLoading ?
                    <ProgressSpinner /> :
                isSuccess?
                    <p>Email verifié avec success</p> :
                isError?
                    <>
                        <h1>Impossible de verifie votre email</h1>
                        <p>Lien de verification incorrect</p>
                    </> : <></>
                }
                <div>
                    <NavLink to={"/"} className="text-sm text-blue-700">Aller à l'acceuil</NavLink>
                </div>
            </Card>
        </div>
    )
}