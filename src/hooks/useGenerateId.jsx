
import { useId } from "react"

function useGenerateId(prefix = '')
{
    let id = useId().replaceAll(':', '_')
    return prefix + id
}

export default useGenerateId