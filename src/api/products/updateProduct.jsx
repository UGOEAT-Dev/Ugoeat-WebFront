import axios from "../../lib/axios.jsx";

async function updateProduct(token, id, product)
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