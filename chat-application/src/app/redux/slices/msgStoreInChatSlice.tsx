import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type initialStateProp = {
    message : string,
    date : string
}
const initialState :initialStateProp={
    message : "",
    date : ""
}

const msgStoreInChat = createSlice({
    initialState,
    name : "msgStoreInChat",
    reducers  : {
        setMsgSender : (state, action: PayloadAction<initialStateProp>)=>{
            state.message = action.payload.message;
            state.date = action.payload.date
        }   
    }
})


export const setMsgStoreInChat = msgStoreInChat.actions.setMsgSender
export default msgStoreInChat.reducer