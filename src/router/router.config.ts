
export const routesConfig = {

    routes: {

        app: {
            home: '/',
            about: '/about',
            products: '/products'
        },

        auth: {
            login: '/auth/login',
            register: '/auth/register',
            forgotPassword: '/auth/forgot-password',
            resetPassword: '/auth/reset-password',
            logout: '/logout'
        },

        dashboard: {
            index: '/dashboard/',
            home: '/dashboard/home',
            myOrders: '/dashboard/myOrders',
            orders: '/dashboard/orders',
            settings: '/dashboard/settings',
            profile: '/dashboard/profile',
            restaurants: '/dashboard/restaurants',
            customers: '/dashboard/customers',
            products: '/dashboard/products',
            stats: '/dashboard/stats',
            categories: '/dashboard/categories',
            payments: '/dashboard/payments'
        }
    },

    redirects: {
        dashboard: {
            index: '/dashboard/home'
        }
    }

}
