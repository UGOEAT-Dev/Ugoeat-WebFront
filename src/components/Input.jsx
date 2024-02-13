
function Input({ref, id, name, placeholder = "", type = "text", icon = null, className = "", onChange = null})
{
    return (
        <div className={"rounded flex items-center bg-gray-100 w-[250px] p-1 " + className}>
            {icon}
            <input ref={ref} id={id} name={name} type={type} placeholder={placeholder} className="bg-transparent w-full mx-1 focus:outline-none" onChange={onChange} />
        </div>
    )
}

export default Input