import axios from "../../lib/axios.jsx";

async function getCustomerOrders(id, token)
{
    return await axios.get(`/api/v1/customers/${id}/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default getCustomerOrders