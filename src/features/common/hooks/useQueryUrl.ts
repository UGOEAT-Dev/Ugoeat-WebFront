import queryString from "query-string"
import { useLocation } from "react-router-dom"

function useQueryUrl()
{
    const location = useLocation()
    const query = queryString.parse(location.search)

    return { ...query }
}

export default useQueryUrl