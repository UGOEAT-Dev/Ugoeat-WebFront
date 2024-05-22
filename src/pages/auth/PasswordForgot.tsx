import { FormEventHandler, useEffect, useState } from "react"
import InputWithLabel from "@/features/common/components/elements/input/InputWithLabel"
import { Button } from "primereact/button"
import axios from "@/lib/axios/axios"
import { ProgressSpinner } from "primereact/progressspinner"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { routesConfig } from "@/router/router.config"

function PasswordForgot()
{
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [mailSend, setMailSended] = useState(false)

    useEffect(() => {
        document.title = "Mot de passe oublie | UGOEAT"
    }, [])

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if(!email || !email.match("^(.+)@[\.a-zA-Z]+$")) {
            toast.error("Une adresse email est requise")
            return;
        }

        setLoading(true)
        await axios.post(
            '/api/auth/forgot-password', { email },
            { headers: {'Content-Type': 'application/json'}}
        ).finally(() => {
            setLoading(false)
            setMailSended(true)
        })
    }

    return (
        <main className="bg-gray-100">
            <div className="form-wrapper gap-10">
                <img src="/favicon.png"/>
                <form onSubmit={onSubmit} className="bg-white border-2 rounded-md shadow-md p-5 w-[80%] sm:w-[400px]">
                    <h2 className="text-center">Mot de passe oublie ?</h2>
                    <p className="mt-2 text-center">Entrer votre email pour recevoir un mail de recuperation.</p>
                    <div className="py-2 mt-5">
                        <InputWithLabel 
                            className="mb-3 rounded border-gray-400" 
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            disabled={mailSend} 
                            placeholder="Email"/>
                        <div className="text-center">
                        {
                            loading ? <ProgressSpinner aria-label="Loading ..." style={{width: '50px'}} /> : mailSend && <span className="text-sm font-semibold">Un mail de recuperation de mot de passe sera envoye a votre email si elle existe.</span>
                        }
                        </div>
                        <Button 
                            type="submit" 
                            disabled={mailSend}
                            icon={`pi ${mailSend ? 'pi-check-circle' : 'pi-send'}`} 
                            label={mailSend ? 'OK' : 'Soumettre'} 
                            className={`w-full px-3 py-2 rounded text-white ${mailSend ? 'bg-primary mt-2' : 'bg-primary hover:bg-gray-900'}`}></Button>
                    </div>
                    {
                        mailSend && <p className="text-center"><Link className="underline text-blue-800 text-sm" to={routesConfig.routes.auth.login}>Revenir au Login</Link></p>
                    }
                </form>
            </div>
        </main>
    )
}

export default PasswordForgot