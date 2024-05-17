import { configureStore } from "@reduxjs/toolkit"
import sessionReducer from "../session/sessionSlice"
import cartReducer from "../cart/cartSlice"

const store = configureStore({
    reducer: {
        session: sessionReducer,
        cart: cartReducer
    }
})

store.subscribe(() => {
    
    const state = store.getState()
    
    console.log('Saving store ...')
    
    if(state.session.value) {
        const {user, token} = state.session.value
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    localStorage.setItem('cart', JSON.stringify(state.cart.value))
    
    console.log('store.state', state)
})

export default store