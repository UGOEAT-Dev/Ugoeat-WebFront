import {useOutletContext} from "react-router-dom";

function DashboardPayments()
{
    const {user, token} = useOutletContext()

    return (
        <div>
            <h1 className="text-2xl font-bold">Mes Payements</h1>
        </div>
    )

}

export default DashboardPayments