import {Outlet} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BodyHidder from "../../components/BodyHidder.jsx";
import ModalCart from "./components/ModalCart.jsx";
import {useContext, useState} from "react";
import AppContext from "../../AppContext.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import './root.scss'

/**
 * Represent The base of the web Application
 */
export default function Root()
{
    const [showCart, setShowCart] = useState(false)
    const {orders, setOrders} = useContext(AppContext)
    const {user, token} = useAuth()

    return <>
        <Header products={orders.products} onCartBtnClicked={() => setShowCart(true)}/>
        <main className="sm:min-h-screen">
            <Outlet context={[orders, setOrders]} />
        </main>
        <Footer />

        {showCart && <BodyHidder className="flex justify-start items-center">
                <ModalCart products={orders.products}
                           onCloseBtnClicked={() => setShowCart(false)}
                           className="absolute h-screen pb-10 overflow-hidden w-full sm:w-2/3 md:w-2/5"/>
        </BodyHidder>}
    </>
}
