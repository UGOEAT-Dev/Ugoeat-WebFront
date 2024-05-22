import { ComponentProps } from "react"

export interface InputProps extends ComponentProps<'input'>
{
    icon?: string
}

export function Input({icon, className, ...props}: InputProps)
{
    return (
        <div className={"rounded flex items-center bg-gray-100 w-[250px] p-1 " + className}>
            <i className={`${icon}`}></i>
            <input className="bg-transparent w-full mx-1 focus:outline-none" {...props} />
        </div>
    )
}
