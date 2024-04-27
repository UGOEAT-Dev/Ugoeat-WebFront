import { Button } from "primereact/button"
import { FormEventHandler, useEffect, useState } from "react"
import InputWithLabel from "../../components/input/InputWithLabel"
import queryString from "query-string"
import axios from "../../core/lib/axios"
import toast from "react-hot-toast"
import { RegistrationError } from "../../core/types/error/RegistrationError"
import { Link } from "react-router-dom"
import { routesConfig } from "../../router.config"

function ResetPassword()
{
    const parsed = queryString.parseUrl(window.location.href)
    const token = parsed.query.token as string ?? ''
    const email = parsed.query.email as string ?? ''
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState<RegistrationError>({})
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        document.title = 'Mot de passe | UGOEAT'
    }, [])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        axios.post(
            '/api/auth/reset-password', 
            { email, password, password_confirmation, token },
            { headers: {'Content-Type': 'application/json'}}
        ).then(() => {
            toast.success("Mot de passe modifier avec success")
            setSuccess(true)
        }).catch((e) => {
            setError(e.response.data)
            if(error.message)
                toast.error(error.message)
            throw e
        })
    }

    return (
        <>
            <main className="bg-gray-100">
                <div className="form-wrapper gap-10">
                    <img src="/favicon.png"/>
                    { !success ?
                        <form onSubmit={onSubmit} className="bg-white shadow-md p-5 w-[80%] sm:w-[400px] rounded-md">
                            <h2 className="text-center">Modifier le mot de passe</h2>
                            <div className="mt-5">
                                <InputWithLabel 
                                    name="password"
                                    type="password"
                                    error={error.errors?.password}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                    className="mb-3" required />
                                <InputWithLabel 
                                    name="password_confirmation"
                                    error={error.errors?.password_confirmation}
                                    value={password_confirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder="Confirmer Mot de passe"
                                    className="mb-3" required />
                                <input type="hidden" name="email" value={email} required/>
                                <input type="hidden" name="token" value={token} required/>
                            </div>
                            <Button 
                                type="submit"
                                label="Modifier"
                                className="px-3 py-2 bg-primary hover:bg-gray-900 text-white w-full" />
                        </form>
                        :
                        <div className="text-center w-[80%] sm:w-[400px]">
                            <p className="mb-5">Votre mot de passe a ete recuperer avec succes, vous pouvez a nouveau vous connecter a votre compte.</p>
                            <Link 
                                to={routesConfig.routes.auth.login} 
                                className="block bg-primary font-bold hover:bg-gray-900 text-white rounded-md shadow-md px-3 py-2">Connexion</Link>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default ResetPassword