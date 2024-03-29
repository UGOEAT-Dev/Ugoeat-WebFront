
function RoundedImage({size, ...props})
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