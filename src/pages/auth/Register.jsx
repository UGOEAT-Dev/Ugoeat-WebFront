
import InputWithLabel from "../../components/InputWithLabel.jsx";
import {Link} from "react-router-dom";
import bgRegister from "../../assets/images/bg-register.svg"
import SelectBox from "../../components/SelectBox.jsx";
import {useState} from "react";

export default function Register()
{
    const [role, setRole] = useState('customer')
    
    return (
        <div className="bg-center bg-cover sm:min-h-screen flex sm:items-center justify-center py-5 lg:pt-24 lg:pb-10 px-2" style={{
            backgroundImage: `url(${bgRegister})`,
        }}>
            <form className="rounded-md shadow-xl bg-white w-full md:w-[600px] px-5 py-10 space-y-5" action="#">
                <h2 className="text-center text-2xl font-bold">Inscrivez-vous</h2>
                <SelectBox label="Vous Etes ?" name="role" id="role" className="text-md" onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Un Client</option>
                    <option value="restaurant">Un Restaurant</option>
                </SelectBox>
                <InputWithLabel id="name" label={role === 'customer' ? "Noms et Prenoms" : "Nom du Restaurant"} name="name" placeholder="Ex: John Doe" />
                <InputWithLabel id="email" label="Email" type="email" name="email" placeholder="name@company" />
                <InputWithLabel id="password" label="Mot de passe" type="password" name="password" placeholder="*******" />
                <InputWithLabel id="password_confirmation" label="Confirmer le mot de passe" name="password_confirmation" placeholder="*******" />
                <div className="hidden justify-between text-sm">
                    <div>
                        <input type="checkbox" id="keepOnline" name="keepOnline" />
                        &thinsp;&thinsp;
                        <label htmlFor="keepOnline">Rester Connecter</label>
                    </div>
                    <Link to="#" className="text-blue-600">Mot de passe oublie?</Link>
                </div>
                <button type="submit" className="font-bold text-white bg-green p-3 rounded-md w-full hover:bg-gray-950">S&apos;inscrire</button>
                <p className="text-sm font-bold">Vous avez deja un compte? <Link to="/login" className="text-blue-600">Connectez vous</Link></p>
            </form>
        </div>
    )
}