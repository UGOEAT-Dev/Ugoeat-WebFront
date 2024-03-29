import axios from "../../lib/axios.jsx";

async function getProducts()
{
    return await axios.get(
        '/api/v1/products'
    )
}

export default getProducts