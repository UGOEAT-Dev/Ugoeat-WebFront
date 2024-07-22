import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function Error404({debug = true}: { debug?: boolean })
{
    const location = useLocation()
    

    useEffect(() => {
        const backedTitle = document.title
        document.title = 'Page not found | UGOEAT'

        return () => { document.title = backedTitle }
    }, [])

    return (
        <div className="h-screen flex flex-col justify-center text-center gap-3">
            <div className="text-2xl uppercase font-bold">404 | Not Found</div>
            <div className={debug ? "block" : "hidden"}>The Page <span>{location.pathname}</span> is not found.</div>
        </div>
    )
}

export default Error404