import { PanelMenu } from "primereact/panelmenu"
import { SearchResult } from "../types/SearchResult"
import { MenuItem, MenuItemOptions } from "primereact/menuitem"
import { useMemo } from "react"
import { Avatar } from "primereact/avatar"

interface SearchResultViewProps 
{
    query: string
    searchResult: SearchResult
}

export default function SearchResultView({searchResult, query}: SearchResultViewProps) 
{
    const {categories, products, restaurants } = searchResult.result
    const hasCategories = categories?.length !== 0
    const hasProducts = products?.length !== 0
    const hasRestaurants = restaurants?.length !== 0
    const isEmptyResult = !hasCategories && !hasProducts && !hasRestaurants
    
    const itemRenderer = (item: MenuItem & {image?: string}, options: MenuItemOptions) => (
        <a href={item.url} className="flex gap-1 items-center px-3 py-1 cursor-pointer" onClick={options.onClick}>
            <span className={`${item.icon}`} />
            {item.image && <Avatar image={item.image}  shape="circle" />}
            <span>{item.label}</span>
        </a>
    )

    const items: MenuItem[] = useMemo(() => {
        const menuItems: MenuItem[] = []

        if(hasProducts) {
            menuItems.push({
                label: 'Produits',
                icon: 'pi pi-shopping-cart',
                expanded: true,
                template: itemRenderer,
                items: products?.map((product) => {
                    return {
                        label: `${product.name} - ${product.restaurant?.name}`,
                        url: `/products/${product.slug}`,
                        image: product.image_url,
                        template: itemRenderer
                    } as MenuItem
                })
            })
        }

        if(hasCategories) {
            menuItems.push({
                label: 'Categories',
                icon: 'pi pi-th-large',
                expanded: true,
                template: itemRenderer,
                items: categories?.map(category => {
                    return {
                        label: category.name,
                        url: `/categories/${category.slug}`,
                        image: category.image_url,
                        template: itemRenderer
                    } as MenuItem
                })
            })
        }

        if(hasRestaurants) {
            menuItems.push({
                label: 'Restaurants',
                icon: 'pi pi-slack',
                expanded: true,
                template: itemRenderer,
                items: restaurants?.map(restaurant => {
                    return {
                        label: restaurant.name,
                        image: restaurant.image_url,
                        url: `/restaurants/${restaurant.slug}`,
                        template: itemRenderer
                    } as MenuItem
                })
            })
        }

        return menuItems
    }, [categories, products, restaurants, hasCategories, hasRestaurants, hasProducts])

    if(isEmptyResult)
        return <p>Aucun resultat <i>{query}</i></p>
    
    return (
        <div>
            <PanelMenu model={items} className="flex flex-col gap-2 bg-transparent" multiple/>
        </div>
    )
}
