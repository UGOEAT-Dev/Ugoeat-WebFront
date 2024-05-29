import { ProductOrdered } from "@/features/common/types/Product.js";
import OrderProductCard from "./OrderProductCard.js";


function OrderProductCardList({products = [], onClick}: {products: ProductOrdered[], onClick?: any})
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