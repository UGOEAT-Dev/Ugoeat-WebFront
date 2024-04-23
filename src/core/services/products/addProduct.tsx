import axios from "../../lib/axios.js";

async function addProduct(data: any, token: string)
{
    return await axios.post(
        `/api/v1/products`,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}

export default addProduct