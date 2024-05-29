
const apiUrl = {
    dev: 'http://localhost:8000',
    prod: 'https://api.ugoeatonline.com'
}

export const config = {

    LARAVEL_BACKEND_URL: import.meta.env.DEV ? apiUrl.dev : apiUrl.prod,
    axios: {
        headers: {
            'Accept': 'application/json',
            /* 'User-Agent': 'XMLHttpRequest', */
        },
    },
    ugoeat: {
        tel: '237695889924',
        momo: {
            tel: '237 695889924',
            name: 'UgoEat Online'
        },
        om: {
            name: 'UgoEat Online',
            tel: '237 695889924'
        }
    }
}