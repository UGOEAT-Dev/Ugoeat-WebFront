import Navbar from "./Navbar.jsx";
import {AiOutlineMenu} from "react-icons/ai";
import logoWhite from "/static.ugoeatonline.com/assets/images/logo-white.png"
import {useState} from "react";

export default function Header({products = [], onCartBtnClicked = null})
{
    const [showNavbar, setShowNavbar] = useState(false)
    const toggleNavbar = () => { setShowNavbar((v) => !v)}


    return (
        <header className="lg:flex shadow-md sm:fixed top-0 z-10 w-full sm:bg-black sm:bg-opacity-70 justify-evenly p-3 items-center">
            <div className="flex cursor-pointer items-center space-x-2" onClick={toggleNavbar}>
                <AiOutlineMenu size={24} className="block sm:text-white lg:hidden"/>
                <img src={logoWhite} alt="logo-white" width="64"/>
            </div>
            <Navbar productOrderedCount={products.length} onCartClicked={onCartBtnClicked} className={(showNavbar? "block h-auto" : "hidden h-0") + " md:h-auto lg:w-5/6 lg:mt-3"} />
        </header>
    )
}