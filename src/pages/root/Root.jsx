import {Outlet} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import './root.scss'
import BodyHidder from "../../components/BodyHidder.jsx";
import ModalCart from "./components/ModalCart.jsx";
import {useState} from "react";

/**
 * Represent The base of the web Application
 */
export default function Root()
{
    const [showCart, setShowCart] = useState(false)
    const [productsOrdered, setProductsOrdered] = useState(window.order.products)


    return <>
        <Header products={productsOrdered} onCartBtnClicked={() => setShowCart(true)}/>
        <main className="sm:min-h-screen">
            <Outlet />
        </main>
        <Footer />

        {showCart && <BodyHidder className="flex justify-start items-center">
                <ModalCart products={productsOrdered} onCloseBtnClicked={() => setShowCart(false)}  className="absolute h-screen pb-10 overflow-hidden w-full sm:w-2/3 md:w-2/5"/>
        </BodyHidder>}
    </>
}
