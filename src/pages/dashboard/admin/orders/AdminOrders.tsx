import { useEffect, useState } from "react"
import Paginate from "@/features/common/components/elements/pagination/Paginate"
import { Order } from "@/features/common/types/Order"
import OrderListView from "../../components/order/OrderListView"
import { useNavigate } from "react-router-dom"
import { routesConfig } from "@/router/router.config"
import { OrderService } from "@/features/admin/services/order.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { usePaginationQuery } from "@/features/common/hooks"

function AdminOrders()
{
    const navigate = useNavigate()
    const {page, limit} = usePaginationQuery()
    const [orders, setOrders] = useState<Order[]>([])
    const [currentPage, setCurrentPage] = useState(page)
    const { data: paginated, isFetching } = useQuery({
        queryKey: ['orders', currentPage, limit],
        queryFn: () => OrderService.fetch({limit, page: currentPage}),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })

    useEffect(() => {
        if(paginated)
            setOrders(paginated.data ?? [])
    }, [paginated])

    return (
        <div>
            <h1 className="text-2xl font-bold">Commandes</h1>
            <div>
                {isFetching? 
                    <p>Loading ...</p> :
                    <OrderListView 
                        orders={orders} 
                        onSelect={(o: Order) => navigate(routesConfig.routes.dashboard.orders + '/' + o.id)} />
                }
                <div className="w-full border-t-2">
                    <Paginate 
                        pageCount={(paginated?.meta?.links.length ?? 0) -2}
                        onPageChange={({selected}) => {
                            setCurrentPage(selected + 1)
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default AdminOrders

