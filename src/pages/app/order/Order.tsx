
import {ChangeEvent, useEffect, useState} from "react";
import ProductsView from "./components/ProductsView.js";
import getProducts from "../../../core/services/products/getProducts";
import getCategories from "../../../core/services/categories/getCategories.js";
import { useAppContext } from "../../../core/context/AppContext.js";

let productsBank: Product[] = []

export default function Order()
{
    const {cart, updateCart} = useAppContext();
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>(productsBank)

    useEffect(() => {

        document.title = "Commandez | UGOEAT"
        // document.querySelector('meta[property="og:title"]').content = "Commandez";

        getCategories().then(response => setCategories(response.data.data))
        getProducts({}).then(response => {
                productsBank = response.data.data
                setProducts(productsBank)
            })
    }, [])


    const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const newCategory = parseInt(e.target.value)

        if(newCategory !== 1)
            setProducts(productsBank.filter(
                product => product.category?.id === newCategory))
        else
            setProducts(productsBank)
    }

    const onAddProductBtnClicked = (product: Product) => {
        updateCart(cart.addProduct(product))
    }

    return (
        <div className="mt-10 w-10/12 md:w-full mx-auto sm:mt-20 sm:px-5">
            <h2 className="text-2xl font-bold pb-2 mb-5 border-b-4">Nos produits</h2>
            <div>
                <select id="categoryFilter" onChange={changeCategory} className="block w-full md:w-fit p-2 text-sm text-black border-2 border-black rounded-lg bg-white">
                    {categories.map((category: Category) => {
                        return (<option key={category.name} value={category.id}>{category.name}</option>)
                    })}
                </select>
                <ProductsView products={products} onAdd={onAddProductBtnClicked} />
            </div>
        </div>
    )
}
