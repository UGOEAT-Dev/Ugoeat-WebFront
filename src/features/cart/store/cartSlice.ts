import { createSlice } from "@reduxjs/toolkit";
import { Cart, ICart } from "@/features/cart/types/Cart";
import { ProductOrdered } from "@/features/common/types/Product";

const getCartFromStorage = () => {
    const cart = localStorage.getItem('cart')
    let products: ProductOrdered[] = []
    if(cart) {
        const cartObj = JSON.parse(cart)
        if(new Object(cartObj).hasOwnProperty('products')) {
            products = cartObj.products
        }
    }

    return { products }
}

const initialState: { value: ICart } = {
    value: getCartFromStorage()
}

const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {

        addProduct: (state, action) => {
            const {product, count} = action.payload
            const cart = new Cart(state.value.products)
            state.value = toICart(cart.addProduct(product, count))
        },

        removeProduct: (state, action) => {
            const {product, count} = action.payload
            const cart = new Cart(state.value.products)
            state.value = toICart(cart.removeProduct(product, count))
        },

        removeAll: (state) => {
            const cart = new Cart(state.value.products)
            state.value = toICart(cart.removeAll())
        },

        setProducts: (state, action) => {
            state.value = toICart(new Cart(action.payload as ProductOrdered[]))
        }

    }
})

const toICart = (cart: Cart) : ICart => {
    return {
        products: cart.products
    }
}

export const { addProduct, removeProduct, removeAll, setProducts } = cartSlice.actions

export const CartSelector = (state: any) => state.cart.value as ICart

export default cartSlice.reducer