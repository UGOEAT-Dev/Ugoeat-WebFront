import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function DashboardIndex()
{
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard/home')
    }, [])

    return (
        <div></div>
    )
}

export default DashboardIndex