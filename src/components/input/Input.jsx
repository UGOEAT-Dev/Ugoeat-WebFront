
function Input({ref, id, name, value, placeholder = "", type = "text", icon = null, className = "", onChange = null, ...props})
{
    return (
        <div className={"rounded flex items-center bg-gray-100 w-[250px] p-1 " + className}>
            {icon}
            <input ref={ref} id={id} name={name} value={value} type={type} placeholder={placeholder} className="bg-transparent w-full mx-1 focus:outline-none" onChange={onChange} {...props} />
        </div>
    )
}

export default Input