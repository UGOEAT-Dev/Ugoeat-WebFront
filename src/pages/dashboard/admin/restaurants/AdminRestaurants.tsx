import {useEffect, useState} from "react";
import {useStoreContext} from "../../../../features/store/store.context";
import UsersListView from "../../components/users/UsersListView";
import getRestaurants from "../../../../core/services/restaurants/getRestaurants";
import Paginate from "../../../../components/pagination/Paginate";
import { Restaurant } from "../../../../core/types/Restaurant";
import { AxiosResponse } from "axios";
import { useMiddleware } from "../../../../core/hooks/useMiddleware";

function AdminRestaurants({})
{
    useMiddleware('admin')
    const {token} = useStoreContext()
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Restaurant>>({})

    useEffect(() => {
        getRestaurants(token).then((r: AxiosResponse) => {
            setPaginated(r.data)
            setRestaurants(r.data.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Restaurants</h1>
            <UsersListView users={restaurants}/>
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        getRestaurants(token, {page: selected+1}).then((r: AxiosResponse) => setRestaurants(r.data.data))
                    }}/>
            </div>
        </div>
    )
}

export default AdminRestaurants

