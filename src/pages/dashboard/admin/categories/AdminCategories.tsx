import { useEffect, useState } from "react"
import CategoryListView from "../../components/category/CategoryListView"
import Paginate from "@/features/common/components/elements/pagination/Paginate"
import { useMiddleware } from "@/features/common/hooks"
import { CategoryService } from "@/features/common/services"
import useSWR from "swr"

function AdminCategories()
{
    useMiddleware('admin')
    const [categories, setCategories] = useState<Category[]>([])
    const { data: paginated, isLoading } = useSWR('/api/v1/categories', () => CategoryService.fetchFirst()) 

    useEffect(() => {
        if(paginated)
            setCategories(paginated.data ?? [])
    }, [paginated])

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <div>
                <CategoryListView categories={categories} />
                <div className="w-full border-t-2">
                    <Paginate 
                        pageCount={(paginated?.meta?.links.length ?? 0) -2}
                        onPageChange={({selected}) => {
                            CategoryService.fetch({page: selected+1}).then(r => setCategories(r.data ?? []))
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default AdminCategories

