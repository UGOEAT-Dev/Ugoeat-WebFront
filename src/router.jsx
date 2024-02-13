
import {createBrowserRouter} from 'react-router-dom';
import Home from "./pages/home/Home.jsx";
import Root from "./pages/root/Root.jsx";
import About from "./pages/about/About.jsx";
import Order from "./pages/order/Order.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import DashboardHome from "./pages/dashboard/home/DashboardHome.jsx";
import DashboardOrders from "./pages/dashboard/orders/DashboardOrders.jsx";
import DashboardPayments from "./pages/dashboard/payments/DashboardPayments.jsx";
import DashboardAccount from "./pages/dashboard/account/DashboardAccount.jsx";
import DashboardSettings from "./pages/dashboard/settings/DashboardSetting.jsx";
import DashboardIndex from "./pages/dashboard/DashboardIndex.jsx";

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
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <DashboardIndex/>
            },
            {
                path: 'home',
                element: <DashboardHome />,
            },
            {
                path: 'orders',
                element: <DashboardOrders />
            },
            {
                path: 'payments',
                element: <DashboardPayments />
            },
            {
                path: 'profile',
                element: <DashboardAccount />
            },
            {
                path: 'settings',
                element: <DashboardSettings />
            }
        ]
    }
])

export default router;