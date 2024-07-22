import axios from "@/lib/axios/axios";
import { PaginationOptions } from "../types/options/PaginationOption";
import { Cursor, defaultCursor } from "../types/pagination/Cursor";
import { Category } from "../types/Category";

export class CategoryService
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
            `/api/v1/categories?limit=${limit}&page=${page}`
        ).then((res) => res.data as PaginatedResponse<Category>)
    }

    static async get(id: number|string) {
        return await axios.get(
            `/api/v1/categories/${id}`
        ).then((res) => res.data.data as Category)
    }
    
}