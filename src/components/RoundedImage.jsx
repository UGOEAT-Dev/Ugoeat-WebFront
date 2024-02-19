
function RoundedImage({size, ...props})
{
    return (
        <div className={`overflow-hidden flex items-center w-[${size}px] h-[${size}px] rounded-full border align-middle`}>
            <img {...props} className="h-full" />
        </div>
    )
}

export default RoundedImage