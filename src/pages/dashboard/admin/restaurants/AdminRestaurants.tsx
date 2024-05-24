import {useEffect, useState} from "react";
import UsersListView from "../../components/users/UsersListView";
import Paginate from "../../../../features/common/components/elements/pagination/Paginate";
import { Restaurant } from "../../../../features/common/types/Restaurant";
import { useMiddleware, usePaginationQuery } from "@/features/common/hooks";
import { RestaurantService } from "@/features/admin/services/restaurant.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function AdminRestaurants()
{
    useMiddleware('admin')
    const {limit, page} = usePaginationQuery()
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [currentPage, setCurrentPage] = useState(page)
    const { data: paginated, isFetching } = useQuery({
        queryKey: ['restaurants', currentPage, limit],
        queryFn: () => RestaurantService.fetch({limit, page: currentPage}),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })

    useEffect(() => {
        if(paginated)
            setRestaurants(paginated.data ?? [])
    }, [paginated])


    return (
        <div>
            <h1 className="text-2xl font-bold">Restaurants</h1>
            {
                isFetching ? <p>Loading ...</p> :
                <UsersListView users={restaurants}/>
            }
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated?.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        setCurrentPage(selected + 1)
                    }}/>
            </div>
        </div>
    )
}

export default AdminRestaurants

