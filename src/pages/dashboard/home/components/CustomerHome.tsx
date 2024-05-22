import ModalCart from "@/pages/app/components/ModalCart";
import Card from "./Card.js"
import { routesConfig } from "@/router/router.config.js";
import useSWR from "swr";
import { OrderService } from "@/features/admin/services/order.service.js";

function CustomerHome()
{
    const {data: paginated, isLoading} = useSWR('/api/v1/orders', () => OrderService.fetchAll())

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-5 w-full">
                <Card
                    className="w-full"
                    number={paginated?.meta?.total} title="Mes Commandes"
                    icon="pi pi-shopping-cart" link={routesConfig.routes.dashboard.myOrders} text="Voir plus"/>

                {/* <Card
                    className="w-full"
                    number={remoteOrders.filter(order => order.state === 'sent').length} title="Mes Commandes Actives"
                    icon="pi pi-shopping-cart" link={routesConfig.routes.dashboard.myOrders} text="Voir plus"/> */}
            </div>
            <ModalCart  className="rounded-xl bg-white z-0 w-full shadow"/>
        </div>
    )
}

export default CustomerHome