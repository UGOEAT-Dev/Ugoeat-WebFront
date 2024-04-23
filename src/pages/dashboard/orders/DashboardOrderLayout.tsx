import {Outlet} from "react-router-dom";

function DashboardOrdersLayout()
{
    return (
        <>
            <h1 className="text-2xl font-bold">Mes Commandes</h1>
            <Outlet />
        </>
    )
}



export default DashboardOrdersLayout