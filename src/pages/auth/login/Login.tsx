import {FormEventHandler, useEffect, useState} from "react"
import InputWithLabel from "../../../components/input/InputWithLabel.js";
import {Link} from "react-router-dom";
import bgLogin from "/static.ugoeatonline.com/assets/images/bg-login.png"
import useAuth from "../../../core/hooks/useAuth";
// import queryString from "query-string";
import {isUserLoggedIn} from "../../../core/lib/helpers";

export default function Login()
{
    // const qParsed = queryString.parseUrl(location.search)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, token, user } = useAuth('guest',  /*qParsed.query.r ??*/ '/dashboard')

    useEffect(() => {
        document.title = "Se Connecter | UGOEAT";
        // document.querySelector('meta[property="og:title"]').content = "Se Connecter";
    }, [])

    const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        login(null, { email, password })
    }

    if( isUserLoggedIn(user, token)) return (<div></div>)

    return (
        <main className="bg-center bg-cover h-screen flex items-center justify-center py-5 px-2" style={{
            backgroundImage: `url(${bgLogin})`,
        }}>
            <form onSubmit={submitForm} className="rounded-md shadow-xl bg-white w-full md:w-[600px] px-5 py-10 space-y-5" action="#">
                <h2 className="text-center text-2xl font-bold">Connectez-vous</h2>
                <InputWithLabel onChange={(e) => setEmail(e.target.value)} id="email" label="Email" type="email" name="email" placeholder="name@company" />
                <InputWithLabel onChange={(e) => setPassword(e.target.value)} id="password" label="Mot de passe" type="password" name="password" placeholder="*******" />
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