import { Session, SessionImpl, SessionProps } from "../types/Session";
import { User } from "@/features/common/types/User";


export function getSessionFromStorage(): Session | undefined
{
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if(user && token) return {
        token, user: JSON.parse(user) as User
    } as Session

    return undefined
}

export class SessionService 
{
    public static session?: Session = getSessionFromStorage()

    public static hasSession(): boolean { return this.session !== undefined }

    public static create(props: SessionProps): void {
        if(this.hasSession()) return; 

        this.session = new SessionImpl(props)
    }

    static update(props: SessionProps): void {

        if(!this.session) return; 

        if(props.token !== this.session.token)
        {
            this.session.token = props.token
            localStorage.setItem('token', props.token)
        }
        if(props.user !== this.session.user)
        {
            this.session.user = props.user
            localStorage.setItem('user', JSON.stringify(props.user))
        }
    }

    public static delete(): void { 
        this.session = undefined 
        localStorage.clear()
    }

}
