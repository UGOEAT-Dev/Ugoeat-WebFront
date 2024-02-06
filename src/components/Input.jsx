
function Input({icon = null, onChange = null}, props)
{
    return (
        <div className="rounded-full mx-auto flex items-center bg-gray-200 w-[250px] p-1">
            {icon}
            <input type="text" placeholder={"search"} className="bg-transparent w-full mx-1 focus:outline-none"  onChange={onChange}/>
        </div>
    )
}

export default Input