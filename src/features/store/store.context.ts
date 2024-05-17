
import useSession from "../session/useSession";
import useCart from "../cart/useCart";
import { emptyUser } from "../../core/types/User";


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