import {Outlet} from "react-router-dom";

/**
 * Represent The base of the web Application
 */
export default function Root()
{
    return <>
        <h1>UgoEat</h1>
        <div><Outlet/></div>
    </>
}
