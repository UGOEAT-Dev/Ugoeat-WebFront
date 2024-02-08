import Input from "./Input.jsx";
import {BiCheck, BiError} from "react-icons/bi";

function InputWithLabel({label, name, type = "text", success = null, error = null, placeholder = "", id = null, className = "", onChange = null})
{
    return (
        <div className={"flex flex-col items-start space-y-2 " + className}>
            <label className={`font-bold`} htmlFor={id}>{label}</label>
            <Input onChange={onChange} id={id} name={name} type={type} placeholder={placeholder} className={`w-full py-2 ${error? 'input-error' : success ? 'input-success' : ''}`} />
            <span className={`${error ? 'error' : success ? 'success' : 'hidden'}  flex items-center gap-2 font-bold`}>
                {error ? <BiError/> : <BiCheck /> }
                {error || success}
            </span>
        </div>
    )
}

export default InputWithLabel