import UsersListView from "../../components/UsersListView.jsx";
import {useContext, useEffect, useState} from "react";
import getCustomers from "../../../../api/customers/getCustomers.jsx";
import AppContext from "../../../../AppContext.jsx";

function AdminCustomers({...props})
{
    const {user, token} = useContext(AppContext)
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers(token).then(r => setCustomers(r.data.data))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <UsersListView users={customers}/>
        </div>
    )
}

export default AdminCustomers

