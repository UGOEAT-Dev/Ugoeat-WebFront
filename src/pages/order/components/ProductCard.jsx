import {RiAddFill} from "react-icons/ri";

function ProductCard({product, className = "", onAddBtnClicked = null, onClick = null})
{
    return (
        <div className={"card flex flex-col space-y-3 pb-5 w-[250px] lg:w-[300px] max-w-[300px] p-2 rounded-xl shadow-lg border " + className}>
            <div onClick={() => onClick(product)} className="flex justify-center overflow-hidden w-full rounded-t-xl h-[200px]">
                <img src={product.image_url} alt={product.name + "_image"} className="w-full"/>
            </div>
            <div className="w-full px-2">
                <h3 className="text-xl">{product.name}</h3>
                <p>{product.description}</p>
                <div className="flex justify-between">
                    <span className="font-bold text-xl">{product.price} XAF</span>
                    <button onClick={() => onAddBtnClicked(product)} className="card-get bg-secondary text-white font-bold rounded-md p-2"><RiAddFill/></button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard