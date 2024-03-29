import axios from "../../lib/axios.jsx";

async function getCustomers(token)
{
    return await axios.get(
        '/api/v1/customers',
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getCustomers