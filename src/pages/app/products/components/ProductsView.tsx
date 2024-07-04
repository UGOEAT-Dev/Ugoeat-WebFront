import { Product } from "@/features/common/types/Product.js";
import ProductCard from "./ProductCard.js";

type ProductsViewProps = {
    products: Product[],
    onClick?: (p: Product) => void,
    onAdd?: (p: Product) => void
}

export default function ProductsView({products, onClick, onAdd}: ProductsViewProps)
{
    return (
        <div className="my-5 gap-5 grid justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(products.length === 0) ?
                <h3>Aucun Produit pour cette categorie.</h3>
                :
                products.map((product) => {
                    return <ProductCard key={product.id} product={product} onClick={onClick} onAdd={onAdd} className="w-full hover:scale-105" />
                })
            }
        </div>
    )
}