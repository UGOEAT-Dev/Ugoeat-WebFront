
type BannerCardItemProps = {
    image?: string,
    text?: string,
    className?: string
}

function BannerCardItem({image, text, className} : BannerCardItemProps)
{
    return (
        <div className={"relative flex items-center p-1 pl-3 rounded w-[230px] bg-white text-black space-x-5 " + className}>
            <img src={image} alt="" width="50px"/>
            <span style={{
                fontSize: "0.75rem"
            }}>{text}</span>
        </div>
    )
}

export default BannerCardItem;