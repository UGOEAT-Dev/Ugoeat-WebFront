import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {DataView} from "primereact/dataview"
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown"
import {Tag} from "primereact/tag"
import getCustomerOrders from "../../../core/services/orders/getCustomerOrders";
import {formatAmount} from "../../../core/lib/helpers";
import { useAppContext } from "../../../core/context/AppContext";
import { routesConfig } from "../../../router.config";
import { Order } from "../../../core/types/Order";
import { getSeverityFromOrderState } from "../../../core/lib/utils";

function DashboardOrders()
{
    const {routes} = routesConfig
    const [orders, setOrders] = useState([])
    const [sortField, setSortField] = useState('id')
    const [sortOrder, setSortOrder] = useState<-1|0|1>(-1)
    const {token} = useAppContext()
    const navigate = useNavigate()
    const dropdownOptions = [
        {label: "Plus Recent", value: "created_at"},
        {label: "Plus ancient", value: "!created_at"},
        {label: "Par Prix", value: "amount"},
    ]

    useEffect(() => {
        getCustomerOrders(token)
            .then(r => setOrders(r.data.data))
    }, [])

    const onDropChange = (e: DropdownChangeEvent) => {
        const value = String(e.value).toLowerCase()
        if(value.at(0) === '!') {
            setSortOrder(1)
            setSortField(value.substring(1))
        } else {
            setSortOrder(0)
            setSortField(value)
        }
    }

    const header = (title: string) => {
        return (
            <div>
                <h3 className="capitalize">{title}</h3>
                <Dropdown
                    options={dropdownOptions}
                    optionLabel="label"
                    placeholder="Plus Recent"
                    onChange={onDropChange}
                ></Dropdown>
            </div>
        )
    }

    const onItemClicked = (order: Order) => {
        navigate(`${routes.dashboard.myOrders}/${order.id}`)
    }

    const itemTemplate = (order: Order) => {
        const created_at = new Date(order.created_at ?? 0)
        return (
            <div
                onClick={() => onItemClicked(order)}
                className="flex items-center gap-3 p-3 rounded font-bold hover:bg-opacity-20 hover:cursor-pointer hover:bg-black"
            >
                <p className="bg-secondary rounded-full p-2 text-white">{order.id}</p>
                <div className="flex w-full flex-col">
                    <span>{created_at.toLocaleDateString()}</span>
                    <span>{created_at.toLocaleTimeString()}</span>
                </div>
                <div className="text-center">
                    <p className="">{formatAmount(order.amount)}XAF</p>
                    <Tag
                        className="px-3 py-0.5"
                        severity={getSeverityFromOrderState(order.state)}
                        value={order.state?.toUpperCase()}></Tag>
                </div>
            </div>
        )
    }

    return (
        <div>
            <DataView
                header={header("")}
                value={orders}
                paginator
                rows={5}
                sortOrder={sortOrder}
                sortField={sortField}
                rowsPerPageOptions={[5,10,15,20]}
                itemTemplate={itemTemplate}
            ></DataView>
        </div>
    )

}
export default DashboardOrders