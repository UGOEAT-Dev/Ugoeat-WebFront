
export type ImageableType = "products" | "restaurants";

export interface Image
{
    id: number, 
    url: string,
    imageable_id?: number,
    imageable_type?: ImageableType
}