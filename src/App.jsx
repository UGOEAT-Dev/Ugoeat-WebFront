
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import './scss/app.scss'
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
import AppContext from "./AppContext.jsx";
import {useEffect} from "react";

export default function App()
{
    const [orders, setOrders] = useLocalStorage('orders',{ products: [] })
    const [user, setUser] = useLocalStorage('user', {})
    const [token, setToken] = useLocalStorage('token', '')

    /* remove the user from storage when the app is closed
    useEffect(() => {
        return () => setUser({})
    }, [])
     */
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