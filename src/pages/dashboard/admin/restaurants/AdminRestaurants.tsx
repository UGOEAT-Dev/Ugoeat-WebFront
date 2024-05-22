import {useEffect, useState} from "react";
import UsersListView from "../../components/users/UsersListView";
import Paginate from "../../../../features/common/components/elements/pagination/Paginate";
import { Restaurant } from "../../../../features/common/types/Restaurant";
import { useMiddleware } from "@/features/common/hooks";
import { RestaurantService } from "@/features/admin/services/restaurant.service";
import useSWR from "swr";

function AdminRestaurants()
{
    useMiddleware('admin')
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const {data: paginated, isLoading} = useSWR('/api/v1/restaurants', () => RestaurantService.fetch())

    useEffect(() => {
        if(paginated)
            setRestaurants(paginated.data ?? [])
    }, [paginated])

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Restaurants</h1>
            <UsersListView users={restaurants}/>
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated?.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        RestaurantService.fetch({page: selected+1}).then(r => setRestaurants(r.data ?? []))
                    }}/>
            </div>
        </div>
    )
}

export default AdminRestaurants

