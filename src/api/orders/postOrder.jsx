import axios from "../../lib/axios.jsx";

async function postOrder(id, token, data)
{
    return await axios.post(
        `/api/v1/customers/${id}/orders`,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}

export default postOrder