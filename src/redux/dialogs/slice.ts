import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import instance from "../../axios";
import socket from "../../socket";


export const fetchNewDialog = createAsyncThunk('dialogs/fetchNewDialog', async (params: { partnerId: number}) => {
  const { data } = await instance.post('/im', params)

  return data
})

export type DialogsType = {
  fullName: string, 
  avatar: string, 

}


const initialState = {
  dialogs: [] as any,
  // dialogs: [] as DialogsType[],
  status: '' as string,
  partnerId: null as number | null,
  currentDialogId: '' as string,
  roomId: null as number | null,
  onlineUsers: [] as number[]
}
// window.location.pathname.split('im/')[1]



const dialogSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setDialogs: (state, action: PayloadAction<any>) => {
      state.dialogs = action.payload
    },
    setPartnerId: (state, action) => {
      state.partnerId = action.payload
    },
    setCurrentDialogId: (state, action) => {
      // socket.emit('DIALOGS:JOIN', action.payload)
      state.currentDialogId = action.payload
    },
    setRoomId: (state, action) => {
      // socket.emit('DIALOGS:JOIN', action.payload)
      state.roomId = action.payload
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchNewDialog.fulfilled, (state, action: PayloadAction<any>) => {
      state.dialogs.push(action.payload)
      state.status = 'loaded'
    })
    builder.addCase(fetchNewDialog.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchNewDialog.rejected, (state) => {
      state.status = 'error'
    })
  }
})

export const {setDialogs, setCurrentDialogId,setPartnerId,setRoomId,setOnlineUsers} = dialogSlice.actions

export default dialogSlice.reducer