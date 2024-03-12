
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
import AdminCustomers from "./pages/dashboard/admin/customers/AdminCustomers.jsx";
import AdminRestaurants from "./pages/dashboard/admin/restaurants/AdminRestaurants.jsx";
import AdminOrders from "./pages/dashboard/admin/orders/AdminOrders.jsx";
import AdminCategories from "./pages/dashboard/admin/categories/AdminCategories.jsx";
import DashboardProducts from "./pages/dashboard/DashboardProducts.jsx";
import AdminStats from "./pages/dashboard/admin/stats/AdminStats.jsx";
import OrderDetails from "./pages/dashboard/orders/OrderDetails.jsx";
import DashboardOrdersLayout from "./pages/dashboard/orders/DashboardOrderLayout.jsx";
import Logout from "./pages/auth/Logout.jsx";

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
        path: '/logout',
        element: <Logout />
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
                element: <DashboardOrdersLayout />,
                children: [
                    {
                        path: '',
                        element: <DashboardOrders />
                    },
                    {
                        path: ':orderId',
                        element: <OrderDetails />
                    }
                ]
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
            },
            {
                path: 'customers',
                element: <AdminCustomers />
            },
            {
                path: 'restaurants',
                element: <AdminRestaurants />,
            },
            {
                path: 'orders_',
                element: <AdminOrders />
            },
            {
                path: 'categories',
                element: <AdminCategories />
            },
            {
                path: 'products',
                element: <DashboardProducts />
            },
            {
                path: 'stats',
                element: <AdminStats />
            }
        ]
    }
])

export default router;