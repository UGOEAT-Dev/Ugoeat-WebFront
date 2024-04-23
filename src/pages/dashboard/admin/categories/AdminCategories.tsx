import { useEffect, useState } from "react"
import CategoryListView from "../../components/category/CategoryListView"
import getCategories from "../../../../core/services/categories/getCategories"
import { AxiosResponse } from "axios"
import Paginate from "../../../../components/pagination/Paginate"

function AdminCategories({})
{
    const [categories, setCategories] = useState<Category[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Product>>({})

    useEffect(() => {
        getCategories().then((r: AxiosResponse) => {
            setPaginated(r.data)
            setCategories(r.data.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <div>
                <CategoryListView categories={categories} />
                <div className="w-full border-t-2">
                    <Paginate 
                        pageCount={(paginated.meta?.links.length ?? 0) -2}
                        onPageChange={({selected}) => {
                            getCategories({page: selected+1}).then((r: AxiosResponse) => setCategories(r.data.data))
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default AdminCategories

