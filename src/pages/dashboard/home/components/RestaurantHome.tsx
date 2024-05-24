import Card from "./Card.js";
import { useStoreContext } from "@/features/store/hooks/useStoreContext";
import { RestaurantService } from "@/features/admin/services/restaurant.service";
import { routesConfig } from "@/router/router.config";
import { useQuery } from "@tanstack/react-query";

function RestaurantHome()
{
    const {user} = useStoreContext()
    const {routes} = routesConfig
    const {data: productsPaginated, isLoading} = useQuery({
        queryKey: ['/api/v1/products', user.id],
        queryFn: () => RestaurantService.getProducts(user.id, {limit:1, page: 1})
    })

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div>
            <div className="w-full p-2 grid gap-5 grid-cols-1 justify-between">
                <Card
                    className="w-full"
                    title="Mes Produits" icon="pi pi-shopping-bag"
                    number={productsPaginated?.meta?.total} text="voir plus" link={routes.dashboard.products}/>
                {/* <Card
                    className="w-full"
                    title="Mes Commandes" icon="pi pi-shopping-cart"
                    number={orders.length} text="voir plus" link={routes.dashboard.myOrders}/> */}
            </div>
        </div>
    )
}

export default RestaurantHome