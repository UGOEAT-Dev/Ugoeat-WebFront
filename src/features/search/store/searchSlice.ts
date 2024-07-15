import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const searchSlice = createSlice({
    name: 'showSearchDialog',
    initialState,
    reducers: {
        setShowSearchDialog: (state, action) => {
            if(state === action.payload) return;

            return action.payload as boolean
        }
    }
})

export const { setShowSearchDialog } = searchSlice.actions

export const ShowSearchDialogSelector = (state: any) => state.showSearchDialog as boolean

export default searchSlice.reducer