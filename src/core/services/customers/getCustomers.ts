import axios from "../../lib/axios";
import { PaginationOptions } from "../../types/options/PaginationOption";

async function getCustomers(token: string, options: PaginationOptions = {limit: 10, page:0})
{
    return await axios.get(
        `/api/v1/customers${options? `?limit=${options.limit}&page=${options.page}` : ''}`,
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getCustomers