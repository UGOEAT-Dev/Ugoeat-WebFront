
import { useId } from "react"

function useGenerateId(prefix = '')
{
    let id = useId()
    while(id.indexOf(':') !== -1)
        id = id.replace(':', '_')
    
    return prefix + id
}

export default useGenerateId