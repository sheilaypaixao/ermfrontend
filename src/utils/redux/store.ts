import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth"

export const store = configureStore({
    reducer:{
        auth: authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>