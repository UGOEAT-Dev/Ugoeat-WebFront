
import axios from '@/lib/axios/axios'
import {globalAxiosHeader as headers} from '@/lib/axios/headers.global'

export class StatsService
{

    static async getStats() {
        
        return await axios.get('/api/v1/stats', { headers }).then(r => r.data)
    }
}