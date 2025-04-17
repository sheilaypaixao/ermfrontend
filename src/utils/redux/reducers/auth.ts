import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../../../models/Auth"
import {UserEnterpriseDetail} from "../../../models/Auth"

type UserInterface ={
    user?: User | null, enterprise?: UserEnterpriseDetail | null
}

const initialState: UserInterface = {
    user: null,
    enterprise: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setUserEnterprise: (state, action: PayloadAction<UserEnterpriseDetail | null>) => {
            state.enterprise = action.payload
        }
    }
})

export const {setUser, setUserEnterprise} = authSlice.actions
export default authSlice.reducer