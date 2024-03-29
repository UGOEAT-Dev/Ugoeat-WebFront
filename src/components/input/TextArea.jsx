import {BiCheck, BiError} from "react-icons/bi";
import {useId} from "react";

function TextArea({label, name, value, success, error, placeholder, className, onChange, ref, ...props})
{
    const id = useId()
    return (
        <div className={"flex flex-col items-start space-y-2 " + className}>
            <label className={`font-bold`} htmlFor={id}>{label}</label>
            <textarea
                value={value} ref={ref} onChange={onChange}
                id={id} name={name} placeholder={placeholder}
                className={`rounded flex items-center bg-gray-100 min-h-[100px] min-w-[250px] w-full h-full p-1 ${error? 'input-error' : success ? 'input-success' : ''}`} {...props} />
            <span className={`${error ? 'error' : success ? 'success' : 'hidden'}  flex items-center gap-2 font-bold`}>
                {error ? <BiError/> : <BiCheck /> }
                {error || success}
            </span>
        </div>
    )
}

export default TextArea