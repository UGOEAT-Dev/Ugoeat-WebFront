import {Input, InputProps} from "./Input";

export interface InputWithLabelProps extends InputProps
{
    label?: string,
    error?: string,
    success?: string
}

export function InputWithLabel({label, className, success, error, ...props}: InputWithLabelProps)
{
    return (
        <div className={"flex flex-col items-start space-y-0 " + className}>
            <label className={`font-bold`} htmlFor={props.id}>{label}</label>
            <Input className={`w-full py-2 ${error? 'input-error' : success ? 'input-success' : ''}`} {...props} />
            <span className={`${error ? 'error' : success ? 'success' : 'hidden'}  flex items-center gap-2 font-bold`}>
                {error ? <i className="pi pi-times"></i> : <i className="pi pi-check"></i> }
                {error || success}
            </span>
        </div>
    )
}

export default InputWithLabel