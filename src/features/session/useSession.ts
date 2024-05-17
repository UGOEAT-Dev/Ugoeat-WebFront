
import { useDispatch, useSelector } from "react-redux"
import { SessionProps } from "../../core/types/Session"
import { SessionSelector, createSession, deleteSession, setToken, setUser } from "./sessionSlice"
import { User } from "../../core/types/User"

function useSession()
{
    const session = useSelector(SessionSelector)
    const dispatch = useDispatch()

    return {
        session,

        createSession: (props: SessionProps) => {
            dispatch(createSession(props)) 
        },
        
        deleteSession: () => {
            dispatch(deleteSession()) 
        },

        setToken: (token: string) => {
            dispatch(setToken(token)) 
        },

        setUser: (user: User) => {
            dispatch(setUser(user))
        }
    }
}

export default useSession