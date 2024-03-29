
import axios from "../../lib/axios.jsx";

async function getCategories()
{
    return await axios.get(
        '/api/v1/categories'
    )
}

export default getCategories