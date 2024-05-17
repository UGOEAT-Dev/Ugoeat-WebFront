import { User } from "./User";

export interface Session 
{
    user: User,
    token: string
}

export interface SessionProps extends Session { }

export class SessionImpl implements Session
{

    user: User
    token: string

    constructor({user, token}: SessionProps) {
        this.user = user
        this.token = token
    }
    
}