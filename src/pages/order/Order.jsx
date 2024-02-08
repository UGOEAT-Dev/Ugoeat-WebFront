

import {useEffect, useState} from "react";
import queryString from "query-string"

import { CATEGORIES, PRODUCTS } from "./datas.jsx"
import ProductsView from "./components/ProductsView.jsx";


export default function Order()
{
    const [categories, setCategories] = useState(CATEGORIES)
    const [products, setProducts] = useState([])
    const qStringParsed = queryString.parse(location.search)

    useEffect(()=> {
        if(qStringParsed.q) {
            const query = String(qStringParsed.q).toLowerCase()
            setProducts(PRODUCTS.filter((p) => {
                return new RegExp(`.*${query}.*`).test(p.name.toLowerCase())
            }))
        } else {
            setProducts(PRODUCTS)
        }
    }, [])

    const changeCategory = (e) => {
        const newCategory = parseInt(e.target.value)

        if(newCategory !== 0)
            setProducts(PRODUCTS.filter(
                product => product.category_id === newCategory))
        else
            setProducts(PRODUCTS)
    }

    return (
        <div className="mt-10 w-10/12 md:w-full mx-auto sm:mt-20 sm:px-5">
            <h2 className="text-2xl font-bold pb-2 mb-5 border-b-4">Nos produits</h2>
            <div>
                <select id="categoryFilter" onChange={changeCategory} className="block w-full md:w-fit p-2 text-sm text-black border-2 border-black rounded-lg bg-white">
                    {categories.map((category, index) => {
                        return (<option key={category.name} value={index}>{category.name}</option>)
                    })}
                </select>
                <ProductsView products={products} />
            </div>
        </div>
    )
}