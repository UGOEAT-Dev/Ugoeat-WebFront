
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import ProductsView from "./components/ProductsView.js";
import { useStoreContext } from "@/features/store/hooks/useStoreContext";
import { ProductService, CategoryService } from "@/features/common/services";
import { useQueries } from "@tanstack/react-query";

export default function Products()
{
    const {addProduct} = useStoreContext();

    const {isFetching, data} = useQueries({
        queries: [
            { queryKey: ['/api/v1/categories'], queryFn: () => CategoryService.fetchFirst() },
            { queryKey: ['/api/v1/products'], queryFn: () => ProductService.fetchFirst()}
        ],
        combine: results => ({
            data: { productsResponse: results[1].data, categoryResponse: results[0].data },
            isFetching: results.some(data => data.isFetching)
        })
    })
    const {productsResponse, categoryResponse: categories} = data
    const [products, setProducts] = useState<Product[]>([])
    const [currentCategory, setCurrentCategory] = useState<Category|undefined>(undefined)
    const productFiltered = useMemo(() => {
        return currentCategory ? products.filter((p) => p.category?.id === currentCategory.id) : products
    }, [currentCategory, products])

    useEffect(() => {
        document.title = "Commandez | UGOEAT"
        // document.querySelector('meta[property="og:title"]').content = "Commandez";
    }, [])

    useEffect(() => {
        if(productsResponse)
            setProducts(productsResponse?.data ?? [])
    }, [productsResponse])


    const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const category = parseInt(e.target.value)
        setCurrentCategory(category !== 1 ? {id: category} : undefined)
    }

    return (
        <div className="mt-10 w-10/12 md:w-full mx-auto sm:mt-20 sm:px-5">
            <h2 className="text-2xl font-bold pb-2 mb-5 border-b-4">Nos produits</h2>
            <div>
                <select id="categoryFilter" onChange={changeCategory} className="block w-full md:w-fit p-2 text-sm text-black border-2 border-black rounded-lg bg-white">
                    {categories?.data?.map((category: Category) => {
                        return (<option key={category.name} value={category.id}>{category.name}</option>)
                    })}
                </select>
                {isFetching ? <p>Loading ...</p> : <ProductsView products={productFiltered} onAdd={addProduct} />}
            </div>
        </div>
    )
}