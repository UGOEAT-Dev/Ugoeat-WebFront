import Navbar from "./Navbar.jsx";
import {AiOutlineMenu} from "react-icons/ai";
import logoWhite from "../../../assets/images/logo-white.png"
import {useState} from "react";

export default function Header({onNavBarBtnClicked = null})
{
    const [showNavbar, setShowNavbar] = useState(() => window.innerWidth > 1024)
    const toggleNavbar = () => { setShowNavbar((v) => !v)}


    return (
        <header className="lg:flex fixed top-0 z-10 w-full bg-black bg-opacity-70 justify-evenly p-3 items-center">
            <div className="flex cursor-pointer items-center space-x-2" onClick={toggleNavbar}>
                <AiOutlineMenu size={24} className="block text-white lg:hidden"/>
                <img src={logoWhite} alt="logo-white" width="64"/>
            </div>
            <Navbar className={(showNavbar? "block h-auto" : "hidden h-0") + " lg:block lg:h-auto lg:w-5/6 lg:mt-3"} />
        </header>
    )
}