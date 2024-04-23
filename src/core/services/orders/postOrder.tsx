import axios from "../../lib/axios.js";
import { Order } from "../../types/Order.js";

async function postOrder(token:string, data:Order)
{
    return await axios.post(
        `/api/v1/orders`,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}

export default postOrder