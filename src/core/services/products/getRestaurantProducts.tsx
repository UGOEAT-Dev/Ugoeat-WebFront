import axios from '../../lib/axios.js'
import { PaginationOptions } from '../../types/options/PaginationOption.js'

async function getRestaurantProducts(token: string, id: number, options: PaginationOptions = {limit: 10, page: 0})
{
    return await axios.get(`/api/v1/restaurants/${id}/products${options? `?limit=${options.limit}&page=${options.page}` : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default getRestaurantProducts