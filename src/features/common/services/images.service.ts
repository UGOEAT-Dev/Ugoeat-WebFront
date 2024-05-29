import axios from "@/lib/axios/axios";
import { globalAxiosHeader } from "@/lib/axios/headers.global";

export class ImageService
{
    static async get() {

    }

    static async store(data: any) {
        return await axios.post(
            '/api/v1/images', data, 
            {headers: {
                ...globalAxiosHeader, 
                "Content-Type": "multipart/form-data"
            }}
        ).then(response => response.data as void)
    }
}