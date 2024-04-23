import axios from "../../lib/axios.js";

async function updateProduct(token:string, id: number|string, product: any)
{
    return axios.put(
        `/api/v1/products/${id}`,
        product,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export default updateProduct