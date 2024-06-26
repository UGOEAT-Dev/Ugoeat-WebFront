import { ComponentProps } from "react"

interface SelectBoxProps extends ComponentProps<'select'>
{
    label?: string
}

function SelectBox({id, name, label, className, ...props}: SelectBoxProps)
{
    return (
        <div className={"flex flex-col gap-2 " + className }>
            <label htmlFor={id} className="font-bold">{label}</label>
            <select name={name} id={id} className="p-2 rounded bg-gray-100" {...props}>
                {props.children}
            </select>
        </div>
    )
}

export default SelectBox