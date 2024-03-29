import axios from "../../lib/axios.jsx";

async function getOrder(token, customer_id, order_id)
{
    return await axios.get(`/api/v1/customers/${customer_id}/orders/${order_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default getOrder