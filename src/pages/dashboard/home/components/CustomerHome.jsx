import ModalCart from "../../../root/components/ModalCart.jsx";
import Card from "./Card.jsx"
import {useContext, useEffect, useState} from "react";
import AppContext from "../../../../AppContext.jsx";
import getCustomerOrders from "../../../../api/orders/getCustomerOrders.jsx";

function CustomerHome()
{
    const {orders, user, token} = useContext(AppContext)
    const [remoteOrders, setRemoteOrders] = useState([])

    useEffect(() => {
        getCustomerOrders(user.id, token).then(r => setRemoteOrders(r.data.data))
    }, [])

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-5 w-full">
                <Card
                    className="w-full"
                    number={remoteOrders.length} title="Mes Commandes"
                    icon="pi pi-shopping-cart" link="/dashboard/orders" text="Voir plus"/>

                <Card
                    className="w-full"
                    number={remoteOrders.filter(order => order.state === 'sent').length} title="Mes Commandes Actives"
                    icon="pi pi-shopping-cart" link="/dashboard/orders" text="Voir plus"/>
            </div>
            <ModalCart products={orders.products} className="rounded-xl bg-white z-0 w-full shadow"/>
        </div>
    )
}

export default CustomerHome