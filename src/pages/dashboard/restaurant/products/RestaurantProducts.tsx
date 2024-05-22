import {useEffect, useState} from "react";
import { useStoreContext } from "@/features/store/hooks/useStoreContext";
import ProductListView from "../../components/products/ProductListView";
import Paginate from "@/features/common/components/elements/pagination/Paginate";
import useSWR from "swr";
import { RestaurantService } from "@/features/admin/services/restaurant.service";

/**
 * TODO: Comprendre pourquoi les requettes de modification et de creation echouent et gerer les problemes
 */
function RestaurantProducts()
{
    const {user} = useStoreContext()
    const [products, setProducts] = useState<Product[]>([])
    const {data: paginated, isLoading} = useSWR('/api/v1/restaurants/{id}/products', () => RestaurantService.getProducts(user.id) )

    useEffect(() => {
        if(paginated)
            setProducts(paginated.data ?? [])
    }, [paginated])

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <ProductListView products={products ?? []} />
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated?.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        RestaurantService.getProducts(user.id, {page: selected+1}).then(r => setProducts(r.data ?? []))
                    }}/>
            </div>
        </div>
    )
}

export default RestaurantProducts

