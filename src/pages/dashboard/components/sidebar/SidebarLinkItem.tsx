import {NavLink} from "react-router-dom";
import {PropsWithChildren, useContext} from "react";
import {SidebarContext} from "./SidebarContext.js";

interface SidebarLinkItemProps extends PropsWithChildren
{
    text: string,
    link: string,
    className?: string
}

function SidebarLinkItem({text, link, ...props}: SidebarLinkItemProps)
{
    const {mode} = useContext(SidebarContext)

    return (
        <li className={"sidebar-item cursor-pointer " + props.className}>
            <NavLink to={link} title={text} className={`rounded-full bg-gray-50 flex items-center gap-3 text-sm ${mode === 1 ? 'p-2 pl-5' : 'p-3'}`}>
                {props.children}
                <span className={`${mode === 2 ? 'hidden' : 'block'} `}>{text}</span>
            </NavLink>
        </li>
    )
}

export default SidebarLinkItem