import ProductCard from "./ProductCard.jsx";

export default function ProductsView({products = [], onProductClicked = null, onAddBtnClicked = null})
{
    return (
        <div className="my-5 gap-5 grid justify-center sm:grid-cols-2 md:grid-cols-3">
            {(products.length === 0) ?
                <h3>Aucun Produit pour cette categorie.</h3>
                :
                products.map((product) => {
                    return <ProductCard key={product.id} product={product} onClick={onProductClicked} onAddBtnClicked={onAddBtnClicked} className="w-full hover:scale-105" />
                })
            }
        </div>
    )
}