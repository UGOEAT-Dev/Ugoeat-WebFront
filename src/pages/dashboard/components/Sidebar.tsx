import SidebarLinkGroup from "./sidebar/SidebarLinkGroup.js";
import SidebarLinkItem from "./sidebar/SidebarLinkItem.js";
import {SidebarContext} from "./sidebar/SidebarContext.js";
import { useAppContext } from "../../../core/context/AppContext";
import { Icon } from "../../../components/Icon";
import { routesConfig } from "../../../router.config.js";


function Sidebar({mode, className}: {mode: 1| 2, className?: string})
{
    const { user } = useAppContext()
    const {dashboard} = routesConfig.routes

    return (
        <SidebarContext.Provider value={{mode}}>
            <div className={`${mode === 1 ? 'w-full pb-5 sm:w-[300px]' : ' sm:block'} sidebar bg-white pt-2 px-3 rounded-xl ` + className}>
                <nav>
                    <SidebarLinkGroup name="General">
                        <SidebarLinkItem text="Accueil" link={dashboard.home} ><Icon icon="pi-home"/></SidebarLinkItem>
                        { user.role === 'customer' &&
                            <SidebarLinkItem text="Mes Commandes" link={dashboard.myOrders}><Icon icon="pi-list"/></SidebarLinkItem> }
                        { /* <SidebarLinkItem text="Mes Payements" link='/dashboard/payments'><AiOutlineWallet /></SidebarLinkItem> */}
                    </SidebarLinkGroup>
                    <hr className="my-5" />
                    { (user.role?.toLowerCase() !== 'customer') ? ( <>
                        <SidebarLinkGroup name="Gestion">
                            {(user.role === 'restaurant') ? (<>
                                <SidebarLinkItem text="Mes Produits" link={dashboard.products} ><Icon icon="pi-shopping-cart" /></SidebarLinkItem>
                                </>) : (user.role === 'admin') ? (<>
                                <SidebarLinkItem text="Clients" link={dashboard.customers}><Icon icon="pi-users"/></SidebarLinkItem>
                                <SidebarLinkItem text="Restaurants" link={dashboard.restaurants}><Icon icon="pi-slack"/></SidebarLinkItem>
                                <SidebarLinkItem text="Commandes" link={dashboard.orders}><Icon icon="pi-envelope"/></SidebarLinkItem>
                                <SidebarLinkItem text="Categories" link={dashboard.categories}><Icon icon="pi-th-large"/></SidebarLinkItem>
                                <SidebarLinkItem text="Produits" link={dashboard.products}><Icon icon="pi-shopping-cart"/></SidebarLinkItem>
                                <SidebarLinkItem text="Statistiques" link={dashboard.stats}><Icon icon="pi-chart-line"/></SidebarLinkItem>
                            </>) : (<></>)}
                        </SidebarLinkGroup>
                        <hr className="my-5" />
                    </>) : (<></>) }
                    <SidebarLinkGroup name="Personnel" className="">
                        <SidebarLinkItem text="Profil" link={dashboard.profile}><Icon icon="pi-user"/></SidebarLinkItem>
                        <SidebarLinkItem text="Parametres" link={dashboard.settings}><Icon icon="pi-cog"/></SidebarLinkItem>
                    </SidebarLinkGroup>
                </nav>
            </div>
        </SidebarContext.Provider>
    )
}

export default Sidebar