import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../types";
import instance from "../../axios";


export const checkAuthMe = createAsyncThunk('auth/checkAuthMe', async () => {
  const { data } = await instance.get('/auth/me')

  return data
})


type UserTypes = {
  id: number,
  fullName: string,
  email: string,
  avatar: string | null
}

const initialState = {
  user: null as UserTypes | null, 
  status: '' 
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthMe.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload
      state.status = 'loaded'
    })
    builder.addCase(checkAuthMe.pending, (state, action: PayloadAction<any>) => {
      state.status = 'loading'
    })
    builder.addCase(checkAuthMe.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error'
    })
  }
})

export const {setUserData,logout} = authSlice.actions

export default authSlice.reducer