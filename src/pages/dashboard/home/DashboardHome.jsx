import {useOutletContext} from "react-router-dom";
import {
    calculcateProfileCompletedPercentage,
    checkUserProfileComplete
} from "../../../lib/helpers.jsx";
import CustomerHome from "./components/CustomerHome.jsx";
import RestaurantHome from "./components/RestaurantHome.jsx";
import AdminHome from "./components/AdminHome.jsx";
import ProfileCompleteCheckerBox from "./components/ProfileCompleteCheckerBox.jsx";
import {useEffect, useState} from "react";

function DashboardHome()
{
    const {user} = useOutletContext()
    const {state, count} = checkUserProfileComplete(user)
    const percent = calculcateProfileCompletedPercentage(state, count)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(percent < 1)
    }, [percent])


    return (
        <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
            <div className="flex flex-col gap-5">
                <ProfileCompleteCheckerBox percent={percent} visible={visible} onHide={() => setVisible(false)} />
                {
                  (user.role === 'customer') ? <CustomerHome />
                      : (user.role === 'restaurant') ? <RestaurantHome />
                          : (user.role === 'admin') ? <AdminHome /> : <p>Error Role</p>
                }
            </div>
        </div>
    )

}

export default DashboardHome