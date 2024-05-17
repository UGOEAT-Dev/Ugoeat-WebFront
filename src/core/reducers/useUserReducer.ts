
import { useReducer } from "react";
import { User, emptyUser } from "../types/User";

export enum UserActionType {
    SET_ID,
    SET_NAME,
    SET_EMAIL,
    SET_ROLE,
    SET_PASSWORD,
    SET_PASSWORDCONFIRMATION,
} 

export interface UserAction
{
    type: UserActionType,
    data: any
}

export interface UserState extends User
{
    password?: string,
    password_confirmation?: string
}

export function userReducer(state: UserState, action: UserAction): UserState
{
    const {type, data} = action
    switch(type) {
        case UserActionType.SET_NAME:
            return {
                ...state, 
                name: data
            };
        case UserActionType.SET_ID:
            return {
                ...state, 
                id: data
            };
        case UserActionType.SET_EMAIL:
            return {
                ...state, 
                email: data
            };
        case UserActionType.SET_ROLE:
            return {
                ...state, 
                role: data
            };
        case UserActionType.SET_PASSWORD:
            return {
                ...state, 
                password: data
            };
        case UserActionType.SET_PASSWORDCONFIRMATION:
            return {
                ...state, 
                password_confirmation: data
            };
        default:
            return state

    }
}

function useUserReducer(initialState: UserState = emptyUser)
{
    const [state, dispatch] = useReducer(userReducer, initialState)

    return {
        state,

        setEmail: (email: string) => dispatch({type: UserActionType.SET_EMAIL, data: email}),

        setName: (name: string) => dispatch({type: UserActionType.SET_NAME, data: name}),

        setRole: (role: string) => dispatch({type: UserActionType.SET_ROLE, data: role}),

        setPassword: (password: string) => dispatch({type: UserActionType.SET_PASSWORD, data: password}),

        setPasswordConfirmation: (passwordConfirmation: string) => dispatch({type: UserActionType.SET_PASSWORDCONFIRMATION, data: passwordConfirmation}),

        setId: (id: number) => dispatch({type: UserActionType.SET_ID, data: id})
    }
}

export default useUserReducer