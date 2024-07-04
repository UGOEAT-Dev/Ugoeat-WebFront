
import { ProductOrdered } from "@/features/common/types/Product";
import { Icon } from "@/features/common/components/elements/Icon";
import {formatAmount} from "@/lib/helpers";


export interface OrderProductCardProps
{
    product: ProductOrdered,
    onClick?: any,
    className?: string
}

function OrderProductCard({product, onClick, ...props}: OrderProductCardProps)
{
    return (
        <div className={"flex gap-2 items-center " + props.className}>
            <img src={product.image_url} alt="_image" className="rounded-full w-[32px] h-[32px]"/>
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full font-bold">
                    <span>{product.name}</span>
                    <span>{formatAmount(product.price)} XAF</span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span className="text-gray-400">Qte : {product.quantity || 1}</span>
                    <a href="#" onClick={() => onClick(product)}>
                        <Icon icon="pi-trash" color="red" className="text-lg font-semibold cursor-pointer" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default OrderProductCard