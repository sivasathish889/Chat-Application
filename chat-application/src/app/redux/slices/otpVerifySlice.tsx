import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialStateType = {
    otp : number
}
let initialState: initialStateType = {
    otp : 0 
}

const otpSlice = createSlice({
    name : 'verifyOtp',
    initialState : initialState,
    reducers : {
        setverifyOtp : (state :initialStateType , action : PayloadAction<number>)=>{
            state.otp += action.payload
        }
    }
})

export default otpSlice.reducer;
export const setVerifyOtp = otpSlice.actions.setverifyOtp