
import { useDispatch, useSelector } from "react-redux"
import { CartSelector, addProduct, removeAll, removeProduct, setProducts } from "../store/cartSlice"

function useCart()
{
    const cart = useSelector(CartSelector)
    const dispatch = useDispatch()
    
    return {
        cart,

        addProduct: (product: Product, count: number = 1) => {
            dispatch(addProduct({product, count}))
        },
        
        removeProduct: (product: Product, count: number = 1) => {
            dispatch(removeProduct({product, count}))
        },
        
        removeAll: () => {
            dispatch(removeAll())
        },

        setProducts: (products: ProductOrdered[]) => {
            dispatch(setProducts(products))
        }
    }
}

export default useCart