import Navbar from "./Navbar.jsx";
import {AiOutlineMenu} from "react-icons/ai";
import logoWhite from "../../../assets/images/logo-white.png"

export default function Header({onNavBarBtnClicked = null})
{

    return (
        <header className="lg:flex lg:fixed lg:top-0 z-10 w-full bg-transparent lg:bg-black lg:bg-opacity-70 bg-gray-50 justify-evenly p-3 items-center">
            <div className="flex cursor-pointer items-center space-x-2" onClick={onNavBarBtnClicked}>
                <AiOutlineMenu size={24} className="block lg:hidden"/>
                <img src={logoWhite} alt="logo-white" width="64"/>
            </div>
            <Navbar className="lg:w-5/6 lg:mt-3" />
        </header>
    )
}