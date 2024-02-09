import OrderProductCard from "./OrderProductCard.jsx";
import {useEffect, useState} from "react";

function OrderProductCardList({products = [], onClick = null, ...props})
{
    return (
        <div>
            {products.map((p) => {
                return ( <OrderProductCard onClick={onClick} key={p.id} product={p}/>)
            })}
        </div>
    )
}

export default OrderProductCardList