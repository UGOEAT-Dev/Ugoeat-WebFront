import {useContext, useEffect, useState} from "react";
import AppContext from "../../../../AppContext.jsx";
import UsersListView from "../../components/UsersListView.jsx";
import getRestaurants from "../../../../api/restaurants/getRestaurants.jsx";

function AdminRestaurants({...props})
{
    const {user, token} = useContext(AppContext)
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getRestaurants(token).then(r => setRestaurants(r.data.data))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold">Restaurants</h1>
            <UsersListView users={restaurants}/>
        </div>
    )
}

export default AdminRestaurants

