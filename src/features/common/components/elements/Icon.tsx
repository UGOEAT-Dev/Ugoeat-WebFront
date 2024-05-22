import { ComponentProps, ReactNode } from "react";

export interface IconProps extends ComponentProps<'i'> 
{
    icon: string,
    size?: number,
    color?: string,
    children?: ReactNode 
}

export function Icon({icon, size = 16, className, color, ...props}: IconProps)
{
    return (
        <i 
            className={"pi " + icon + " " + className}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                color: color
            }} 
            {...props}>{props.children}</i>
    )
}