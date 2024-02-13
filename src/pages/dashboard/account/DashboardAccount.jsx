import {useOutletContext} from "react-router-dom";

function DashboardAccount()
{
    const {user, token} = useOutletContext()

    return (
        <div>
            <h1 className="text-2xl font-bold">Mon Compte</h1>
        </div>
    )

}

export default DashboardAccount