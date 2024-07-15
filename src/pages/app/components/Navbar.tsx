import {NavLink} from "react-router-dom";
import cartSvg from "/static.ugoeatonline.com/assets/images/icons/cart-vector.svg"
import {isUserLoggedIn} from "../../../lib/helpers.js";
import {Dropdown, DropdownItem} from "../../../features/common/components/elements/dropdown/Dropdown.js";
import { useStoreContext } from "../../../features/store/hooks/useStoreContext.js";
import { routesConfig } from "../../../router/router.config.js";
import SearchButton from "@/features/search/components/SearchButton.js";

interface NavbarProps
{
    productOrderedCount: number,
    onCartClicked: any,
    className?: string 
}
export default function Navbar({productOrderedCount, onCartClicked, ...props}: NavbarProps)
{
    const {user} = useStoreContext()
    const {auth, app, dashboard, email} = routesConfig.routes

    return (
        <nav className={props.className + " lg:block"}>
            <ul className={"lg:flex md:justify-around w-full text-center space-y-3 lg:space-y-0"}>
                <li><NavLink to={app.home}>Accueil</NavLink></li>
                <li><NavLink to={app.about}>A Propos</NavLink></li>
                <li><NavLink to={app.products}>Nos Produits</NavLink></li>
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
                            <li><NavLink to={`${auth.register}?redirectTo=${encodeURI(email.notify)}`}>Inscription</NavLink></li>
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
                    <SearchButton />
                </li>
            </ul>
        </nav>
    )
}