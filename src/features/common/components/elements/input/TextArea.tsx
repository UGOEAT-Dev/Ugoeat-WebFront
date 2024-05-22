import {ComponentPropsWithRef } from "react"
import useGenerateId from "../../../hooks/useGenerateId"
import { Icon } from "../Icon"

interface TextAreaProps extends ComponentPropsWithRef<'textarea'>
{
    label?: string,
    success?: string,
    error?: string,
}

function TextArea({label, success, error, className, ...props}: TextAreaProps)
{
    const id = props.id ?? useGenerateId('textarea')
    return (
        <div className={"flex flex-col items-start space-y-2 " + className}>
            <label className={`font-bold`} htmlFor={id}>{label}</label>
            <textarea
                id={id}
                className={`rounded flex items-center bg-gray-100 min-h-[100px] min-w-[250px] w-full h-full p-1 ${error? 'input-error' : success ? 'input-success' : ''}`} {...props} />
            <span className={`${error ? 'error' : success ? 'success' : 'hidden'}  flex items-center gap-2 font-bold`}>
                <Icon icon={error ? "pi-error" : "pi-check"} />
                {error || success}
            </span>
        </div>
    )
}

export default TextArea