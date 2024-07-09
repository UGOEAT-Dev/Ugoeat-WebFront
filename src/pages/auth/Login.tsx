import {FormEventHandler, useEffect} from "react"
import InputWithLabel from "../../features/common/components/elements/input/InputWithLabel.js";
import {Link} from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/index.js";
import toast from "react-hot-toast";
import { isUserLoggedIn } from "@/lib/helpers.js";
import { useMiddleware, useQueryUrl, useUserReducer } from "@/features/common/hooks";

export default function Login()
{
    useMiddleware('guest')
    const {redirectTo} = useQueryUrl()
    const {state, setEmail, setPassword} = useUserReducer()
    const {email, password} = state
    const { login } = useAuth(redirectTo as string ?? undefined, 'guest')

    useEffect(() => {
        document.title = "Se Connecter | UGOEAT";
        // document.querySelector('meta[property="og:title"]').content = "Se Connecter";
    }, [])

    const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if(email && password)
            login({ email , password})
        else
            toast.error("Oups!! Quelque chose c'est mal passe")
    }

    if( isUserLoggedIn() ) return (<div></div>)

    return (
        <main className="bg-center bg-cover bg-gray-100 min-h-screen flex flex-col items-center justify-center py-5 px-2 gap-5">
            <img src="/favicon.png"/>
            <form onSubmit={submitForm} className="rounded-md shadow-xl bg-white w-[90%] sm:w-[400px] px-5 py-10 space-y-5" action="#">
                <h2 className="text-center text-2xl font-bold">Connectez-vous</h2>
                <InputWithLabel 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email" label="Email" type="email" name="email" placeholder="name@company" />
                <InputWithLabel 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="password" label="Mot de passe" type="password" name="password" placeholder="*******" />
                <div className="flex justify-between text-sm">
                    <div>
                        <input type="checkbox" id="keepOnline" name="keepOnline" />
                        &thinsp;&thinsp;
                        <label htmlFor="keepOnline">Rester Connecter</label>
                    </div>
                    <Link to="/auth/forgot-password" className="text-blue-600">Mot de passe oublie?</Link>
                </div>
                <button type="submit" className="font-bold text-white bg-green p-3 rounded-md w-full hover:bg-gray-950">Se Connecter</button>
                <p className="text-sm font-bold">Vous n&apos;avez pas de compte? <Link to="/auth/register" className="text-blue-600">Creez en un.</Link></p>
            </form>
        </main>
    )
}