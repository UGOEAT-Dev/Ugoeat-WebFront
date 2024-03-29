
import {useEffect, useState} from "react";
import queryString from "query-string"
import ProductsView from "./components/ProductsView.jsx";
import axios from "../../lib/axios.jsx";
import {useOutletContext} from "react-router-dom";
import getProducts from "../../api/products/getProducts.jsx";
import getCategories from "../../api/categories/getCategories.jsx";

let productsBank = []

export default function Order()
{
    const [orders, setOrders] = useOutletContext();
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState(productsBank)

    const qStringParsed = queryString.parse(location.search)

    useEffect(() => {

        document.title = "Commandez | UGOEAT"

        getCategories().then(response => setCategories(response.data.data))
        getProducts().then(response => {
                productsBank = response.data.data
                setProducts(productsBank)
            })
    }, [])


    const changeCategory = (e) => {
        const newCategory = parseInt(e.target.value)

        if(newCategory !== 1)
            setProducts(productsBank.filter(
                product => product.category_id === newCategory))
        else
            setProducts(productsBank)
    }

    const onAddProductBtnClicked = (product) => {
        const productsOrdered = orders.products
        const index = productsOrdered.findIndex(p => p.id === product.id)
        if(index !== -1)
            productsOrdered[index].quantity += 1
        else
            productsOrdered.push({quantity:1, ...product})
        // update orders

        setOrders({...orders, products: productsOrdered, price: 0})
    }

    return (
        <div className="mt-10 w-10/12 md:w-full mx-auto sm:mt-20 sm:px-5">
            <h2 className="text-2xl font-bold pb-2 mb-5 border-b-4">Nos produits</h2>
            <div>
                <select id="categoryFilter" onChange={changeCategory} className="block w-full md:w-fit p-2 text-sm text-black border-2 border-black rounded-lg bg-white">
                    {categories.map((category) => {
                        return (<option key={category.name} value={category.id}>{category.name}</option>)
                    })}
                </select>
                <ProductsView products={products} onAddBtnClicked={onAddProductBtnClicked} />
            </div>
        </div>
    )
}
