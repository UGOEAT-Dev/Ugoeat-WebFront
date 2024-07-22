import { ProductService } from "@/features/common/services"
import { routesConfig } from "@/router/router.config"
import { useQuery } from "@tanstack/react-query"
import { NavLink, useParams } from "react-router-dom"
import { Carousel } from "primereact/carousel"
import { Icon } from "@/features/common/components/elements/Icon"
import { useState } from "react"
import { Input } from "@/features/common/components/elements/input/Input"
import { useGenerateId } from "@/features/common/hooks"
import useCart from "@/features/cart/hooks/useCart"
import toast from "react-hot-toast"


function SingleProductView()
{
    const {productId} = useParams()
    const { addProduct } = useCart()
    const {data: product, isFetching, error} = useQuery({
        queryKey: ['/api/v1/product', productId],
        queryFn: () => ProductService.get(productId ?? '')
    })
    const [quantity, setQuantity] = useState(1)
    const qteInputId = useGenerateId('single-product')
    const images = [product?.image_url, product?.images?.map(image => image.url) ?? []].flat()

    const itemTemplate = (image: string) => {
        return (
            <div className="bg-black bg-opacity-95 flex justify-center items-center">
                <img src={image} />
            </div>
        )
    }

    const addProductToCart = () => {
        if(product) {
            addProduct(product, quantity)
            toast.success("Produit Ajouter")
        } else {
            toast.error("Impossible d'ajouter le produit au panier")
        }
    }

    if(isFetching)
        return <p>Loading ...</p>

    if(error)
        return <p>Error {error.message}</p>

    return (
        <div className="md:h-screen overflow-hidden">
            <h2>
                <NavLink to={routesConfig.routes.app.products} className="text-4xl">
                    {'<'} <span className="text-lg align-middle h-full">Retour</span>
                </NavLink>
            </h2>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 justify-between">
                <div className="w-full">
                    <Carousel 
                        value={images} numVisible={1} numScroll={images.length} 
                        circular autoplayInterval={3000} itemTemplate={itemTemplate}/>
                </div>
                <div className="flex flex-col px-10 space-y-3">
                    <h2>{product?.name}</h2>
                    <h4>{product?.category?.name}</h4>
                    <span className="text-3xl font-bold">{product?.price} XAF</span>
                    <p className="h-full first-letter:text-2xl">
                        {product?.description}
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center">
                            <label htmlFor={qteInputId} className="">Quantite</label>
                            <Input type="number" className="w-full bg-white border border-gray-400" inputClassname="text-center" id={qteInputId} value={quantity} min={1} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                        </div>
                        <button disabled={quantity<=0} className="shadow-md shadow-green-800 w-full bg-primary hover:bg-black text-white p-3 rounded-md" onClick={addProductToCart}>
                            <Icon icon="pi-shopping-cart" className="font-bold"/> Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProductView