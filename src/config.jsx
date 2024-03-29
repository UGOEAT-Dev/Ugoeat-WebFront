
const modes = {
    local: 'http://localhost:8000',
    remote: 'https://api.ugoeatonline.com',
    currentMode: 'remote'
}
const config = {

    LARAVEL_BACKEND_URL: modes[modes.currentMode],
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

export { config }