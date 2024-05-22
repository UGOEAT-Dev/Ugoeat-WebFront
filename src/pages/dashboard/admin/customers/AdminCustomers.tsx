import UsersListView from "../../components/users/UsersListView";
import {useEffect, useState} from "react";
import Paginate from "@/features/common/components/elements/pagination/Paginate";
import { useMiddleware } from "@/features/common/hooks";
import { Customer } from "@/features/common/types/Customer";
import useSWR from "swr";
import { CustomerService } from "@/features/admin/services/customer.service";

function AdminCustomers({})
{
    useMiddleware('admin')
    const [customers, setCustomers] = useState<Customer[]>([])
    const {data: paginated, isLoading} = useSWR('/api/v1/customers', () => CustomerService.fetch()) 

    useEffect(() => {
        if(paginated)
            setCustomers(paginated.data ?? [])
    }, [paginated])

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <UsersListView users={customers}/>
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated?.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        CustomerService.fetch({page: selected+1}).then(response => setCustomers(response.data ?? []))
                    }}/>
            </div>
        </div>
    )
}

export default AdminCustomers

