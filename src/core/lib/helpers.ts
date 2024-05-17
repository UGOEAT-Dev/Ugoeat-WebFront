import { SessionService } from "../services/session.service"
import { User, UserRole } from "../types/User"

function calculateTotal(products: ProductOrdered[])
{
    let total = 0
    products.forEach(p => total += (p.price ?? 0) * p.quantity )
    return total
}

function formatAmount(amount?: number)
{
    const reversed = String(amount).split('').reverse()
    const formatedArray = reversed.map((e, i) => {
        return (i>0 && i%3 === 0) ? `${e},` : e
    }).reverse()
    return formatedArray.join('')
}

function isUserLoggedIn()
{
    return SessionService.hasSession()
}

function isUserObject(user:User)
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

function hasEmail(user: User) { return user.email && isUserObject(user) }

function hasId(user: User) { return user.id && isUserObject(user) }

function hasName(user: User) { return user.name && isUserObject(user) }

function hasAddress(user: User) { return user.address && isUserObject(user) }

function hasRole(user: User) { return user.role && isUserObject(user) }

function hasImage(user: User) { return user.image_url && isUserObject(user) }

function hasTel(user: User) { return user.tel && isUserObject(user) }


function checkUserProfileComplete(user: User)
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

function calculcateProfileCompletedPercentage(state: number, count: number)
{
    return state / count
}

const _getScale = (x: number, y: number) => ((x/y) >= 1 ? 1 : x/y)

const getScreenWidthScale = (n: number) => _getScale(window.innerWidth, n)

const  getScreenHeightScale = (n: number) => _getScale(window.innerHeight, n)

const parseUserRole = (role: UserRole) => {
    switch (String(role).toLowerCase())
    {
        case 'customer':
            return 'Client'
        case 'restaurant' || 'admin':
            return role
        default:
            return 'NULL'
    }
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
    hasId,
    getScreenWidthScale,
    getScreenHeightScale,
    formatAmount,
    parseUserRole
}