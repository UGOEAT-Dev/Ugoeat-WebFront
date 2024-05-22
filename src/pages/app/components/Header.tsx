import { useStoreContext } from "../../../features/store/hooks/useStoreContext";
import Navbar from "./Navbar";
import logoWhite from "/static.ugoeatonline.com/assets/images/logo-white.png"
import {useState} from "react";

export default function Header({onCartBtnClicked = null}: {onCartBtnClicked: any})
{
    const {cart} = useStoreContext()
    const [showNavbar, setShowNavbar] = useState(false)
    const toggleNavbar = () => { setShowNavbar((v) => !v)}


    return (
        <header className="bg-white lg:flex shadow-md sm:fixed top-0 z-10 w-full justify-evenly p-3 items-center">
            <div className="flex cursor-pointer items-center space-x-2" onClick={toggleNavbar}>
                <i className="pi pi-align-left block text-2xl mr-1 lg:hidden"></i>
                <img src={logoWhite} alt="logo-white" width="64"/>
            </div>
            <Navbar productOrderedCount={cart.products.length} onCartClicked={onCartBtnClicked} className={(showNavbar? "block h-auto" : "hidden h-0") + " md:h-auto lg:w-5/6 lg:mt-3"} />
        </header>
    )
}