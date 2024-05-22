import { useEffect, useState } from "react"
import Paginate from "@/features/common/components/elements/pagination/Paginate"
import { Order } from "@/features/common/types/Order"
import OrderListView from "../../components/order/OrderListView"
import { useNavigate } from "react-router-dom"
import { routesConfig } from "@/router/router.config"
import useSWR from "swr"
import { OrderService } from "@/features/admin/services/order.service"

function AdminOrders()
{
    const [orders, setOrders] = useState<Order[]>([])
    const {data: paginated, isLoading} = useSWR('/api/v1/orders', () => OrderService.fetchAll())
    const navigate = useNavigate()

    useEffect(() => {
        if(paginated)
            setOrders(paginated.data ?? [])
    }, [paginated])

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Commandes</h1>
            <div>
                <OrderListView orders={orders} onSelect={(o: Order) => {
                    navigate(routesConfig.routes.dashboard.orders + '/' + o.id)
                }} />
                <div className="w-full border-t-2">
                    <Paginate 
                        pageCount={(paginated?.meta?.links.length ?? 0) -2}
                        onPageChange={({selected}) => {
                            OrderService.fetchAll({page: selected+1}).then(response => setOrders(response.data ?? []))
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders

