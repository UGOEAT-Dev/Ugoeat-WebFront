import axios from "../../lib/axios.jsx";

async function addProduct(data, token)
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