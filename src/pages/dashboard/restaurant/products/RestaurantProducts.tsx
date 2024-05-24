import {useEffect, useState} from "react";
import { useStoreContext } from "@/features/store/hooks/useStoreContext";
import ProductListView from "../../components/products/ProductListView";
import Paginate from "@/features/common/components/elements/pagination/Paginate";
import { RestaurantService } from "@/features/admin/services/restaurant.service";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { usePaginationQuery } from "@/features/common/hooks";
import { Icon } from "@/features/common/components/elements/Icon";
import AddProductDialog from "./components/AddProductDialog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * TODO: Comprendre pourquoi les requettes de modification et de creation echouent et gerer les problemes
 */
function RestaurantProducts()
{
    const {user} = useStoreContext()
    const {page, limit} = usePaginationQuery()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(page)
    const [products, setProducts] = useState<Product[]>([])
    const {data: paginated, isLoading, refetch} = useQuery({
        queryKey: ['/api/v1/products', user.id, currentPage, limit],
        queryFn: () => RestaurantService.getProducts(user.id, {limit, page: currentPage}),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })
    const [visible, setVisible] = useState(false)

    const deleteMutation = useMutation({
        mutationKey: ['/api/v1/restaurants'],
        mutationFn: async (id: number) => RestaurantService.deleteProduct(user.id, id)
    })

    useEffect(() => {
        if(paginated)
            setProducts(paginated.data ?? [])
    }, [paginated])

    const addProduct = () => { setVisible(true) }

    const deleteProduct = (product: Product) => {
        deleteMutation.mutate(product.id, {
            onSuccess: () => {
                toast.success("Produit supprime avec succes")
                refetch();
            }
        })
    }

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <p>
                <button
                    onClick={addProduct} 
                    className="p-2 bg-secondary text-white rounded-md mb-3 font-bold">
                    <Icon icon="pi-plus"/> Ajouter un Produit
                </button>
            </p>
            <ProductListView 
                products={products ?? []} onDelete={deleteProduct}
                onSelect={(event: any) => navigate(`./${event.value.id}`)} />
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated?.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => { setCurrentPage(selected + 1) }}/>
            </div>
            <div>
                {visible && 
                    <AddProductDialog  
                        user={user} 
                        products={products} 
                        visible={visible} 
                        onHide={() => setVisible(false)}
                        onSuccess={() => {
                            toast.success("Produits Ajouter avec succes")
                            refetch()
                            setVisible(false)
                        }}/>}
            </div>
        </div>
    )
}

export default RestaurantProducts

