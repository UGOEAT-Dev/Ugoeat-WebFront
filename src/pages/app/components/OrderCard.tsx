import {useMemo} from "react";
import OrderProductCardList from "./OrderProductCardList.js";
import {formatAmount} from "@/lib/helpers.js"
import { Cart } from "@/features/cart/types/Cart.js";
import { ProductOrdered } from "@/features/common/types/Product.js";

interface OrderCardProps
{
    products?: ProductOrdered[],
    onConfirmBtnClicked: any,
    onCancelBtnClicked: any,
    onItemCancelBtnClicked: any,
    className?: string
}
function OrderCard({products = [], onConfirmBtnClicked, onCancelBtnClicked, onItemCancelBtnClicked, ...props}: OrderCardProps)
{
    const total = useMemo(() => new Cart(products).calculateTotalAmount(), [products])

    return (
        <div className={"flex flex-col gap-2 rounded-md shadow-md p-5 " + props.className}>
            <div>
                {products && <OrderProductCardList products={products} onClick={onItemCancelBtnClicked} /> }
            </div>
            <div className="flex justify-between p-2 font-bold">
                <span>TOTAL</span>
                <span>{formatAmount(total) || 0} XAF</span>
            </div>
            <button onClick={onConfirmBtnClicked} className="bg-green text-white p-2 font-bold rounded-md hover:bg-green-600">Confirmer</button>
            <button onClick={() => onCancelBtnClicked()} className="bg-gray-100 text-red-600 p-2 hover:bg-gray-200 rounded-md">Vider le panier</button>
        </div>
    )
}

export default OrderCard