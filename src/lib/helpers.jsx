
function calculateTotal(products = [])
{
    let total = 0
    products.forEach(p => total += p.price * p.quantity )
    return total
}

function isUserLoggedIn(user, token = '')
{
    return isUserObject(user) && token
}

function isUserObject(user)
{
    const obj = Object(user)
    return obj.hasOwnProperty('id')
            && obj.hasOwnProperty('name')
            && obj.hasOwnProperty('address')
            && obj.hasOwnProperty('image_url')
            && obj.hasOwnProperty('role')
            && obj.hasOwnProperty('tel')
            && obj.hasOwnProperty('email_verified_at')
}

function hasEmail(user) { return user.email && isUserObject(user) }

function hasId(user) { return user.id && isUserObject(user) }

function hasName(user) { return user.name && isUserObject(user) }

function hasAddress(user) { return user.address && isUserObject(user) }

function hasRole(user) { return user.role && isUserObject(user) }

function hasImage(user) { return user.image_url && isUserObject(user) }

function hasTel(user) { return user.tel && isUserObject(user) }


function checkUserProfileComplete(user)
{
    const callbacks = [
        hasId, hasEmail, hasTel, hasName,
        hasAddress, hasRole, hasImage
    ]
    const returns = Array(callbacks.length)
    callbacks.forEach((callback) => returns.push(callback(user)))

    return {
        state: returns.filter((v) => v === true ).length,
        count: callbacks.length,
        states: returns,
        conditions: callbacks
    }
}

function calculcateProfileCompletedPercentage(state, count)
{
    return state / count
}

export {
    calculateTotal,
    isUserLoggedIn,
    checkUserProfileComplete,
    calculcateProfileCompletedPercentage,
    hasImage,
    hasRole,
    hasAddress,
    hasName,
    hasTel,
    hasEmail,
    hasId
}