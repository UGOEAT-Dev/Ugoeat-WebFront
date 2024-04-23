import { useEffect, useState } from "react"
import Paginate from "../../../../components/pagination/Paginate"
import { AxiosResponse } from "axios"
import { Order } from "../../../../core/types/Order"
import OrderListView from "../../components/order/OrderListView"
import getOrders from "../../../../core/services/orders/getOrders"
import { useAppContext } from "../../../../core/context/AppContext"
import { useNavigate } from "react-router-dom"
import { routesConfig } from "../../../../router.config"

function AdminOrders({})
{
    const {token} = useAppContext()
    const [orders, setOrders] = useState<Order[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Product>>({})
    const navigate = useNavigate()

    useEffect(() => {
        getOrders(token).then((r:AxiosResponse) => {
            setPaginated(r.data)
            setOrders(r.data.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Commandes</h1>
            <div>
                <OrderListView orders={orders} onSelect={(o: Order) => {
                    navigate(routesConfig.routes.dashboard.orders + '/' + o.id)
                }} />
                <div className="w-full border-t-2">
                    <Paginate 
                        pageCount={(paginated.meta?.links.length ?? 0) -2}
                        onPageChange={({selected}) => {
                            getOrders(token, {page: selected+1}).then((r: AxiosResponse) => setOrders(r.data.data))
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders

