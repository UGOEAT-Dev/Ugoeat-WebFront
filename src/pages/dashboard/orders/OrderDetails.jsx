import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import {Button} from "primereact/button"
import {Tag} from "primereact/tag"
import {useContext, useEffect, useState} from "react";
import AppContext from "../../../AppContext.jsx";
import getOrderWithProducts from "../../../api/orders/getOrderWithProducts.jsx";
import {NavLink, useNavigate, useOutletContext, useParams} from "react-router-dom";
import RoundedImage from "../../../components/RoundedImage.jsx";
import {formatAmount} from "../../../lib/helpers.jsx";
import getOrder from "../../../api/orders/getOrder.jsx";

function OrderDetails()
{
    const { orderId} = useParams()
    const [order, setOrder] = useState({})
    const [products, setProducts] = useState([])
    const {token, user, setOrders} = useContext(AppContext)
    const {getSeverityFromOrderState, parseOrderState} = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        getOrder(token, user.id, orderId).then(r => setOrder(r.data.data))
        getOrderWithProducts(token, user.id, orderId).then((r) => setProducts(r.data.data))
    }, [])

    const priceTemplate = (p) => {
        return <span>{formatAmount(p.price)} XAF</span>
    }
    const imageTemplate = (p) => {
        return <RoundedImage size={34} src={p.image_url} />
    }
    const qteTemplate = (p) => {
        return <span>{p.pivot.quantity}</span>
    }
    const reproduire = () => {
        if(products.length === 0)
            return;

        setOrders({ products: products.map(p => ({...p, quantity: p.pivot.quantity })) })
        navigate('/dashboard/payments')
    }

    const header = () => {
        return (
            <div className="flex justify-between items-center">
                <h3 className="text-lg">Produits</h3>
                <Button
                    className="py-1 px-3 bg-secondary text-white"
                    onClick={(e) => reproduire()}
                    label="Reproduire"/>
            </div>
        )
    }

    return (
        <>
            <NavLink
                to="/dashboard/orders"
                className="pi pi-arrow-left mt-2 text-lg"> Retour</NavLink>
            <div>
                <ul>
                    <li>Commande du <span className="font-bold">{new Date(order.created_at).toLocaleDateString()}</span></li>
                    <li>Statut de la commande <Tag className="py-1 px-2" severity={getSeverityFromOrderState(order.state)} value={parseOrderState(order.state)}></Tag></li>
                    <li>Montant Total <span className="font-bold">{formatAmount(order.amount)} XAF</span></li>
                </ul>
                <div>
                    <DataTable header={header} value={products} sortMode="multiple" emptyMessage="Aucun Produit pour cette commade">
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