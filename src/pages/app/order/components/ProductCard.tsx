
type ProductCardProps = {
    className?: string,
    product: Product,
    onClick?: (p: Product) => void,
    onAdd?: (p: Product) => void
}

function ProductCard({product, className, onAdd, onClick}: ProductCardProps)
{
    return (
        <div className={"card flex flex-col space-y-3 pb-5 w-[250px] lg:w-[300px] max-w-[300px] p-2 rounded-xl shadow-lg border " + className}>
            <div onClick={() => onClick? onClick(product) : null} className="flex justify-center overflow-hidden w-full rounded-t-xl h-[200px]">
                <img src={product.image_url} alt={product.name + "_image"} className="w-full"/>
            </div>
            <div className="w-full px-2">
                <h3 className="text-xl">{product.name}</h3>
                <p>{product.description}</p>
                <div className="flex justify-between">
                    <span className="font-bold text-xl">{product.price} XAF</span>
                    <button onClick={() => onAdd? onAdd(product) : null} className="card-get bg-secondary text-white font-bold rounded-md p-2"><i className="pi pi-plus"></i></button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard