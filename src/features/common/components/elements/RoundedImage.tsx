import { ComponentProps } from "react"

interface RoundedImageProps extends ComponentProps<'img'>
{
    size: number
}

function RoundedImage({size, ...props}: RoundedImageProps)
{
    return (
        <div
            className={`overflow-hidden flex items-center rounded-full border align-middle`}
            style={{
                width: `${size}px`,
                height: `${size}px`
            }}
        >
            <img {...props} className="h-full" />
        </div>
    )
}

export default RoundedImage