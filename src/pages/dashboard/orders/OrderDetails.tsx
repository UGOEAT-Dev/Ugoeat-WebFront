import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import {Button} from "primereact/button"
import {Tag} from "primereact/tag"
import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import RoundedImage from "../../../components/RoundedImage";
import {formatAmount} from "../../../core/lib/helpers";
import getOrder from "../../../core/services/orders/getOrder";
import { useAppContext } from "../../../core/context/AppContext";
import { Order } from "../../../core/types/Order";
import { getSeverityFromOrderState } from "../../../core/lib/utils";
import { Cart } from "../../../core/types/Cart";

function OrderDetails()
{
    const { orderId } = useParams()
    const [order, setOrder] = useState<Order>({})
    const {token, updateCart} = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        getOrder(token, orderId ?? 0).then(r => setOrder(r.data.data))
    }, [])

    const priceTemplate = (p: ProductOrdered) => {
        return <span>{formatAmount(p.price)} XAF</span>
    }
    const imageTemplate = (p: ProductOrdered) => {
        return <RoundedImage size={34} src={p.image_url} />
    }
    const qteTemplate = (p: ProductOrdered) => {
        return <span>{p.quantity}</span>
    }
    const reproduire = () => {
        if(order.products?.length === 0)
            return;

        updateCart(new Cart(order.products))
        navigate('/dashboard/payments')
    }

    const header = () => {
        return (
            <div className="flex justify-between items-center">
                <h3 className="text-lg">Liste des produits</h3>
                <Button
                    className="py-1 px-3 bg-secondary text-white"
                    onClick={reproduire}
                    label="Reproduire"/>
            </div>
        )
    }

    return (
        <>
            <NavLink
                to={'#'}
                onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                }}
                className="pi pi-arrow-left mt-2 text-lg"> Retour</NavLink>
            <div>
                <ul>
                    <li>Commande du <span className="font-bold">{new Date(order.created_at ?? 0).toLocaleDateString()}</span></li>
                    <li>Statut de la commande <Tag className="py-1 px-2" severity={getSeverityFromOrderState(order.state)} value={order.state?.toUpperCase()}></Tag></li>
                    <li>Montant Total <span className="font-bold">{formatAmount(order.amount)} XAF</span></li>
                </ul>
                <div>
                    <DataTable header={header} value={order.products} sortMode="multiple" emptyMessage="Aucun Produit pour cette commade">
                        <Column header="Image" body={imageTemplate}></Column>
                        <Column header="Nom" field="name" sortable></Column>
                        <Column header="Prix" body={priceTemplate} sortable></Column>
                        <Column header="Quantite" body={qteTemplate} sortable></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default OrderDetails