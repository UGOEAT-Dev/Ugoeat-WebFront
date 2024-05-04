import { useState } from "react"
import { Cart } from "../types/Cart"

function useCart(key: string = 'cart')
{
    const [cart, setCart] = useState<Cart>(() => {
        const json = localStorage.getItem(key)
        if(json) {
            const jsonObj = JSON.parse(json)
            return new Cart(jsonObj.products ?? [])
        }
        return new Cart()
    })


    return [
        cart, 
        (cart: Cart) => {
            setCart(Cart.copy(cart))
            localStorage.setItem(key, JSON.stringify(cart))
        }
    ]
}

export default useCart