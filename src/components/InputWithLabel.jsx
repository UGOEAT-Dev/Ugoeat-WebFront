import Input from "./Input.jsx";

function InputWithLabel({label, name, type = "text", placeholder = "", id = null, className = "", onChange = null})
{
    return (
        <div className={"flex flex-col items-start space-y-2 " + className}>
            <label className="font-bold" htmlFor={id}>{label}</label>
            <Input onChange={onChange} id={id} name={name} type={type} placeholder={placeholder} className="w-full py-2" />
        </div>
    )
}

export default InputWithLabel