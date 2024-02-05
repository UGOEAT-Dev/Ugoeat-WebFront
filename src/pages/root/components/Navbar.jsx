import {NavLink} from "react-router-dom";
import {BsCartDash} from "react-icons/bs";
import Input from "../../../components/Input.jsx";
import {AiOutlineSearch} from "react-icons/ai";
export default function Navbar({className = ""})
{

    return (
        <nav className={className}>
            <ul className={"lg:flex md:justify-around w-full text-center space-y-3 lg:space-y-0"}>
                <li><NavLink to='/'>Acceuil</NavLink></li>
                <li><NavLink to='/about'>A Propos</NavLink></li>
                <li><NavLink to='/order'>Commandez</NavLink></li>
                <li><NavLink to='/login'>Connexion</NavLink></li>
                <li><NavLink to='/register'>Inscription</NavLink></li>
                <li>
                    <button className="cart bg-green-400">
                        <span className="cart-text font-bold">2</span>
                        <BsCartDash className="cart-image"/>
                    </button>
                </li>
                <li>
                    <Input icon={<AiOutlineSearch size={20} className="font-bold" />} />
                </li>
            </ul>
        </nav>
    )
}