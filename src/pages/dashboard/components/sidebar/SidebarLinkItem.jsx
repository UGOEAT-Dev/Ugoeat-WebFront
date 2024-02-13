import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {SidebarContext} from "./SidebarContext.jsx";

function SidebarLinkItem({text, link, ...props})
{
    const {mode} = useContext(SidebarContext)

    return (
        <li className={"sidebar-item cursor-pointer " + props.className}>
            <NavLink to={link} className={`rounded-full bg-gray-50 flex items-center gap-3 text-md ${mode === 1 ? 'p-3 pl-5' : 'p-3'}`}>
                {props.children}
                <span className={`${mode === 2 ? 'hidden' : 'block'}`}>{text}</span>
            </NavLink>
        </li>
    )
}

export default SidebarLinkItem