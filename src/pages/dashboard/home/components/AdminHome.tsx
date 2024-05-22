import Card from "./Card";
import useSWR from "swr";
import { StatsService } from "@/features/admin/services/stats.service";
import { routesConfig } from "@/router/router.config";

function AdminHome()
{
    const {data, isLoading} = useSWR('/api/v1/stats', () => StatsService.getStats())
    const { routes } = routesConfig

    if(isLoading)
        return <p>Loading ...</p>

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card
                className="w-full"
                title="Nos clients" icon="pi pi-users"
                number={data.customers} text="voir plus" link={routes.dashboard.customers}/>
            <Card
                className="w-full"
                title="Nos Restaurants" icon="pi pi-th-large"
                number={data.restaurants} text="voir plus" link={routes.dashboard.restaurants}/>
            <Card
                className="w-full"
                title="Nos Produits" icon="pi pi-shopping-bag"
                number={data.products} text="voir plus" link={routes.dashboard.products}/>

            <Card
                className="w-full"
                title="Nos Categories" icon="pi pi-hashtag"
                number={data.categories} text="voir plus" link={routes.dashboard.categories}/>
            <Card
                className="w-full"
                title="Nos Commandes" icon="pi pi-shopping-cart"
                number={data.orders} text="voir plus" link={routes.dashboard.orders}/>
        </div>
    )
}

export default AdminHome