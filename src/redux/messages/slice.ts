import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import instance from "../../axios";


export const fetchMessages = createAsyncThunk('dialogs/fetchMessages', async (roomId: number | null) => {

  // const { data } = await instance.get(`/im/${dialogId}`, {
  //   params: {
  //     partnerId,
  //     userId
  //   }
  // })
  const { data } = await instance.get(`/im/${roomId}`)
  // console.log(data)
  return data
})



const initialState = {
  messages: [] as any,
  status: '' as string,
  partnerName: '' as string
}



const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setPartnerName: (state, action) => {
      state.partnerName = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<any>) => {
      state.messages = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchMessages.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchMessages.rejected, (state) => {
      state.status = 'error'
    })
  }
})

export const {addMessage,setPartnerName} = messageSlice.actions


export default messageSlice.reducer