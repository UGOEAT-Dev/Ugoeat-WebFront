
function calculateTotal(products = [])
{
    let total = 0
    products.forEach(p => total += p.price * p.quantity )
    return total
}

function isUserLoggedIn(user, token = '')
{
    return (user !== null)
            && (Object.keys(user).length !== 0)
            && token
}

export {
    calculateTotal,
    isUserLoggedIn,
}