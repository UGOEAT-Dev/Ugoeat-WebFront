import ModalCart from "../../../app/components/ModalCart";
import Card from "./Card.js"
import {useEffect, useState} from "react";
import getCustomerOrders from "../../../../core/services/orders/getCustomerOrders";
import { useAppContext } from "../../../../core/context/AppContext";
import { Order } from "../../../../core/types/Order.js";

function CustomerHome()
{
    const {token} = useAppContext()
    const [remoteOrders, setRemoteOrders] = useState<Order[]>([])

    useEffect(() => {
        getCustomerOrders(token).then(r => setRemoteOrders(r.data.data))
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
            <ModalCart  className="rounded-xl bg-white z-0 w-full shadow"/>
        </div>
    )
}

export default CustomerHome