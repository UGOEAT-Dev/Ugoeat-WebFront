
import axios from '@/lib/axios/axios'
import { SearchOptions } from '../types/SearchOptions';
import { SearchResult } from '../types/SearchResult';

export class SearchService
{
    static async search({query, tag}: SearchOptions): Promise<SearchResult> 
    {
        return await axios
                .get([
                    `/api/v1/search?query=${query}`, 
                    tag ? `&tag=${tag}` : ''
                ].join(''))
                .then(response => response.data as SearchResult)
    }
}