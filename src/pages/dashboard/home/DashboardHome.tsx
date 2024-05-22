
import {
    calculcateProfileCompletedPercentage,
    checkUserProfileComplete
} from "../../../lib/helpers";
import CustomerHome from "./components/CustomerHome";
import RestaurantHome from "./components/RestaurantHome";
import AdminHome from "./components/AdminHome";
import ProfileCompleteCheckerBox from "./components/ProfileCompleteCheckerBox";
import {useEffect, useState} from "react";
import { useStoreContext } from "../../../features/store/hooks/useStoreContext";

function DashboardHome()
{
    const {user} = useStoreContext()
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
                  (user?.role === 'customer') ? <CustomerHome />
                      : (user?.role === 'restaurant') ? <RestaurantHome />
                          : (user?.role === 'admin') ? <AdminHome /> : <p>Error Role</p>
                }
            </div>
        </div>
    )

}

export default DashboardHome