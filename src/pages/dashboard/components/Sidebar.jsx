import SidebarLinkGroup from "./sidebar/SidebarLinkGroup.jsx";
import SidebarLinkItem from "./sidebar/SidebarLinkItem.jsx";
import {
    AiOutlineHome,
    AiOutlineMenu,
    AiOutlineSetting,
    AiOutlineUser,
    AiOutlineWallet
} from "react-icons/ai";
import {SidebarContext} from "./sidebar/SidebarContext.jsx";


function Sidebar({mode, ...props})
{
    return (
        <SidebarContext.Provider value={{mode}}>
            <div className={`${mode === 1 ? 'md:w-[350px]' : ''} sidebar bg-white pt-2 px-3 rounded-r-md ` + props.className}>
                <nav>
                    <SidebarLinkGroup name="Dashboard">
                        <SidebarLinkItem text="Accueil" link='/dashboard/home' ><AiOutlineHome /></SidebarLinkItem>
                        <SidebarLinkItem text="Mes Commandes" link='/dashboard/orders'><AiOutlineMenu /></SidebarLinkItem>
                        <SidebarLinkItem text="Mes Payements" link='/dashboard/payments'><AiOutlineWallet /></SidebarLinkItem>
                    </SidebarLinkGroup>
                    <hr className="my-5" />
                    <SidebarLinkGroup name="Account" className="">
                        <SidebarLinkItem text="Profil" link='/dashboard/profile'><AiOutlineUser /></SidebarLinkItem>
                        <SidebarLinkItem text="Parametres" link='/dashboard/settings'><AiOutlineSetting /></SidebarLinkItem>
                    </SidebarLinkGroup>
                </nav>
            </div>
        </SidebarContext.Provider>
    )
}

export default Sidebar