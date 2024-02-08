
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import './scss/app.scss'

export default function App()
{
    window.order = { products: [] }

    return <RouterProvider router={router}/>
}