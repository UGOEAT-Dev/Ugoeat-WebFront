import { Category } from "./Category"
import { Image } from "./Image"

export interface Product
{
    id: number,
    name?: string,
    description?: string,
    image_url?: string,
    price?: number,
    is_active?: boolean
    images?: Image[],
    category?: Category,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null
}

export interface ProductOrdered extends Product
{
    quantity: number
}
