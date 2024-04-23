import { useAppContext } from "../../../core/context/AppContext";
import Navbar from "./Navbar";
import logoWhite from "/static.ugoeatonline.com/assets/images/logo-white.png"
import {useState} from "react";

export default function Header({onCartBtnClicked = null})
{
    const {order} = useAppContext()
    const [showNavbar, setShowNavbar] = useState(false)
    const toggleNavbar = () => { setShowNavbar((v) => !v)}


    return (
        <header className="lg:flex shadow-md sm:fixed top-0 z-10 w-full sm:bg-black sm:bg-opacity-70 justify-evenly p-3 items-center">
            <div className="flex cursor-pointer items-center space-x-2" onClick={toggleNavbar}>
                <i className="pi pi-align-left block text-2xl mr-1 sm:text-white lg:hidden"></i>
                <img src={logoWhite} alt="logo-white" width="64"/>
            </div>
            <Navbar productOrderedCount={order.products?.length ?? 0} onCartClicked={onCartBtnClicked} className={(showNavbar? "block h-auto" : "hidden h-0") + " md:h-auto lg:w-5/6 lg:mt-3"} />
        </header>
    )
}