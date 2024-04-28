
import {Outlet, createBrowserRouter} from 'react-router-dom';
import Root from './pages/Root';
import {AppLayout, AppHome, Order, About} from './pages/app/app.components'
import {Login, Logout, Register, ResetPassword, PasswordForgot, AuthLayout} from './pages/auth/auth.components'
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/home/DashboardHome';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import DashboardSettings from './pages/dashboard/settings/DashboardSetting';
import DashboardAccount from './pages/dashboard/account/DashboardAccount';
import ErrorBoundary from './pages/errors/ErrorBoundary';
import DashboardOrders from './pages/dashboard/orders/DashboardOrders';
import DashboardOrdersLayout from './pages/dashboard/orders/DashboardOrderLayout';
import OrderDetails from './pages/dashboard/orders/OrderDetails';
import DashboardPayments from './pages/dashboard/payments/DashboardPayments';
import AdminCategories from './pages/dashboard/admin/categories/AdminCategories';
import DashboardProducts from './pages/dashboard/DashboardProducts';
import AdminCustomers from './pages/dashboard/admin/customers/AdminCustomers';
import AdminRestaurants from './pages/dashboard/admin/restaurants/AdminRestaurants';
import AdminOrders from './pages/dashboard/admin/orders/AdminOrders';
import AdminStats from './pages/dashboard/admin/stats/AdminStats';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <AppLayout />,
                children: [
                    {
                        path: '',
                        element: <AppHome />
                    },
                    {
                        path: 'about',
                        element: <About />
                    },
                    {
                        path: 'order',
                        element: <Order />
                    }
                ]
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: 'forgot-password',
                        element: <PasswordForgot />
                    },
                    {
                        path: 'reset-password',
                        element: <ResetPassword />
                    }
                ]
            },
            {
                path: '/logout',
                element: <Logout />
            },
            {
                path: '/dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        path: '',
                        index: true,
                        element: <DashboardIndex />
                    },
                    {
                        path: 'home',
                        element: <DashboardHome />,
                    },
                    {
                        path: 'myorders',
                        element: <DashboardOrdersLayout />,
                        children: [
                            {
                                path: '',
                                index: true,
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
                        element: <DashboardAccount />,
                    },
                    {
                        path: 'settings',
                        element: <DashboardSettings />
                    },
                    // Admin Routes
                    {
                        path: 'products',
                        element: <DashboardProducts />
                    },
                    {
                        path: 'categories',
                        element: <AdminCategories />
                    },
                    {
                        path: 'customers',
                        element: <AdminCustomers />
                    },
                    {
                        path: 'restaurants',
                        element: <AdminRestaurants />
                    },
                    {
                        path: 'orders',
                        element: (<Outlet />),
                        children: [
                            {
                                path: '',
                                element: <AdminOrders />
                            },
                            {
                                path: ':orderId',
                                element: <OrderDetails />
                            }
                        ]
                    },
                    {
                        path: 'stats',
                        element: <AdminStats />
                    },
                ]
            }
        ],
        errorElement: <ErrorBoundary />
    },
])


export default router;