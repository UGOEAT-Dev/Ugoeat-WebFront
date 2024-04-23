import axios from "../../lib/axios.js";

async function getCustomerOrders(token: string)
{
    return await axios.get(`/api/v1/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default getCustomerOrders