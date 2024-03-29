import Card from "./Card.jsx";
import {useContext, useEffect, useState} from "react";
import getRestaurantProducts from "../../../../api/products/getRestaurantProducts.jsx";
import AppContext from "../../../../AppContext.jsx";

function RestaurantHome()
{
    const {user, token} = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        getRestaurantProducts(token, user.id).then(r => setProducts(r.data.data))
    }, [])

    return (
        <div>
            <div className="w-full p-2 grid gap-5 grid-cols-2 justify-between">
                <Card
                    className="w-full"
                    title="Mes Produits" icon="pi pi-shopping-bag"
                    number={products.length} text="voir plus" link="/dashboard/products"/>
                <Card
                    className="w-full"
                    title="Mes Commandes" icon="pi pi-shopping-cart"
                    number={orders.length} text="voir plus" link="/dashboard/orders"/>
            </div>
        </div>
    )
}

export default RestaurantHome