import axios from "../../lib/axios.js";

async function getOrderWithProducts(token: string, order_id: number|string)
{
    return axios.get(`/api/v1/orders/${order_id}/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default getOrderWithProducts