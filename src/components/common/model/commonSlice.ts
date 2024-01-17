import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Statuses} from "../../../types";
type CommonInitialDtateType = {
    status: Statuses
    error: null | string
}
const initialState: CommonInitialDtateType = {
    status: Statuses.IDLE as Statuses,
    error: null as null | string
}

const slice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<{ status: Statuses }>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        }
    }
})

export const commonSlice = slice.reducer
export const commonActions = slice.actions