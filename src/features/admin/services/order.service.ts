import { Order } from "@/features/common/types/Order";
import { PaginationOptions } from "@/features/common/types/options/PaginationOption";
import axios from "@/lib/axios/axios";
import { globalAxiosHeader as headers } from "@/lib/axios/headers.global";

export class OrderService 
{

    static async fetch(options: PaginationOptions = {page: 1, limit: 10}) {
        return await axios.get(
            `/api/v1/orders?limit=${options.limit}&page=${options.page}`, { headers }
        ).then(response => response.data as PaginatedResponse<Order> )
    }

    static async store(data: any, token: string) {
        return await axios.post(
            '/api/v1/orders', data, { headers: { Authorization: `Bearer ${token}`} }
        ).then(response => response.data.data as Order)
    }

    static async get(id: number) {
        return await axios.get(
            `/api/v1/orders/${id}`, 
            { headers }
        ).then(response => response.data.data as Order)
    }

    static async delete(id: number) {
        return await axios.delete(
            `api/v1/orders/${id}`, { headers }
        ).then(response => response.data )
    }
}