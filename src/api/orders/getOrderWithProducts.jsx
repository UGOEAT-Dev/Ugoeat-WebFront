import axios from "../../lib/axios.jsx";

async function getOrderWithProducts(token, customer_id, order_id)
{
    return axios.get(`/api/v1/customers/${customer_id}/orders/${order_id}/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default getOrderWithProducts