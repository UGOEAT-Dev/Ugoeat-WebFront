import InputWithLabel from "../../components/InputWithLabel.jsx";
import {Link} from "react-router-dom";
import bgLogin from "../../assets/images/bg-login.png"

export default function Login()
{
    return (
        <div className="bg-center bg-cover sm:h-screen flex sm:items-center justify-center py-5 px-2" style={{
            backgroundImage: `url(${bgLogin})`,
        }}>
            <form className="rounded-md shadow-xl bg-white w-full md:w-[600px] px-5 py-10 space-y-5" action="#">
                <h2 className="text-center text-2xl font-bold">Connectez-vous</h2>
                <InputWithLabel id="email" label="Email" type="email" name="email" placeholder="name@company" />
                <InputWithLabel id="password" label="Mot de passe" type="password" name="password" placeholder="*******" />
                <div className="flex justify-between text-sm">
                    <div>
                        <input type="checkbox" id="keepOnline" name="keepOnline" />
                        &thinsp;&thinsp;
                        <label htmlFor="keepOnline">Rester Connecter</label>
                    </div>
                    <Link to="#" className="text-blue-600">Mot de passe oublie?</Link>
                </div>
                <button type="submit" className="font-bold text-white bg-green p-3 rounded-md w-full hover:bg-gray-950">Se Connecter</button>
                <p className="text-sm font-bold">Vous n&apos;avez pas de compte? <Link to="/register" className="text-blue-600">Creez en un.</Link></p>
            </form>
        </div>
    )
}