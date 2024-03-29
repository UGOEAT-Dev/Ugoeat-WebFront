import {useOutletContext} from "react-router-dom";

function DashboardSettings()
{
    const {user, token} = useOutletContext()

    return (
        <div>
            <h1 className="text-2xl font-bold">Parametres</h1>
        </div>
    )

}

export default DashboardSettings