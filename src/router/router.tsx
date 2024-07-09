
import {Outlet, createBrowserRouter} from 'react-router-dom';
import Root from '@/pages/Root';
import {AppLayout, AppHome, Products, About} from '@/pages/app'
import {Login, Logout, Register, ResetPassword, PasswordForgot, AuthLayout} from '@/pages/auth'
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import DashboardHome from '@/pages/dashboard/home/DashboardHome';
import DashboardIndex from '@/pages/dashboard/DashboardIndex';
import DashboardSettings from '@/pages/dashboard/settings/DashboardSetting';
import DashboardAccount from '@/pages/dashboard/account/DashboardAccount';
import { ErrorBoundary } from '@/features/common/components';
import DashboardOrders from '@/pages/dashboard/orders/DashboardOrders';
import DashboardOrdersLayout from '@/pages/dashboard/orders/DashboardOrderLayout';
import OrderDetails from '@/pages/dashboard/orders/OrderDetails';
import DashboardPayments from '@/pages/dashboard/payments/DashboardPayments';
import AdminCategories from '@/pages/dashboard/admin/categories/AdminCategories';
import DashboardProducts from '@/pages/dashboard/DashboardProducts';
import AdminCustomers from '@/pages/dashboard/admin/customers/AdminCustomers';
import AdminRestaurants from '@/pages/dashboard/admin/restaurants/AdminRestaurants';
import AdminOrders from '@/pages/dashboard/admin/orders/AdminOrders';
import AdminStats from '@/pages/dashboard/admin/stats/AdminStats';
import SingleProductView from '@/pages/app/products/components/SingleProductView';
import { VerifyEmail, NotifyEmail } from '@/pages/email';


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
                        path: 'products',
                        element: <div className='sm:min-h-screen sm:pt-20 sm:px-5 mb-3'><Outlet /></div>,
                        children: [
                            {
                                path: '',
                                element: <Products />
                            },
                            {
                                path: ':productId',
                                element: <SingleProductView />
                            }
                        ]
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
                'path': '/email/verify',
                'element': <VerifyEmail />

            },
            {
                'path': '/email/notify',
                'element': <NotifyEmail />
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
                        element: null,
                        children: [
                            {
                                path: '',
                                index: true,
                                element: <DashboardProducts />
                            },
                            {
                                path: ':productId',
                                element: <p>Single Product View</p>
                            }
                        ]
                    },
                    {
                        path: 'categories',
                        element: null,
                        children: [
                            {path: '', element: <AdminCategories />},
                            {
                                path: ':categoryId',
                                element: <p>Single Category View</p>
                            }
                        ]
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