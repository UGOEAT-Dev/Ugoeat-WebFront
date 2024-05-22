import axios from "@/lib/axios/axios";
import { globalAxiosHeader as headers } from "@/lib/axios/headers.global"
import { User } from "@/features/common/types/User";

export class AccountService
{
    static async get(token: string): Promise<User> {
        return await axios.get(
                '/api/v1/account', 
                { headers: { Authorization: `Bearer ${token}`}}
            ).then(response => response.data.data as User )
    }

    static async update(data: any, formData: boolean = false) {
        return await axios.post(
            '/api/v1/account', data, 
            { headers: { ...headers, "Content-Type": formData ? "multipart/form-data" : "application/json" }}
        ).then(response => response.data.data as User )
    }
} 