
export default function BodyHidder({className = "", ...props})
{
    return (
        <div className={"z-50 fixed bg-black bg-opacity-50 w-full h-full top-0 text-white " + className} {...props} >
            {props.children}
        </div>
    )
}