import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginThunks} from "./loginThunks";

const slice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        isInit: false
    },
    reducers: {
        isInitialized: (state, action: PayloadAction<{isInit: boolean}>) => {
            state.isInit = action.payload.isInit
        }
    },
    extraReducers: builder => {
        builder.addCase(loginThunks.me.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
            .addCase(loginThunks.login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(loginThunks.logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const {isInitialized} = slice.actions
export const loginSlice = slice.reducer