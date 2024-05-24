import {useEffect, useState} from "react";
import ProductListView from "@/pages/dashboard/components/products/ProductListView";
import Paginate from "@/features/common/components/elements/pagination/Paginate";
import { useMiddleware } from "@/features/common/hooks";
import { ProductService } from "@/features/common/services/products.service";
import usePaginationQuery from "@/features/common/hooks/usePaginationQuery";
import { useNavigate } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

function AdminProducts()
{
    useMiddleware('admin')
    const {limit, page} = usePaginationQuery()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(page)
    const { data: paginated, isFetching } = useQuery({
        queryKey: ['products', currentPage, limit],
        queryFn: () => ProductService.fetch({limit, page: currentPage}),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        if(paginated) {
            setProducts(paginated.data ?? [])
        }
    }, [paginated])

    useEffect(() => {
        navigate(`?page=${currentPage}${limit ? `&limit=${limit}`:''}`)
    }, [currentPage])

    const onProductSelected = (e: any) => {
        const product = e.value as Product
        navigate(`${product.id}`)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Produits</h1>
            {isFetching? 
                <p>Loading ...</p> :
                <ProductListView products={products ?? []} onSelect={onProductSelected}/>}
            <div className="w-full border-t-2">
                <Paginate
                    pageCount={paginated?.meta?.last_page ?? 0}
                    initialPage={currentPage - 1}
                    onPageChange={({selected}) => {
                        setCurrentPage(selected + 1)
                    }}/>
            </div>
        </div>
    )
}

export default AdminProducts

