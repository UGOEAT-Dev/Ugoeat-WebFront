import { PaginationOptions } from "@/features/common/types/options/PaginationOption";
import axios from "@/lib/axios/axios";
import { globalAxiosHeader as headers } from "@/lib/axios/headers.global"
import { UserService } from "./users.service";
import { Restaurant } from "@/features/common/types/Restaurant";
import { Product } from "@/features/common/types/Product";

export class RestaurantService extends UserService
{
    static async fetch(options?: PaginationOptions) {
        return super.getUsers<Restaurant>("restaurant", options)
    }

    static async get(id: number|string) {
        return await axios.get(`/api/v1/restaurants/${id}`).then(response => response.data.data as Restaurant)
    }

    static async getProducts(id: number|string, options?: PaginationOptions) {
        return await axios.get(
            `/api/v1/restaurants/${id}/products?limit=${options?.limit ?? 10}&page=${options?.page ?? 1}`,
            { headers }
        ).then( response => response.data as PaginatedResponse<Product>);
    }

    static async addProducts(id: number, data: any) {
        return await axios.post(
            `/api/v1/restaurants/${id}/products`,
            data, { headers }
        ).then(response => response.data )
    }

    static async deleteProduct(restaurant_id: number, product_id: number) {
        return await axios.delete(
            `/api/v1/restaurants/${restaurant_id}/products/${product_id}`, { headers }
        );
    }
}