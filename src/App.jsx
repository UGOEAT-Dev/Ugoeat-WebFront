
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import './scss/app.scss'
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";
import AppContext from "./AppContext.jsx";

export default function App()
{
    const [orders, setOrders] = useLocalStorage('orders',{ products: [] })

    return (
        <AppContext.Provider value={{orders, setOrders}}>
            <RouterProvider router={router}/>
        </AppContext.Provider>
    )

}