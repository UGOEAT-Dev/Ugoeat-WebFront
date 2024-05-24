import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Tag} from "primereact/tag"
import {formatAmount} from "@/lib/helpers";
import { Order } from "@/features/common/types/Order";
import { getSeverityFromOrderState } from "@/lib/utils";
import { OrderService } from "@/features/admin/services/order.service";
import { usePaginationQuery } from "@/features/common/hooks";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Paginate from "@/features/common/components/elements/pagination/Paginate";

function DashboardOrders()
{
    const navigate = useNavigate()
    const {limit, page} = usePaginationQuery()
    const [currentPage, setCurrentPage] = useState(page)
    const {data: response, isFetching} = useQuery({
        queryKey: ['orders', currentPage, limit],
        queryFn: () => OrderService.fetch({limit, page: currentPage})
    })

    useEffect(() => { navigate(`?page=${currentPage}&limit=${limit}`) }, [currentPage])

    const header = (title: string) => {
        return (
            <div>
                <h3 className="capitalize">{title}</h3>
            </div>
        )
    }

    const _StatusComponent = (order: Order) => (
        <Tag
            className="px-3 py-0.5"
            severity={getSeverityFromOrderState(order.state)}
            value={order.state?.toUpperCase()}></Tag>
    )

    const _PriceComponent = (order: Order) => (
        <span>${formatAmount(order.amount)} XAF</span>
    )

    const _DateTimeComponent = (props: {order: Order, isDate?: boolean}) => {
        const date = new Date(props.order.created_at ?? 0)
        return (
            <p>{props.isDate ? date.toLocaleDateString(): date.toLocaleTimeString()}</p>
        )
    }

    return (
        <div>
            {isFetching && <p>Loading ...</p>}
            <div>
                <DataTable
                    header={header("")} value={response?.data}
                    showGridlines={true} selectionMode='single' 
                    resizableColumns={true}
                    onSelectionChange={(e) => navigate(`${(e.value.id)}`)}>
                        <Column header="Id" field="id"></Column>
                        <Column header="Adresse" field="delivery"></Column>
                        <Column header="Date" field="created_at" body={order => <_DateTimeComponent order={order} isDate={true}/>}></Column>
                        <Column header="Heure" field="created_at" body={order => <_DateTimeComponent order={order}/>}></Column>
                        <Column header="Prix" field="amount" sortable body={_PriceComponent}></Column>
                        <Column header="Status" field="state" body={_StatusComponent}></Column>
                </DataTable>
            </div>
            <div>
                <Paginate 
                    pageCount={response?.meta?.last_page ?? 0}
                    initialPage={currentPage - 1}
                    onPageChange={({selected}) => {
                        setCurrentPage(selected + 1)
                    }}/>
            </div>
        </div>
    )

}
export default DashboardOrders