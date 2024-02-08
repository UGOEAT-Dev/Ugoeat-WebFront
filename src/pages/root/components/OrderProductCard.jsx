
import binPng from "../../../assets/images/icons/bin.png"

function OrderProductCard({product, onClick = null, ...props})
{
    return (
        <div className={"flex gap-2 items-center " + props.className}>
            <img src={product.image_url} alt="_image" className="rounded-full w-[32px] h-[32px]"/>
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full font-bold">
                    <span>{product.name}</span>
                    <span>{product.price} XAF</span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span className="text-gray-400">Qte : {product.quantity || 1}</span>
                    <a href="javascript:void(0)" onClick={() => onClick(product)}><img src={binPng} width={32} alt="bin_image" className="cursor-pointer p-2 hover:bg-gray-100 rounded-md" /></a>
                </div>
            </div>
        </div>
    )
}

export default OrderProductCard