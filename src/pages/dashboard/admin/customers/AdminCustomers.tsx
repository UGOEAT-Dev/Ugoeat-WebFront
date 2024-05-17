import UsersListView from "../../components/users/UsersListView";
import {useEffect, useState} from "react";
import getCustomers from "../../../../core/services/customers/getCustomers";
import { useStoreContext } from "../../../../features/store/store.context";
import { AxiosResponse } from "axios";
import Paginate from "../../../../components/pagination/Paginate";
import { Customer } from "../../../../core/types/Customer";
import { useMiddleware } from "../../../../core/hooks/useMiddleware";

function AdminCustomers({})
{
    useMiddleware('admin')
    const {token} = useStoreContext()
    const [customers, setCustomers] = useState<Customer[]>([])
    const [paginated, setPaginated] = useState<PaginatedResponse<Customer>>({})

    useEffect(() => {
        getCustomers(token).then((r:AxiosResponse) => {
            setPaginated(r.data) 
            setCustomers(r.data.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <UsersListView users={customers}/>
            <div className="w-full border-t-2">
                <Paginate 
                    pageCount={(paginated.meta?.links.length ?? 0) -2}
                    onPageChange={({selected}) => {
                        getCustomers(token, {page: selected+1}).then((r: AxiosResponse) => setCustomers(r.data.data))
                    }}/>
            </div>
        </div>
    )
}

export default AdminCustomers

