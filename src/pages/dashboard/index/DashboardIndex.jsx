import {useOutletContext} from "react-router-dom";

function DashboardIndex()
{
    const {user, token} = useOutletContext()

    return (
        <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
    )

}

export default DashboardIndex