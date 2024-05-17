import {NavLink} from "react-router-dom";
import {Input} from "../../../components/input/Input.js";
import cartSvg from "/static.ugoeatonline.com/assets/images/icons/cart-vector.svg"
import {isUserLoggedIn} from "./../../../core/lib/helpers";
import {Dropdown, DropdownItem} from "../../../components/dropdown/Dropdown";
import { useStoreContext } from "../../../features/store/store.context.js";
import { routesConfig } from "../../../router.config.js";

interface NavbarProps
{
    productOrderedCount: number,
    onCartClicked: any,
    className?: string 
}
export default function Navbar({productOrderedCount, onCartClicked, ...props}: NavbarProps)
{
    const {user} = useStoreContext()
    const {auth, app, dashboard} = routesConfig.routes

    return (
        <nav className={props.className + " lg:block"}>
            <ul className={"lg:flex md:justify-around w-full text-center space-y-3 lg:space-y-0"}>
                <li><NavLink to={app.home}>Accueil</NavLink></li>
                <li><NavLink to={app.about}>A Propos</NavLink></li>
                <li><NavLink to={app.order}>Commandez</NavLink></li>
                {isUserLoggedIn() ?
                    (   <>
                            <li>
                                <Dropdown text={user.name ?? ''} className="capitalize">
                                    <DropdownItem to={dashboard.index} text="Dashboard"><></></DropdownItem>
                                    <DropdownItem to={auth.logout} text="Se Deconnecter"><></></DropdownItem>
                                </Dropdown>
                            </li>
                        </>
                    )
                    :(  <>
                            <li><NavLink to={auth.login}>Connexion</NavLink></li>
                            <li><NavLink to={auth.register}>Inscription</NavLink></li>
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
                    <Input
                        placeholder="Search"
                        className="rounded-xl px-2 mx-auto bg-gray-200"
                        icon='pi pi-search text-gray-400' />
                </li>
            </ul>
        </nav>
    )
}