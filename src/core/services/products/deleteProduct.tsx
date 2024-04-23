import axios from "../../lib/axios.js";

async function deleteProduct(id: number|string, token: string)
{
    return axios.delete(
        `/api/v1/products/${id}`,
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default deleteProduct