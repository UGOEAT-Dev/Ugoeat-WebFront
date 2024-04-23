import axios from "../../lib/axios";
import { PaginationOptions } from "../../types/options/PaginationOption";

async function getOrders(token: string, options: PaginationOptions = {limit: 10, page:0})
{
    return await axios.get(
        `/api/v1/orders${options? `?limit=${options.limit}&page=${options.page}` : ''}`,
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getOrders