import axios from "../../lib/axios";
import { User } from "../../types/User";

export class AccountService
{
    public static async get(token: string): Promise<User> {
        return await axios.get(
                '/api/v1/account', 
                { headers: { Authorization: `Bearer ${token}`}}
            ).then((res) => res.data.data as User )
    } 
}