
import logoWhite from "../../../assets/images/logo-white.png"
import {useContext} from "react";
import AppContext from "../../../AppContext.jsx";
import {AiOutlineMenu} from "react-icons/ai";
import {Link} from "react-router-dom";
import {Dropdown, DropdownItem} from "../../../components/dropdown/Dropdown.jsx";
import {CiLogout} from "react-icons/ci";
import {CgWebsite} from "react-icons/cg";
import {FaUserCircle} from "react-icons/fa";

function DashboardHeader({toggleSidebar, logout, ...props})
{
    const {user} = useContext(AppContext)

    return (
        <header className={"fixed w-full sm:relative bg-white mb-1 p-2 shadow-md " + props.className}>
            <div className="container m-auto flex justify-between">
                <div className="flex justify-between sm:w-[250px] items-center ">
                    <Link to='/' className="hidden sm:flex sm:text-xl md:text-2xl gap-1 items-center font-bold">
                        <img width={64} src={logoWhite}/>
                        <span>UGOEAT</span>
                    </Link>
                    <button
                        title="Toggle Navbar"
                        onClick={toggleSidebar}
                        className="border-2 h-fit p-2 rounded-md hover:bg-gray-100">
                        <AiOutlineMenu/>
                    </button>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-3 ">
                        <div className="flex items-center gap-1">
                            <img alt="_" src={user.image_url} className="rounded-full border" width="50" />
                            <div>
                                <h3 className="font-bold text-md">{user.name}</h3>
                                <span className="text-sm text-gray-500">{roleToName(user.role)}</span>
                            </div>
                        </div>
                    </div>
                    <Dropdown>
                        <DropdownItem text="Site Web" to="/"><CgWebsite /></DropdownItem>
                        <DropdownItem text="Profil" to="/dashboard/profile"><FaUserCircle /></DropdownItem>
                        <DropdownItem text="Se Deconnecter" to="/logout" action={logout}><CiLogout/></DropdownItem>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

function roleToName(role)
{
    const r = role.toLowerCase()
    if(r === 'customer')
        return 'Client'
    else if (r === 'restaurant')
        return 'Restaurant'
    else if (r === 'admin')
        return 'Administrateur'
    else
        return 'Non Valide'
}
export default DashboardHeader