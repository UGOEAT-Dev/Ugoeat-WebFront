import UsersListView from "../../components/users/UsersListView";
import {useEffect, useState} from "react";
import Paginate from "@/features/common/components/elements/pagination/Paginate";
import { useMiddleware, usePaginationQuery } from "@/features/common/hooks";
import { Customer } from "@/features/common/types/Customer";
import { CustomerService } from "@/features/admin/services/customer.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function AdminCustomers({})
{
    useMiddleware('admin')
    const {limit, page} = usePaginationQuery()
    const [customers, setCustomers] = useState<Customer[]>([])
    const [currentPage, setCurrentPage] = useState(page)
    const { data: paginated, isFetching } = useQuery({
        queryKey: ['customers', currentPage, limit],
        queryFn: () => CustomerService.fetch({limit, page: currentPage}),
        placeholderData: keepPreviousData,
        staleTime: 5000
    })

    useEffect(() => {
        if(paginated)
            setCustomers(paginated.data ?? [])
    }, [paginated])

    return (
        <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            {isFetching?
                <p>Loading ...</p> :
                <UsersListView users={customers}/>
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

export default AdminCustomers

