import {useEffect, useState} from "react";
import getProducts from "../../../../core/services/products/getProducts";
import ProductListView from "../../components/products/ProductListView";
import Paginate from "../../../../components/pagination/Paginate";

function AdminProducts({})
{
    const [products, setProducts] = useState<Product[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Product>>({})

    useEffect(() => {
        getProducts({}).then(
            response => {
                setPaginated(response.data)
                setProducts(response.data.data)
            }
        )
    }, [])

    // const handleDeleteProduct = (product: Product) => {

    // }

    // const handleShowProduct = (product :Product) => {

    // }

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <ProductListView products={products ?? []} />
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        getProducts({page: selected+1}).then(r => setProducts(r.data.data))
                    }}/>
            </div>
        </div>
    )
}

export default AdminProducts

