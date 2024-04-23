import axios from "../../lib/axios.js";

async function getOrder(token: string, order_id: number|string)
{
    return await axios.get(`/api/v1/orders/${order_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default getOrder