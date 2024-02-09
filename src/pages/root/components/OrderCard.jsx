import {useEffect, useMemo, useState} from "react";
import OrderProductCardList from "./OrderProductCardList.jsx";

function OrderCard({products = [], onConfirmBtnClicked, onCancelBtnClicked, onItemCancelBtnClicked, ...props})
{
    const total = useMemo(() => {
        let sum = 0
        products.forEach(p => sum += p.price)
        return sum
    }, [products])

    return (
        <div className={"flex flex-col gap-2 rounded-md shadow-md p-5 " + props.className}>
            <div>
                {products && <OrderProductCardList products={products} onClick={onItemCancelBtnClicked} /> }
            </div>
            <div className="flex justify-between p-2 font-bold">
                <span>TOTAL</span>
                <span>{total || 0} XAF</span>
            </div>
            <button onClick={onConfirmBtnClicked} className="bg-green text-white p-2 font-bold rounded-md hover:bg-green-600">Confirmer</button>
            <button onClick={() => onCancelBtnClicked()} className="bg-gray-100 text-red-600 p-2 hover:bg-gray-200 rounded-md">Vider le panier</button>
        </div>
    )
}

export default OrderCard