import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store'
import type { AuthState, AuthUser } from '../types/index.ts'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {token: null, user: null} as AuthState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
            state.token = action.payload.token
            state.user = action.payload.user
        },

        logout(state) {
            state.token = null
            state.user = null
            console.log(state.token)
            console.log(state.user)
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export const selectToken = (state: RootState) => state.auth.token
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer