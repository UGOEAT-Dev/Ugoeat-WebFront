
import logoWhite from "/static.ugoeatonline.com/assets/images/logo-white.png"
import {Link} from "react-router-dom";
import {Dropdown, DropdownItem} from "../../../components/dropdown/Dropdown";
import {Icon} from "../../../components/Icon"
import RoundedImage from "../../../components/RoundedImage";
import { useAppContext } from "../../../core/context/AppContext";
import { UserRole } from "../../../core/types/User";
import { routesConfig } from "../../../router.config";
import { Badge } from "primereact/badge";

function DashboardHeader({toggleSidebar, ...props}: {toggleSidebar: any, className?: string})
{
    const {user} = useAppContext()
    const {routes} = routesConfig

    return (
        <header className={"fixed w-full z-10 sm:relative bg-white mb-1 p-2 shadow-md " + props.className}>
            <div className="container m-auto flex justify-between">
                <div className="flex justify-between sm:w-[250px] items-center ">
                    <Link to={routes.app.home} className="hidden sm:flex sm:text-xl md:text-2xl gap-1 items-center font-bold">
                        <img width={64} src={logoWhite}/>
                        <span>UGOEAT</span>
                    </Link>
                    <button
                        title="Toggle Navbar"
                        onClick={toggleSidebar}
                        className="border-2 h-fit p-2 rounded-md hover:bg-gray-100">
                        <Icon icon="pi-bars" />
                    </button>
                </div>
                <div className="flex gap-3">
                    <button className="" title="Notifications">
                        <Icon icon="pi-bell" className="p-overlay-badge" style={{fontSize: '1.6rem'}}>
                            <Badge value={0} severity='danger' />
                        </Icon>
                    </button>
                    <div className="flex gap-3 ">
                        <div className="flex items-center gap-1 capitalize">
                            <RoundedImage size={50} src={user.image_url}/>
                            <div>
                                <h3 className="font-bold text-md">{user.name}</h3>
                                <span className="text-sm text-gray-500">{roleToName(user.role)}</span>
                            </div>
                        </div>
                    </div>
                    <Dropdown className="z-10">
                        <DropdownItem text="Site Web" to={routes.app.home}><Icon icon="pi-globe"/></DropdownItem>
                        <DropdownItem text="Profil" to={routes.dashboard.profile}><Icon icon="pi-user"/></DropdownItem>
                        <DropdownItem text="Se Deconnecter" to={routes.auth.logout}><Icon icon="pi-sign-out"/></DropdownItem>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}

function roleToName(role?: UserRole)
{
    const r = role?.toLowerCase()
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