import {Link} from "react-router-dom";

function Card({className, title, number, icon, link, text})
{
    return (
        <div className={`bg-white rounded-md p-5 shadow-md w-fit ${className} hover:scale-105`}>
            <div className="flex items-start justify-between gap-5 w-full">
                <h3 className="text-lg capitalize">{title}</h3>
                <span className="py-2 px-3 rounded bg-blue-300 text-xl text-blue-600"><i className={`${icon} scale-150`}></i></span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-2xl">{number}</span>
                <Link to={link}>{text}</Link>
            </div>
        </div>
    )
}

export default Card