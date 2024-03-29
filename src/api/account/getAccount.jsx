import axios from "../../lib/axios.jsx";

async function getAccount(token)
{
    return await axios.get(
        '/api/v1/account',
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getAccount