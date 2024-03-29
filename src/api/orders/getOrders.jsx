import axios from "../../lib/axios.jsx";

async function getOrders(token)
{
    return await axios.get(
        '/api/v1/orders',
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getOrders