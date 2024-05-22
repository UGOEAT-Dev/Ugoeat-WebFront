
import axios from "@/lib/axios/axios";
import { globalAxiosHeader as headers } from "@/lib/axios/headers.global";


export interface LoginProps {
    email: string,
    password: string
}

export interface RegisterProps extends LoginProps {
    name: string,
    role: string,
    password_confirmation: string,
}

export interface SignoutProps extends LoginProps {
    password_confirmation: string
}

export class AuthService
{
    static async login(data: LoginProps) {
        return await axios.post('/api/auth/login', data)
    }

    static async register(data: RegisterProps) {
        return await axios.post('/api/auth/register', data)
    }

    static async logout(token: string) {
        return await axios.post('/api/auth/logout', null, { headers: {Authorization: `Bearer ${token}`} })
    }

    static async signout(data: SignoutProps) {
        return await axios.post('/api/auth/signout', data, { headers })
    }
}
