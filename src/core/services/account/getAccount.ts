import axios from "../../lib/axios";

async function getAccount(token: string)
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