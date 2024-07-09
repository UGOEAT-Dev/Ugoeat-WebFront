
import { PropsWithChildren } from "react"

type CardProps = PropsWithChildren<{
    className?: string
}>

function Card({children, className}: CardProps)
{
    return (
        <div className={`bg-white mx-auto rounded-md w-10/12 md:w-8/12 scroll-py-5 p-3 shadow-lg ${className}`}>
            {children}
        </div>
    )
}


export default Card
