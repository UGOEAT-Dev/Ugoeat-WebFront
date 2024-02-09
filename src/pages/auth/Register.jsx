
import InputWithLabel from "../../components/InputWithLabel.jsx";
import {Link} from "react-router-dom";
import bgRegister from "../../assets/images/bg-register.svg"
import SelectBox from "../../components/SelectBox.jsx";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth.jsx";

export default function Register()
{
    const [errors, setErrors] = useState({})
    const { register, token, user } = useAuth("guest", "/dashboard")
    const [role, setRole] = useState('customer')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const submitForm = (event) => {
        event.preventDefault()
        register({
            setErrors,
            email,
            password,
            role,
            password_confirmation: passwordConfirmation,
            name
        })
    }
    useEffect(() => {

    }, [errors, token, user])

    return (
        <div className="bg-center bg-cover sm:min-h-screen flex sm:items-center justify-center py-5 sm:pt-24 sm:pb-10 px-2" style={{
            backgroundImage: `url(${bgRegister})`,
        }}>
            <form onSubmit={submitForm} className="rounded-md shadow-xl bg-white w-full md:w-[600px] px-5 py-10 space-y-5" action="#">
                <h2 className="text-center text-2xl font-bold">Inscrivez-vous</h2>
                <SelectBox label="Vous Etes ?" name="role" id="role" className="text-md" onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Un Client</option>
                    <option value="restaurant">Un Restaurant</option>
                </SelectBox>
                <InputWithLabel error={errors.name} id="name" onChange={(e) => setName(e.target.value)} label={role === 'customer' ? "Noms et Prenoms" : "Nom du Restaurant"} name="name" placeholder="Ex: John Doe" />
                <InputWithLabel error={errors.email} id="email" label="Email" onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="name@company" />
                <InputWithLabel error={errors.password} id="password" label="Mot de passe" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="*******" />
                <InputWithLabel error={errors.password_confirmation} id="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} label="Confirmer le mot de passe" name="password_confirmation" placeholder="*******" />
                <button type="submit" className="font-bold text-white bg-green p-3 rounded-md w-full hover:bg-gray-950">S&apos;inscrire</button>
                <p className="text-sm font-bold">Vous avez deja un compte? <Link to="/login" className="text-blue-600">Connectez vous</Link></p>
            </form>
        </div>
    )
}