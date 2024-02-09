
function calculateTotal(products = [])
{
    let total = 0
    products.forEach(p => total += p.price * p.quantity )
    return total
}

export {
    calculateTotal
}