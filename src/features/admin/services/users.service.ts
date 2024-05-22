import { UserRole } from "@/features/common/types/User";
import { PaginationOptions } from "@/features/common/types/options/PaginationOption";
import axios from "@/lib/axios/axios";
import { globalAxiosHeader as headers } from "@/lib/axios/headers.global";

export class UserService 
{
    protected static async getUsers<T>(role: UserRole, options: PaginationOptions = {page: 1, limit: 10}) {
        return await axios.get(
            `/api/v1/${role}s?limit=${options.limit}&page=${options.page}`,
            { headers }
        ).then(response => response.data as PaginatedResponse<T>)
    }
}