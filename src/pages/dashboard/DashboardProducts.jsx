import {useOutletContext} from "react-router-dom";
import AdminProducts from "./admin/products/AdminProducts.jsx";
import RestaurantProducts from "./restaurant/products/RestaurantProducts.jsx";

function DashboardProducts()
{
    const { user, token } = useOutletContext()
    const role = user.role.toLowerCase()

    if ( role === 'admin')
        return ( <AdminProducts context={{user, token}} /> )

    return (
        <RestaurantProducts context={{user, token}} />
    )
}

export default DashboardProducts