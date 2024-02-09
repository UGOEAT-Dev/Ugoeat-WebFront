
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import './scss/app.scss'
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
import AppContext from "./AppContext.jsx";

export default function App()
{
    const [orders, setOrders] = useLocalStorage('orders',{ products: [] })
    const [user, setUser] = useLocalStorage('user', {})
    const [token, setToken] = useLocalStorage('token', '')

    return (
        <AppContext.Provider value={{
            orders,
            user,
            token,
            setOrders,
            setUser,
            setToken
        }}>
            <RouterProvider router={router}/>
        </AppContext.Provider>
    )

}