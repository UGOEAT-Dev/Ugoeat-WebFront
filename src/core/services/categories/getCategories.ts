
import axios from "../../lib/axios.js";
import { PaginationOptions } from "../../types/options/PaginationOption.js";

async function getCategories(options?: PaginationOptions)
{
    return await axios.get(
        `/api/v1/categories${options ? `?limit=${options.limit ?? 10}&page=${options.page ?? 0}` : ''}`
    )
}

export default getCategories