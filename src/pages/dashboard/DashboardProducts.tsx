import AdminProducts from "./admin/products/AdminProducts.js";
import RestaurantProducts from "./restaurant/products/RestaurantProducts.js";
import { useStoreContext } from "../../features/store/store.context.js";

function DashboardProducts()
{
    const {user} = useStoreContext()
    if ( user.role === 'admin')
        return ( <AdminProducts /> )

    return (
        <RestaurantProducts />
    )
}

export default DashboardProducts