import {useOutletContext} from "react-router-dom";

function DashboardOrders()
{
    const {user, token} = useOutletContext()

    return (
        <div>
            <h1 className="text-2xl font-bold">Mes Commandes</h1>
        </div>
    )

}

export default DashboardOrders