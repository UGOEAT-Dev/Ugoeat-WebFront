import axios from "../../lib/axios.jsx";

async function deleteProduct(id, token)
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