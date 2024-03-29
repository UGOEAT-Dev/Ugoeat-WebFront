import axios from "../../lib/axios.jsx";

async function updateProductImage(token, id, data)
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