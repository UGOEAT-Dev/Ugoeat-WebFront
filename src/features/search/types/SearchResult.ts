import { Category } from "@/features/common/types/Category";
import { Product } from "@/features/common/types/Product";
import { Restaurant } from "@/features/common/types/Restaurant";

export interface SearchResult
{
    result: {
        
        categories?: Category[],

        products?: Product[],

        restaurants?: Restaurant[]
    }
}