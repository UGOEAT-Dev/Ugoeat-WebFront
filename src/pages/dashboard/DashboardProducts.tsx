import AdminProducts from "./admin/products/AdminProducts.js";
import RestaurantProducts from "./restaurant/products/RestaurantProducts.js";
import { useAppContext } from "../../core/context/AppContext.js";

function DashboardProducts()
{
    const {user} = useAppContext()
    if ( user.role === 'admin')
        return ( <AdminProducts /> )

    return (
        <RestaurantProducts />
    )
}

export default DashboardProducts