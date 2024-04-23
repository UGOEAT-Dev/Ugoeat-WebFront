import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { routesConfig } from "../../router.config";

function DashboardIndex()
{
    const navigate = useNavigate()
    const {redirects} = routesConfig

    useEffect(() => {
        navigate(redirects.dashboard.index)
    }, [])

    return (
        <div></div>
    )
}

export default DashboardIndex