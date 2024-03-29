import SidebarLinkGroup from "./sidebar/SidebarLinkGroup.jsx";
import SidebarLinkItem from "./sidebar/SidebarLinkItem.jsx";
import {
    AiOutlineHome,
    AiOutlineMenu,
    AiOutlineSetting,
    AiOutlineWallet
} from "react-icons/ai";
import {SidebarContext} from "./sidebar/SidebarContext.jsx";
import {MdOutlineQueryStats, MdProductionQuantityLimits} from "react-icons/md";
import {BiCommand, BiRestaurant} from "react-icons/bi";
import {useContext} from "react";
import AppContext from "../../../AppContext.jsx";
import {TbCategory} from "react-icons/tb";
import {FaUserCircle, FaUsers} from "react-icons/fa";


function Sidebar({mode, ...props})
{
    const { user } = useContext(AppContext)

    return (
        <SidebarContext.Provider value={{mode}}>
            <div className={`${mode === 1 ? 'w-full pb-5 sm:w-[300px]' : ' sm:block'} sidebar bg-white pt-2 px-3 rounded-xl ` + props.className}>
                <nav>
                    <SidebarLinkGroup name="General">
                        <SidebarLinkItem text="Accueil" link='/dashboard/home' ><AiOutlineHome /></SidebarLinkItem>
                        <SidebarLinkItem text="Mes Commandes" link='/dashboard/orders'><AiOutlineMenu /></SidebarLinkItem>
                        { /* <SidebarLinkItem text="Mes Payements" link='/dashboard/payments'><AiOutlineWallet /></SidebarLinkItem> */}
                    </SidebarLinkGroup>
                    <hr className="my-5" />
                    { (user.role.toLowerCase() !== 'customer') ? ( <>
                        <SidebarLinkGroup name="Gestion">
                            {(user.role.toLowerCase() === 'restaurant') ? (<>
                                <SidebarLinkItem text="Mes Produits" link='/dashboard/products' ><MdProductionQuantityLimits /></SidebarLinkItem>
                                </>) : (user.role.toLowerCase() === 'admin') ? (<>
                                <SidebarLinkItem text="Clients" link='/dashboard/customers'><FaUsers /></SidebarLinkItem>
                                <SidebarLinkItem text="Restaurants" link='/dashboard/restaurants'><BiRestaurant /></SidebarLinkItem>
                                <SidebarLinkItem text="Commandes" link='/dashboard/orders_'><BiCommand /></SidebarLinkItem>
                                <SidebarLinkItem text="Categories" link='/dashboard/categories'><TbCategory /></SidebarLinkItem>
                                <SidebarLinkItem text="Produits" link='/dashboard/products'><MdProductionQuantityLimits /></SidebarLinkItem>
                                <SidebarLinkItem text="Statistiques" link='/dashboard/stats'><MdOutlineQueryStats /></SidebarLinkItem>
                            </>) : (<></>)}
                        </SidebarLinkGroup>
                        <hr className="my-5" />
                    </>) : (<></>) }
                    <SidebarLinkGroup name="Personnel" className="">
                        <SidebarLinkItem text="Profil" link='/dashboard/profile'><FaUserCircle /></SidebarLinkItem>
                        <SidebarLinkItem text="Parametres" link='/dashboard/settings'><AiOutlineSetting /></SidebarLinkItem>
                    </SidebarLinkGroup>
                </nav>
            </div>
        </SidebarContext.Provider>
    )
}

export default Sidebar