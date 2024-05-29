import axios from "@/lib/axios/axios";
import { globalAxiosHeader as headers } from "@/lib/axios/headers.global";
import { PaginationOptions } from "../types/options/PaginationOption";
import { Cursor, defaultCursor } from "../types/pagination/Cursor";
import { Product } from "../types/Product";

export class ProductService
{
    private static cursor: Cursor = defaultCursor

    static resetCursor(cursor?: Cursor) {
        this.cursor = cursor ?? defaultCursor
    }

    static async fetchFirst(options: PaginationOptions = {limit: 10, page:0}) {
        this.resetCursor({currentPage: options.page ?? 0, itemCount: options.limit})
        return this.fetch()
    }

    static async fetch(options?: PaginationOptions) {
        const limit = options?.limit ?? this.cursor.itemCount
        const page = options?.page ?? ++this.cursor.currentPage

        return await axios.get(
            `/api/v1/products?limit=${limit}&page=${page}`
        ).then((res) => res.data as PaginatedResponse<Product>)
    }

    static async get(id: number) {
        return await axios.get(
            `/api/v1/products/${id}`
        ).then((res) => res.data.data as Product)
    }

    static async add(data: any) {
        return await axios.post(
            '/api/v1/products', data, {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
            }
        ).then( response => response.data.data as Product )
    }

    static async update(id: number, data: any) {
        return await axios.post(
            `/api/v1/products/${id}`, 
            data, {
                headers: { ...headers, "Content-Type": "multipart/form-data" }
        })
    }

    static async delete(id: number) {
        return await axios.delete(
            `/api/v1/products/${id}`, { headers }
        )}
}