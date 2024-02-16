import Input from "./Input.jsx";
import {BiCheck, BiError} from "react-icons/bi";

function InputWithLabel({label, name, value, type = "text", success, error, placeholder, id , className, onChange, ref, ...props})
{
    return (
        <div className={"flex flex-col items-start space-y-2 " + className}>
            <label className={`font-bold`} htmlFor={id}>{label}</label>
            <Input value={value} ref={ref} onChange={onChange} id={id} name={name} type={type} placeholder={placeholder} className={`w-full py-2 ${error? 'input-error' : success ? 'input-success' : ''}`} {...props} />
            <span className={`${error ? 'error' : success ? 'success' : 'hidden'}  flex items-center gap-2 font-bold`}>
                {error ? <BiError/> : <BiCheck /> }
                {error || success}
            </span>
        </div>
    )
}

export default InputWithLabel