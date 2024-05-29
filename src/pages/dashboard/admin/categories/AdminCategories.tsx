import { useEffect, useState } from "react"
import CategoryListView from "../../components/category/CategoryListView"
import Paginate from "@/features/common/components/elements/pagination/Paginate"
import { useMiddleware, usePaginationQuery } from "@/features/common/hooks"
import { CategoryService } from "@/features/common/services"
import { useNavigate } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Category } from "@/features/common/types/Category"

function AdminCategories()
{
    useMiddleware('admin')
    const navigate = useNavigate()
    const {limit, page} = usePaginationQuery()
    const [currentPage, setCurrentPage] = useState(page)
    const [categories, setCategories] = useState<Category[]>([])
    const {data: paginated} = useQuery({
        queryKey: ['categories', currentPage, limit],
        queryFn: () => CategoryService.fetch({limit, page: currentPage}),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })

    useEffect(() => {
        if(paginated)
            setCategories(paginated.data ?? [])
    }, [paginated])

    return (
        <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <div>
                <CategoryListView 
                    categories={categories}
                    onSelect={(e: any) => {
                        const category = e.value as Category
                        navigate(`${category.id}`)
                    }} />
                <div className="w-full border-t-2">
                    <Paginate 
                        pageCount={(paginated?.meta?.links.length ?? 0) -2}
                        onPageChange={({selected}) => {
                            setCurrentPage(selected + 1)
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default AdminCategories

