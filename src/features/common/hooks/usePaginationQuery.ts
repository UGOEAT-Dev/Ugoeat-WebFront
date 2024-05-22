
import useQueryUrl from "./useQueryUrl"

function usePaginationQuery()
{
    const { limit, page } = useQueryUrl()
    const paginationQuery = { limit: 10, page: 1 }    

    if( limit )
        paginationQuery.limit = parseInt(limit as string)

    if(page)
        paginationQuery.page = parseInt(page as string)

    return paginationQuery
}

export default usePaginationQuery