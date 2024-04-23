
interface CustomerAdviceCardProps
{
    image?: string,
    name?: string,
    advice?: string,
    starCount?: number,
    className?: string
}

export default function CustomerAdviceCard({image, name, advice, starCount, className}: CustomerAdviceCardProps)
{
    return (
        <div className={`relative rounded-2xl p-5 shadow-2xl box-content bg-white ${className}`}>
            <img src={image} alt={""} className="rounded-full"/>
            <h3 className="text-2xl font-bold">{name}</h3>
            <p>{advice}</p>
            <div>
                {new Array(5).fill(0).map((_, i) => {
                    const color = ((starCount?? 0) - i) > 0 ? "text-green" : "text-gray-300"
                    return (
                        <i key={i} className={`pi pi-star-fill w-4 h-4 ${color} ms-1 inline-block`}></i>
                    )
                })}
            </div>
        </div>
    )
}