import { createSlice } from "@reduxjs/toolkit";
import { SessionService, getSessionFromStorage } from "../../core/services/session.service";
import { Session } from "../../core/types/Session";


const initialState: { value?: Session } = {
    value: getSessionFromStorage()
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        createSession: (state, action) => {
            if(state.value) return;

            state.value = action.payload
            SessionService.create(action.payload)
        },
        setUser: (state, action) => {
            if(!state.value) return; 
            state.value = { ...state.value, user: action.payload}
            SessionService.update(state.value)
        },
        setToken: (state, action) => {
            if(!state.value) return; 
            state.value = { ...state.value, token: action.payload}
            SessionService.update(state.value)
        },
        deleteSession: state => {
            state.value = undefined
            SessionService.delete()
        }
    }
})

export const { createSession, deleteSession, setUser, setToken } = sessionSlice.actions

export const SessionSelector = (state: any) => state.session.value as Session | undefined

export default sessionSlice.reducer