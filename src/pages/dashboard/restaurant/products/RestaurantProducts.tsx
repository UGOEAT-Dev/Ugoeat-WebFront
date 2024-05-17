import {useEffect, useState} from "react";
import getRestaurantProducts from "../../../../core/services/products/getRestaurantProducts";
import { useStoreContext } from "../../../../features/store/store.context";
import ProductListView from "../../components/products/ProductListView";
import Paginate from "../../../../components/pagination/Paginate";

/**
 * TODO: Comprendre pourquoi les requettes de modification et de creation echouent et gerer les problemes
 */
function RestaurantProducts()
{
    const [products, setProducts] = useState<Product[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Product>>({})

    const {token, user} = useStoreContext()

    useEffect(() => {
        getRestaurantProducts(token, user.id).then(r => {
                setPaginated(r.data)
                setProducts(r.data.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <ProductListView products={products ?? []} />
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        getRestaurantProducts(token, user.id, {page: selected+1}).then(r => setProducts(r.data.data))
                    }}/>
            </div>
        </div>
    )
}

export default RestaurantProducts

