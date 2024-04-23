import axios from "../../lib/axios.js";

async function getProducts({limit = 10, page = 1}: {limit?: number, page?: number})
{
    return await axios.get(
        `/api/v1/products?limit=${limit}&page=${page}`
    )
}

export default getProducts