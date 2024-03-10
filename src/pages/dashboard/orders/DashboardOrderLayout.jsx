import {Outlet} from "react-router-dom";

function DashboardOrdersLayout()
{
    return (
        <>
            <h1 className="text-2xl font-bold">Mes Commandes</h1>
            <Outlet context={{parseOrderState, getSeverityFromOrderState}}/>
        </>
    )
}

function parseOrderState(state)
{
    return String(state).toUpperCase()
}

function getSeverityFromOrderState(state)
{
    switch (String(state).toLowerCase())
    {
        case 'sent':
            return 'info'
        case 'accepted':
            return 'success'
        default:
            return 'danger'
    }
}


export default DashboardOrdersLayout