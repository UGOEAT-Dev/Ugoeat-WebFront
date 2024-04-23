import axios from "../../lib/axios.js";

async function updateProductImage(token: string, id: number|string, data:any)
{
    return await axios.post(
        `/api/v1/products/${id}/updateImage`,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}

export default updateProductImage