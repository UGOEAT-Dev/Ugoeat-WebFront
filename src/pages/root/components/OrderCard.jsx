import {useMemo} from "react";
import OrderProductCard from "./OrderProductCard.jsx";

function OrderCard({products = [], onConfirmBtnClicked = null, onCancelBtnClicked = null, onItemCancelBtnClicked = null, ...props})
{
    const total = useMemo(() => {
        let sum = 0;
        products.forEach((p) => sum += p.price * p.quantity)
        return sum
    }, [products])

    return (
        <div className={"flex flex-col gap-2 rounded-md shadow-md p-5 " + props.className}>
            <div>
                {products.map((p) => {
                    return ( <OrderProductCard onClick={onItemCancelBtnClicked} key={p.id} product={p}/>)
                })}
            </div>
            <div className="flex justify-between p-2 font-bold">
                <span>TOTAL</span>
                <span>{total || 0} XAF</span>
            </div>
            <button onClick={onConfirmBtnClicked} className="bg-green text-white p-2 font-bold rounded-md hover:bg-green-600">Confirmer</button>
            <button onClick={onCancelBtnClicked} className="bg-gray-100 text-red-600 p-2 hover:bg-gray-200 rounded-md">Vider le panier</button>
        </div>
    )
}

export default OrderCard