import {useEffect, useState} from "react";
import ProductListView from "@/pages/dashboard/components/products/ProductListView";
import Paginate from "@/features/common/components/elements/pagination/Paginate";
import { useMiddleware } from "@/features/common/hooks";
import { ProductService } from "@/features/common/services/products.service";
import useSWR from "swr";
import usePaginationQuery from "@/features/common/hooks/usePaginationQuery";
import { useNavigate } from "react-router-dom";

function AdminProducts()
{
    useMiddleware('admin')
    const {limit, page} = usePaginationQuery()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(page)
    const {data: paginated, isLoading, mutate } = useSWR('/api/v1/products', () => {
        return ProductService.fetch({limit, page: currentPage})
    })
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        if(paginated) {
            setProducts(paginated.data ?? [])
        }
    }, [paginated])

    const onProductSelected = (e: any) => {
        const product = e.value as Product
        navigate(`${product.id}`)
    }

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            <ProductListView products={products ?? []} onSelect={onProductSelected}/>
            <div className="w-full border-t-2">
                <Paginate
                    pageCount={paginated?.meta?.last_page ?? 0}
                    initialPage={page - 1}
                    hrefBuilder={(pageIndex) => `?&page=${pageIndex}${limit ? `?limit=${limit}`: ''}`}
                    onPageChange={({selected}) => {
                        const nextPage = selected + 1
                        if(nextPage !== page) {
                            console.log(nextPage)
                            setCurrentPage(nextPage)
                            navigate(`?page=${nextPage}${limit ? `?limit=${limit}` : ''}`)
                            mutate()
                        }
                    }}/>
            </div>
        </div>
    )
}

export default AdminProducts

