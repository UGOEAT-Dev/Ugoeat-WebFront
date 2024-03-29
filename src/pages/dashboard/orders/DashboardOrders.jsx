import {useNavigate, useOutletContext} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataView, DataViewLayoutOptions} from "primereact/dataview"
import {Dropdown} from "primereact/dropdown"
import {Tag} from "primereact/tag"
import getCustomerOrders from "../../../api/orders/getCustomerOrders.jsx";
import {formatAmount} from "../../../lib/helpers.jsx";
import AppContext from "../../../AppContext.jsx";

function DashboardOrders()
{
    const [orders, setOrders] = useState([])
    const [sortField, setSortField] = useState('id')
    const [sortOrder, setSortOrder] = useState(-1)
    const [sortKey, setSortKey] = useState('')
    const {user, token} = useContext(AppContext)
    const {getSeverityFromOrderState, parseOrderState} = useOutletContext()
    const navigate = useNavigate()
    const dropdownOptions = [
        {label: "Plus Recent", value: "created_at"},
        {label: "Plus ancient", value: "!created_at"},
        {label: "Par Prix", value: "amount"},
    ]

    useEffect(() => {
        getCustomerOrders(user.id, token)
            .then(r => setOrders(r.data.data))
    }, [])

    const onDropChange = (e) => {
        const value = String(e.value).toLowerCase()
        if(value.at(0) === '!') {
            setSortOrder(1)
            setSortField(value.substring(1))
        } else {
            setSortOrder(0)
            setSortField(value)
        }
    }

    const header = (title) => {
        return (
            <div>
                <h3 className="capitalize">{title}</h3>
                <Dropdown
                    options={dropdownOptions}
                    optionLabel="label"
                    placeholder="Plus Recent"
                    value={sortKey}
                    onChange={onDropChange}
                ></Dropdown>
            </div>
        )
    }

    const onItemClicked = (order) => {
        navigate(`/dashboard/orders/${order.id}`)
    }

    const itemTemplate = (order) => {
        const created_at = new Date(order.created_at)
        return (
            <div
                onClick={(e) => onItemClicked(order)}
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
                        value={parseOrderState(order.state)}></Tag>
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