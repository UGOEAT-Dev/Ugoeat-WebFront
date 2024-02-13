import {NavLink} from "react-router-dom";
import Input from "../../../components/Input.jsx";
import cartSvg from "../../../assets/images/icons/cart-vector.svg"
import {AiOutlineSearch} from "react-icons/ai";
import {useContext} from "react";
import AppContext from "../../../AppContext.jsx";
import {isUserLoggedIn} from "../../../lib/helpers.jsx";
import {Dropdown, DropdownItem} from "../../../components/dropdown/Dropdown.jsx";

export default function Navbar({productOrderedCount = 0, onCartClicked = null, ...props})
{
    const {user, token} = useContext(AppContext)

    return (
        <nav className={props.className + " lg:block"}>
            <ul className={"lg:flex md:justify-around w-full text-center space-y-3 lg:space-y-0"}>
                <li><NavLink to='/'>Accueil</NavLink></li>
                <li><NavLink to='/about'>A Propos</NavLink></li>
                <li><NavLink to='/order'>Commandez</NavLink></li>
                {isUserLoggedIn(user, token) ?
                    (   <>
                            <li>
                                <Dropdown text={user.name}>
                                    <DropdownItem to="/dashboard" text="Dashboard"></DropdownItem>
                                    <DropdownItem to="javascript:void(0)" text="Se Deconnecter"></DropdownItem>
                                </Dropdown>
                            </li>
                        </>
                    )
                    :(  <>
                            <li><NavLink to='/login'>Connexion</NavLink></li>
                            <li><NavLink to='/register'>Inscription</NavLink></li>
                        </>
                    )
                }
                <li>
                    <button onClick={onCartClicked} className="cart bg-green">
                        <span className="cart-text font-bold">{productOrderedCount}</span>
                        <img src={cartSvg} className="cart-image" alt="cart_image" />
                    </button>
                </li>
                <li>
                    <Input className="rounded-xl px-2 mx-auto bg-gray-300" icon={<AiOutlineSearch size={20} className="font-bold" />} />
                </li>
            </ul>
        </nav>
    )
}