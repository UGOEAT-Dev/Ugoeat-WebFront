import {useContext} from "react";
import {SidebarContext} from "./SidebarContext.jsx";

function SidebarLinkGroup({name, ...props})
{
    const { mode } = useContext(SidebarContext)

    return (
        <ul className={"sidebar-group space-y-2 list-none " + props.className}>
            <div className={`${mode === 2 ? 'hidden' : 'block'} font-bold text-md`}>{name}</div>
            {props.children}
        </ul>
    )
}

export default SidebarLinkGroup