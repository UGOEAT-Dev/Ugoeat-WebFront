
interface Product
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

interface ProductOrdered extends Product
{
    quantity: number
}
