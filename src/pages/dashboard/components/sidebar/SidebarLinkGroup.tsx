import {PropsWithChildren, useContext} from "react";
import {SidebarContext} from "./SidebarContext.js";

interface SidebarLinkGroupProps extends PropsWithChildren
{
    name: string, 
    className?: string
}

function SidebarLinkGroup({name, ...props}: SidebarLinkGroupProps)
{
    const { mode } = useContext(SidebarContext)

    return (
        <ul className={"sidebar-group space-y-2 list-none " + props.className}>
            <div className={`${mode === 2 ? 'hidden' : 'block'} font-bold text-sm`}>{name}</div>
            {props.children}
        </ul>
    )
}

export default SidebarLinkGroup