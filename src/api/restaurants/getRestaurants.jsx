import axios from "../../lib/axios.jsx";

async function getRestaurants(token)
{
    return await axios.get(
        '/api/v1/restaurants',
        {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export default getRestaurants