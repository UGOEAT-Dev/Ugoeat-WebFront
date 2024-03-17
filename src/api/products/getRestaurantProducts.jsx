import axios from '../../lib/axios.jsx'

async function getRestaurantProducts(token, id)
{
    return await axios.get(`/api/v1/restaurants/${id}/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default getRestaurantProducts