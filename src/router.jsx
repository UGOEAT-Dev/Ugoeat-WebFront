
import {createBrowserRouter} from 'react-router-dom';
import Home from "./pages/home/Home.jsx";
import Root from "./pages/root/Root.jsx";
import About from "./pages/about/About.jsx";
import Order from "./pages/order/Order.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'order',
                element: <Order />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    }
])

export default router;