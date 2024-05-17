import Card from "./Card";
import {useEffect, useState} from "react";
import getProducts from "../../../../core/services/products/getProducts";
import getCategories from "../../../../core/services/categories/getCategories";
import getOrders from "../../../../core/services/orders/getOrders";
import getCustomers from "../../../../core/services/customers/getCustomers";
import getRestaurants from "../../../../core/services/restaurants/getRestaurants";
import { useStoreContext } from "../../../../features/store/store.context";

function AdminHome()
{
    const {token} = useStoreContext()
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [categories, setCategories] = useState([])
    const [customers, setCustomers] = useState([])
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getProducts({}).then(r => setProducts(r.data.data))
        getCategories().then(r => setCategories(r.data.data))
        getOrders(token).then(r => setOrders(r.data.data))
        getCustomers(token).then(r => setCustomers(r.data.data))
        getRestaurants(token).then(r => setRestaurants(r.data.data))
    }, [])

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card
                className="w-full"
                title="Nos clients" icon="pi pi-users"
                number={customers.length} text="voir plus" link="/dashboard/customers"/>
            <Card
                className="w-full"
                title="Nos Restaurants" icon="pi pi-th-large"
                number={restaurants.length} text="voir plus" link="/dashboard/restaurants"/>
            <Card
                className="w-full"
                title="Nos Produits" icon="pi pi-shopping-bag"
                number={products.length} text="voir plus" link="/dashboard/products"/>

            <Card
                className="w-full"
                title="Nos Categories" icon="pi pi-hashtag"
                number={categories.length} text="voir plus" link="/dashboard/categories"/>
            <Card
                className="w-full"
                title="Nos Commandes" icon="pi pi-shopping-cart"
                number={orders.length} text="voir plus" link="/dashboard/orders_"/>
        </div>
    )
}

export default AdminHome