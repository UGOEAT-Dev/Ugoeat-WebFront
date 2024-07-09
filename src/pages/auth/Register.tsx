
import InputWithLabel from "@/features/common/components/elements/input/InputWithLabel.js";
import {Link} from "react-router-dom";
import SelectBox from "@/features/common/components/elements/SelectBox.js";
import {FormEventHandler, useEffect, useState} from "react";
import {isUserLoggedIn} from "@/lib/helpers.js";
import {useAuth} from "@/features/auth/hooks";
import { RegistrationError } from "../../features/common/types/error/RegistrationError.js";
import { useMiddleware, useQueryUrl, useUserReducer } from "@/features/common/hooks";

export default function Register()
{
    useMiddleware('guest')
    const {redirectTo} = useQueryUrl()
    const [errors, setErrors] = useState<RegistrationError>({})
    const { register } = useAuth(redirectTo as string ?? undefined, 'guest')
    const {
        state, 
        setEmail,
        setRole, 
        setName, 
        setPassword, 
        setPasswordConfirmation
    } = useUserReducer({id: 0, role: 'customer'})
    const { role, password, email, name, password_confirmation } = state

    useEffect(() => {
        document.title = "S'inscrire | UGOEAT";
        // document.querySelector('meta[property="og:title"]').content = "S'inscrire";
    }, [])

    const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        if(email && password && role && password_confirmation && name) {
            register({email, password, role, password_confirmation, name}, setErrors)
        }
    }

    if(isUserLoggedIn())
        return (<div></div>)

    return (
        <main className="form-wrapper bg-center bg-cover bg-gray-100 py-3  px-2" style={{
            // backgroundImage: `url(${bgRegister})`,
        }}>
            <img src="/favicon.png"/>
            <form onSubmit={submitForm} className="rounded-md shadow-xl bg-white w-full md:w-[600px] px-5 py-5 space-y-1.5" action="#">
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