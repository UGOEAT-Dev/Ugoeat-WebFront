
interface Category
{
    id: number,
    name?: string,
    description?: string,
    image_url?: string,
    images?: Image[],
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null
}

