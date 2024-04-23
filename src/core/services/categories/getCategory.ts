
import axios from "../../lib/axios.js";

async function getCategory(id: number)
{
    return await axios.get(
        `/api/v1/categories/${id}`
    )
}

export default getCategory