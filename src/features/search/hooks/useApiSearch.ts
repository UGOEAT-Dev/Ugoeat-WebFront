import { MutationOptions, useMutation } from "@tanstack/react-query";
import { SearchOptions } from "../types/SearchOptions";
import { SearchService } from "../services/search.service";
import { SearchResult } from "../types/SearchResult";

export default function useApiSearch()
{
    const mutator = useMutation({
        mutationKey: ['/api/v1/search'],
        mutationFn: async (options: SearchOptions) => SearchService.search(options),
    })


    const apiSearch = (param: SearchOptions, options?: MutationOptions<SearchResult, Error, SearchOptions>)  => { 

        mutator.mutate(param, options)
    }

    return {
        apiSearch,
        ...mutator
    }
}