
import InputWithLabel from "../../../components/input/InputWithLabel.js";
import {Link} from "react-router-dom";
import bgRegister from "/static.ugoeatonline.com/assets/images/bg-register.svg"
import SelectBox from "../../../components/SelectBox";
import {FormEventHandler, useEffect, useState} from "react";
import queryString from "query-string";
import {isUserLoggedIn} from "../../../core/lib/helpers";
import useAuth from "../../../core/hooks/useAuth";
import { UserRole } from "../../../core/types/User.js";
import { RegistrationError } from "../../../core/types/error/RegistrationError.js";

export default function Register()
{
    const qParsed = queryString.parseUrl(location.search)
    const [errors, setErrors] = useState<RegistrationError>({})
    const { register, token, user } = useAuth("guest", qParsed.query.r?.toString() ?? '/dashboard')
    const [role, setRole] = useState<UserRole>('customer')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    useEffect(() => {
        document.title = "S'inscrire | UGOEAT";
        // document.querySelector('meta[property="og:title"]').content = "S'inscrire";
    }, [])

    const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        register(setErrors, {
            email,
            password,
            role,
            password_confirmation: passwordConfirmation,
            name
        })
    }

    if(isUserLoggedIn(user, token))
        return (<div></div>)

    return (
        <main className="bg-center bg-cover min-h-screen flex sm:items-center justify-center py-5 sm:pt-24 sm:pb-10 px-2" style={{
            backgroundImage: `url(${bgRegister})`,
        }}>
            <form onSubmit={submitForm} className="rounded-md shadow-xl bg-white w-full md:w-[600px] px-5 py-10 space-y-3" action="#">
                <h2 className="text-center text-2xl font-bold">Inscrivez-vous</h2>
                <SelectBox label="Vous Etes ?" name="role" id="role" className="text-md" onChange={(e) => setRole(e.target.value.toLowerCase() === 'customer' ? 'customer' : 'restaurant')}>
                    <option value="customer">Un Client</option>
                    <option value="restaurant">Un Restaurant</option>
                </SelectBox>
                <InputWithLabel error={errors.errors?.name ?? ''} id="name" onChange={(e) => setName(e.target.value)} label={role === 'customer' ? "Noms et Prenoms" : "Nom du Restaurant"} name="name" placeholder="Ex: John Doe" />
                <InputWithLabel error={errors.errors?.email} id="email" label="Email" onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="name@company" />
                <InputWithLabel error={errors.errors?.password} id="password" label="Mot de passe" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="*******" />
                <InputWithLabel error={errors.errors?.password_confirmation} id="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} label="Confirmer le mot de passe" name="password_confirmation" placeholder="*******" />
                <button type="submit" className="font-bold text-white bg-green p-3 rounded-md w-full hover:bg-gray-950">S&apos;inscrire</button>
                <p className="text-sm font-bold">Vous avez deja un compte? <Link to="/auth/login" className="text-blue-600">Connectez vous</Link></p>
            </form>
        </main>
    )
}