import {DataTable, DataTableProps} from "primereact/datatable";
import {Column} from "primereact/column";
import RoundedImage from "../../../../features/common/components/elements/RoundedImage";
// import { Icon } from "../../../../components/Icon";
import { Order } from "../../../../features/common/types/Order";
import { Tag } from "primereact/tag";

interface ProductListViewProps
{
    orders: Order[],
    options?: DataTableProps<Order[]>
    onDelete?: any,
    onSelect?: any,
}

function OrderListView({orders, onSelect, options}: ProductListViewProps)
{

    const _OrderComponent = ({order}: {order: Order}) => {   
        const customer = order.customer
        return (
            <div className="flex gap-3">
                <RoundedImage src={customer?.image_url ?? ''} size={50} />
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg">{customer?.name}</h3>
                    <span>{order.delivery}</span>
                </div>
            </div>
        )
    }

    const _DateComponent = ({order}: {order: Order}) => {

        const date = new Date(order.created_at ?? 0)

        return (
            <div>
                <p className="font-bold">{date.toLocaleDateString()}</p>
                <p className="">{date.toLocaleTimeString()}</p>
            </div>
        )
    }

    return (
        <>
            <div className="bg-white p-3 rounded-lg">
                <div className='mt-3'>
                    <DataTable value={orders} selectionMode='single' onRowSelect={(e) => onSelect(e.data)} tableStyle={{minWidth: '50rem'}} sortField='id' {...options}>
                        <Column field='id' header="" sortable></Column>
                        <Column header="Client" resizeable body={(o: Order) => <_OrderComponent order={o}/>}></Column>
                        <Column field="created_at" header="Date" body={(o: Order) => <_DateComponent order={o}/>}></Column>
                        <Column field="amount" header="Prix" sortable body={(o) => (<span>{o.amount} <b>XAF</b></span>)}></Column>
                        <Column field="state" header="Status" body={(o: Order) => (<Tag className="p-2" value={o.state?.toUpperCase()} severity='info' />)} ></Column>
                        { /* <Column body={(p) => (<button onClick={() => onSelect(p)}><Icon icon="pi-eye" className="text-xl" color="blue"/></button>)} ></Column> 
                        <Column body={(p) => (<button onClick={() => onDelete(p)}><Icon icon="pi-trash" className="text-xl" color="red"/></button>)} ></Column> */ }
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default OrderListView