
import useSession from "@/features/session/hooks/useSession";
import useCart from "@/features/cart/hooks/useCart";
import { emptyUser } from "@/features/common/types/User";


function useStoreContext()
{
    const { session, setToken, setUser } = useSession()
    const cartHelpers = useCart()
    const {user, token} = session ?? {user: emptyUser, token: ''}

    return {
        user, 
        token,
        setToken,
        setUser,
        ...cartHelpers
    }
}

export { useStoreContext }