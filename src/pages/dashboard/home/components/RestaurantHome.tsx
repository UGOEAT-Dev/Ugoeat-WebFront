import Card from "./Card.js";
import {useEffect, useState} from "react";
import getRestaurantProducts from "../../../../core/services/products/getRestaurantProducts.jsx";
import { useStoreContext } from "../../../../features/store/store.context.js";
import { routesConfig } from "../../../../router.config.js";

function RestaurantHome()
{
    const {user, token} = useStoreContext()
    const {routes} = routesConfig
    const [products, setProducts] = useState([])

    useEffect(() => {
        getRestaurantProducts(token, user.id).then(r => setProducts(r.data.data))
    }, [])

    return (
        <div>
            <div className="w-full p-2 grid gap-5 grid-cols-1 justify-between">
                <Card
                    className="w-full"
                    title="Mes Produits" icon="pi pi-shopping-bag"
                    number={products.length} text="voir plus" link={routes.dashboard.products}/>
                {/* <Card
                    className="w-full"
                    title="Mes Commandes" icon="pi pi-shopping-cart"
                    number={orders.length} text="voir plus" link={routes.dashboard.myOrders}/> */}
            </div>
        </div>
    )
}

export default RestaurantHome