import {useOutletContext} from "react-router-dom";

function DashboardHome()
{
    const {user, token} = useOutletContext()

    return (
        <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
        </div>
    )

}

export default DashboardHome