import { useEffect } from "react"
import { ErrorResponse, useRouteError } from "react-router-dom"

function ErrorBoundary({debug = true}: { debug?: boolean })
{
    const error = useRouteError() as ErrorResponse

    useEffect(() => {
        const backedTitle = document.title
        document.title = error.statusText
        //
        console.log(error)
        //
        return () => { 
            document.title = backedTitle
        }
    }, [error])

    return (
        <div className="h-screen bg-secondary text-white flex flex-col justify-center text-center gap-3">
            <div className="text-2xl uppercase">{error.status} | {error.statusText}</div>
            <div className={debug ? "block" : "hidden"}>{error.data}</div>
        </div>
    )
}

export default ErrorBoundary