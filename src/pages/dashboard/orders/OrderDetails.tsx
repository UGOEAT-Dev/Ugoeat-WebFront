import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"
import {Button} from "primereact/button"
import {Tag} from "primereact/tag"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import RoundedImage from "@/features/common/components/elements/RoundedImage";
import {formatAmount} from "@/lib/helpers";
import { useStoreContext } from "@/features/store/hooks/useStoreContext";
import { getSeverityFromOrderState } from "@/lib/utils";
import { OrderService } from "@/features/admin/services/order.service";
import { routesConfig } from "@/router/router.config";
import { useQuery } from "@tanstack/react-query";
import { ProductOrdered } from "@/features/common/types/Product";

function OrderDetails()
{
    const { orderId } = useParams()
    const {data: order, isLoading} = useQuery({
        queryKey: ['/api/v1/orders', orderId],
        queryFn: () => OrderService.get(parseInt(orderId as string))
    })
    const {setProducts} = useStoreContext()
    const navigate = useNavigate()

    if(isLoading)
        return <p>Loading ...</p>

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
        if(order?.products?.length === 0)
            return;

        if(order?.products) {
            setProducts(order?.products)
            navigate(routesConfig.routes.dashboard.payments)
        }
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
                    <li>Commande du <span className="font-bold">{new Date(order?.created_at ?? 0).toLocaleDateString()}</span></li>
                    <li>Statut de la commande <Tag className="py-1 px-2" severity={getSeverityFromOrderState(order?.state)} value={order?.state?.toUpperCase()}></Tag></li>
                    <li>Montant Total <span className="font-bold">{formatAmount(order?.amount)} XAF</span></li>
                </ul>
                <div>
                    <DataTable header={header} value={order?.products} sortMode="multiple" emptyMessage="Aucun Produit pour cette commade">
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