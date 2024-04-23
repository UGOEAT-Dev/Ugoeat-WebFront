import axios from "../../lib/axios";
import { PaginationOptions } from "../../types/options/PaginationOption";

async function getRestaurants(token: string, options?: PaginationOptions)
{
    return await axios.get(
        `/api/v1/restaurants${options? `?limit=${options.limit ?? 10}&page=${options.page ?? 0}` : ''}`,
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getRestaurants